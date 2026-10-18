@echo off
setlocal
cd /d "%~dp0"
title CASE FILES - Windows build
where node >nul 2>nul
if errorlevel 1 (
  echo Install Node.js 22.12 or later from https://nodejs.org, then run this file again.
  pause
  exit /b 1
)
node -e "const [a,b]=process.versions.node.split('.').map(Number);process.exit(a>22||(a===22&&b>=12)?0:1)"
if errorlevel 1 (
  echo Node.js 22.12 or later is required.
  pause
  exit /b 1
)
echo Preparing CASE FILES. Internet is needed for this build only.
call npm ci --no-audit --no-fund
if errorlevel 1 goto failed
call npm run package:win
if errorlevel 1 goto failed
echo.
echo Build complete. Open release\Case-Files-1.0.0-Windows.exe to play.
explorer "%~dp0release"
pause
exit /b 0
:failed
echo Build did not complete. Keep this window for the error details.
pause
exit /b 1
