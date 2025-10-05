@echo off
title NexGame Casino - Game Launcher
color 0A

echo.
echo  ███╗   ██╗███████╗██╗  ██╗    ██████╗  █████╗ ███████╗██╗███╗   ██╗██╗   ██╗
echo  ████╗  ██║██╔════╝╚██╗██╔╝   ██╔════╝ ██╔══██╗██╔════╝██║████╗  ██║██║   ██╗
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
echo                    🎰 Professional Casino Slot Machine Game 🎰
echo.
echo ================================================================================
echo.
echo  🚀 Starting NexGame Casino...
echo.
echo  📋 Game Features:
echo     • Advanced RNG System
echo     • 9 Paylines Classic System
echo     • Admin Control Panel
echo     • Visual Effects & Animations
echo     • Mobile & Desktop Compatible
echo.
echo  🎮 Controls:
echo     • Space/Enter: Spin
echo     • A: Auto Spin
echo     • +/-: Change Bet
echo     • Escape: Close Win Modal
echo.
echo  ⚙️  Admin Panel:
echo     • Click the gear icon (⚙️) to access admin controls
echo     • Modify win rates, jackpot rates, and house edge
echo.
echo ================================================================================
echo.

REM Check if index.html exists
if not exist "index.html" (
    echo  ❌ Error: index.html not found!
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

echo  🌐 Opening game in default browser...
echo.

REM Open the game launcher
start run_game.html

echo  ✅ Game launcher opened successfully!
echo.
echo  🎯 If the game doesn't open automatically:
echo     1. Open your web browser
echo     2. Navigate to: file:///%CD%\index.html
echo     3. Or use: http://localhost:8000 (if using a local server)
echo.
echo  🛑 Press any key to exit this launcher...
pause >nul

echo.
echo  👋 Thank you for playing NexGame Casino!
echo.
