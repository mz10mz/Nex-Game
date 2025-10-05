@echo off
title NexGame Casino - Git Commands
color 0A

echo.
echo  ███╗   ██╗███████╗██╗  ██╗    ██████╗  █████╗ ███████╗██╗███╗   ██╗██╗   ██╗
echo  ████╗  ██║██╔════╝╚██╗██╔╝   ██╔════╝ ██╔══██╗██╔════╝██║████╗  ██║██║   ██║
echo  ██╔██╗ ██║█████╗   ╚███╔╝    ██║  ███╗███████║███████╗██║██╔██╗ ██║██║   ██║
echo  ██║╚██╗██║██╔══╝   ██╔██╗    ██║   ██║██╔══██║╚════██║██║██║╚██╗██║██║   ██║
echo  ██║ ╚████║███████╗██╔╝ ██╗   ╚██████╔╝██║  ██║███████║██║██║ ╚████║╚██████╔╝
echo  ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝╚═╝  ╚═══╝ ╚═════╝
echo.
echo  ██████╗  █████╗ ███████╗██╗███╗   ██╗██╗   ██╗
echo  ██╔════╝ ██╔══██╗██╔════╝██║████╗  ██║██║   ██║
echo  ██║  ███╗███████║███████╗██║██╔██╗ ██║██║   ██║
echo  ██║   ██║██╔══██║╚════██║██║██║╚██╗██║██║   ██║
echo  ╚██████╔╝██║  ██║███████║██║██║ ╚████║╚██████╔╝
echo   ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝╚═╝  ╚═══╝ ╚═════╝
echo.
echo ================================================================================
echo.
echo                    🚀 GitHub Deployment Commands 🚀
echo.
echo ================================================================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo  ❌ Git is not installed!
    echo  📥 Please install Git from: https://git-scm.com/downloads
    echo.
    pause
    exit /b 1
)

echo  ✅ Git is installed
echo.

REM Check if we're in a git repository
git status >nul 2>&1
if %errorlevel% neq 0 (
    echo  🔧 Initializing Git repository...
    git init
    echo  ✅ Git repository initialized
    echo.
)

echo  📋 Available Commands:
echo.
echo  1. 📤 Upload to GitHub (First Time)
echo  2. 🔄 Update GitHub Repository
echo  3. 🌐 Deploy to GitHub Pages
echo  4. 📊 Check Repository Status
echo  5. 🏷️  Create Release Tag
echo  6. ❌ Exit
echo.

set /p choice="Choose an option (1-6): "

if "%choice%"=="1" goto first_upload
if "%choice%"=="2" goto update_repo
if "%choice%"=="3" goto deploy_pages
if "%choice%"=="4" goto check_status
if "%choice%"=="5" goto create_tag
if "%choice%"=="6" goto exit
goto invalid_choice

:first_upload
echo.
echo  📤 First Time Upload to GitHub
echo  ================================
echo.
set /p username="Enter your GitHub username: "
set /p repo="Enter repository name (default: nexgame-casino): "
if "%repo%"=="" set repo=nexgame-casino

echo.
echo  🔧 Setting up repository...
git add .
git commit -m "Initial commit: NexGame Casino Professional Slot Machine Game"
git branch -M main
git remote add origin https://github.com/%username%/%repo%.git
git push -u origin main

echo.
echo  ✅ Repository uploaded successfully!
echo  🌐 Your game will be available at: https://%username%.github.io/%repo%/
echo.
goto end

:update_repo
echo.
echo  🔄 Updating GitHub Repository
echo  ==============================
echo.
git add .
set /p message="Enter commit message: "
git commit -m "%message%"
git push origin main

echo.
echo  ✅ Repository updated successfully!
echo.
goto end

:deploy_pages
echo.
echo  🌐 Deploying to GitHub Pages
echo  =============================
echo.
echo  📋 Steps to enable GitHub Pages:
echo  1. Go to your repository on GitHub
echo  2. Click on 'Settings'
echo  3. Scroll down to 'Pages'
echo  4. Under 'Source', select 'Deploy from a branch'
echo  5. Select 'main' branch and '/ (root)' folder
echo  6. Click 'Save'
echo.
echo  ⏳ It may take 5-10 minutes for the site to be available
echo.
goto end

:check_status
echo.
echo  📊 Repository Status
echo  ====================
echo.
git status
echo.
git log --oneline -5
echo.
goto end

:create_tag
echo.
echo  🏷️  Create Release Tag
echo  =======================
echo.
set /p version="Enter version number (e.g., v1.0.0): "
set /p message="Enter release message: "

git tag -a %version% -m "%message%"
git push origin %version%

echo.
echo  ✅ Release tag created successfully!
echo.
goto end

:invalid_choice
echo.
echo  ❌ Invalid choice! Please select 1-6
echo.
goto end

:end
echo  🎉 Operation completed!
echo.
echo  📚 For more help, check DEPLOYMENT_GUIDE.md
echo.
pause
goto exit

:exit
echo.
echo  👋 Thank you for using NexGame Casino!
echo.