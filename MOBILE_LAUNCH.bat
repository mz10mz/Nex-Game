@echo off
title NexGame Casino - Mobile Launcher
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
echo                    📱 Mobile Casino Game Launcher 📱
echo.
echo ================================================================================
echo.
echo  🚀 Starting Mobile-Optimized Game...
echo.

REM Check if mobile_game.html exists
if not exist "mobile_game.html" (
    echo  ❌ Error: mobile_game.html not found!
    echo  📁 Make sure you're running this script from the game directory.
    echo.
    pause
    exit /b 1
)

REM Check if assets folder exists
if not exist "assets" (
    echo  ⚠️  Warning: assets folder not found!
    echo  📁 Some images may not display correctly.
    echo.
)

echo  🌐 Opening mobile-optimized game...
echo.

REM Open the mobile game
start mobile_game.html

echo  ✅ Mobile game opened successfully!
echo.
echo  📱 Mobile Controls:
echo     • Tap Spin Button: Spin
echo     • Swipe Up: Spin
echo     • Swipe Left: Increase Bet
echo     • Swipe Right: Decrease Bet
echo     • Tap Auto Button: Auto Spin
echo.
echo  🎯 For Network Access:
echo     1. Start a local server: python simple_server.py
echo     2. Get your IP address from the server output
echo     3. Open http://YOUR_IP:8000 on your mobile device
echo.
echo  🛑 Press any key to exit this launcher...
pause >nul

echo.
echo  👋 Thank you for playing NexGame Casino Mobile!
echo.
