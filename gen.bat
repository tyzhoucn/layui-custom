@echo off

del index.html
setlocal enabledelayedexpansion
for /f "delims=" %%i in ('dir /b /a:-d  .\examples') do (
    set html= ^<a href=^"examples/%%i" target="_blank"> %%i </a><br/>
    echo !html!>>index.html
)