/**
 layui构建
*/

var pkg = require('./package.json');
var inds = pkg.independents;

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var header = require('gulp-header');
var del = require('del');


//清理
gulp.task('clear', function(cb) {
  return del(['./'+ (argv.rc ? 'rc' : 'dist') +'/*'], cb);
});
gulp.task('clearRelease', function(cb) {
  return del([releaseDir], cb);
});
/**
 * 获取layui源代码目录
 * @param {String} path 
 */
function getLayuiPath(path){
  return "./layui/src"+path
}
/**
 * 获取custom-layui的发布目录
 * @param {String} path 
 */
function getDistPath(path){
  return "./dist/layui"+(path||"")
}
//自定义打包-将css，js打包到一个文件中，修改layer目录结构
gulp.task('custom', function(){
  //1. 打包font
   gulp.src(getLayuiPath('/font/*'))
  .pipe(rename({}))
  .pipe(gulp.dest(getDistPath('/font')));

  //2. 打包图片
  gulp.src([getLayuiPath('/images/**/*.{png,jpg,gif,html,mp3,json}')])
  .pipe(gulp.dest(getDistPath("/images")));

  gulp.src([getLayuiPath('/css/modules/layer/custom/images/*.{png,jpg,gif,html,mp3,json}')])
  .pipe(gulp.dest(getDistPath("/images")));

  //3. 打包layui及laydate,layer模块样式
  // 添加了custom-layui.css layer/custom
   gulp.src([getLayuiPath('/css/custom-layui.css'),
   getLayuiPath('/css/modules/laydate/default/{font,laydate}.css'),
   getLayuiPath('/css/modules/code.css'),
   getLayuiPath('/css/modules/layer/custom/layer.css'),
  ])
  .pipe(concat('layui.all.css', {newLine: '\n\n'}))
  .pipe(minify({
    compatibility: 'ie7'
  })).pipe(header.apply(null, ["/** custom-layui.css 包含laydate,code,layer的样式 */\n"]))
  .pipe(gulp.dest(getDistPath()))
  //4. 打包js
  //添加了 custom-layer,custom-code,custom-laydate,custom-layui
  var customMods='custom-layui,all,laytpl,laypage,custom-laydate,jquery,custom-layer,element,upload,form,tree,table,carousel,util,flow,layedit,custom-code'
  var src = [
    getLayuiPath('/**/{'+ customMods +'}.js')
    ,"!"+getLayuiPath('/**/mobile/*.js')
  ]
  gulp.src(src).pipe(uglify())
    .pipe(concat('layui.all.js', {newLine: ''}))
    .pipe(header.apply(null, ["/** custom-layui.js modules： <%= mods %> */\n",{
      mods:customMods
    }]))
    .pipe(gulp.dest(getDistPath()))
});

