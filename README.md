## layui-custom
> 在源代码的基础上修改了 layer,laydate,code 模块以禁用 css 加载(将其一同打包到 layui.css 中，css+js 大概300k)
> 修改的目的主要是为了更方便的使用，使其更加适合传统/单页模式引入 css,js
> 新增的文件皆以 `custom-` 开头，方便后续 layui 升级对比

### 打包 
1. 全局安装打包工具 gulp ：`npm install -g gulp`  
2. 还原项目依赖包:`npm install`  
3. 执行打包：`gulp custom`  
4. 文件将生成到 dist/layui/ ，使用引入 layui.all.css,layui.all.js 即可  

### 打包后目录结构
使用 `gulp custom` 打包后,生成 dist 目录如下所示
```
│  layui.all.css
│  layui.all.js
│
├─font
│      iconfont.eot
│      iconfont.svg
│      iconfont.ttf
│      iconfont.woff
│
└─images
    │  ly-icon-ext.png
    │  ly-icon.png
    │  ly-loading-0.gif
    │  ly-loading-1.gif
    │  ly-loading-2.gif
    └─face
```

### layui 源码文件增加一览
```
src/css/custom-layui.css
src/css/modules/layer/custom/images/ly-icon-ext.png
src/css/modules/layer/custom/images/ly-icon.png
src/css/modules/layer/custom/images/ly-loading-0.gif
src/css/modules/layer/custom/images/ly-loading-1.gif
src/css/modules/layer/custom/images/ly-loading-2.gif
src/css/modules/layer/custom/layer.css
src/custom-layui.js
src/lay/modules/custom-code.js
src/lay/modules/custom-laydate.js
src/lay/modules/custom-layer.js

```

### 相关链接
- layui-custom 对应案例：https://yimogit.github.io/layui-custom/
- layui 仓库：https://github.com/sentsin/layui/
- layui 官网：http://www.layui.com