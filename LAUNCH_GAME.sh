#!/bin/bash

# NexGame Casino - Game Launcher
# Professional Casino Slot Machine Game

clear

echo ""
echo "  ███╗   ██╗███████╗██╗  ██╗    ██████╗  █████╗ ███████╗██╗███╗   ██╗██╗   ██╗"
echo "  ████╗  ██║██╔════╝╚██╗██╔╝   ██╔════╝ ██╔══██╗██╔════╝██║████╗  ██║██║   ██║"
echo "  ██╔██╗ ██║█████╗   ╚███╔╝    ██║  ███╗███████║███████╗██║██╔██╗ ██║██║   ██║"
echo "  ██║╚██╗██║██╔══╝   ██╔██╗    ██║   ██║██╔══██║╚════██║██║██║╚██╗██║██║   ██║"
echo "  ██║ ╚████║███████╗██╔╝ ██╗   ╚██████╔╝██║  ██║███████║██║██║ ╚████║╚██████╔╝"
echo "  ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝╚═╝  ╚═══╝ ╚═════╝"
echo ""
echo "  ██████╗  █████╗ ███████╗██╗███╗   ██╗██╗   ██╗"
echo "  ██╔════╝ ██╔══██╗██╔════╝██║████╗  ██║██║   ██║"
echo "  ██║  ███╗███████║███████╗██║██╔██╗ ██║██║   ██║"
echo "  ██║   ██║██╔══██║╚════██║██║██║╚██╗██║██║   ██║"
echo "  ╚██████╔╝██║  ██║███████║██║██║ ╚████║╚██████╔╝"
echo "   ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝╚═╝  ╚═══╝ ╚═════╝"
echo ""
echo "================================================================================"
echo ""
echo "                    🎰 Professional Casino Slot Machine Game 🎰"
echo ""
echo "================================================================================"
echo ""
echo "  🚀 Starting NexGame Casino..."
echo ""
echo "  📋 Game Features:"
echo "     • Advanced RNG System"
echo "     • 9 Paylines Classic System"
echo "     • Admin Control Panel"
echo "     • Visual Effects & Animations"
echo "     • Mobile & Desktop Compatible"
echo ""
echo "  🎮 Controls:"
echo "     • Space/Enter: Spin"
echo "     • A: Auto Spin"
echo "     • +/-: Change Bet"
echo "     • Escape: Close Win Modal"
echo ""
echo "  ⚙️  Admin Panel:"
echo "     • Click the gear icon (⚙️) to access admin controls"
echo "     • Modify win rates, jackpot rates, and house edge"
echo ""
echo "================================================================================"
echo ""

# Check if index.html exists
if [ ! -f "index.html" ]; then
    echo "  ❌ Error: index.html not found!"
    echo "  📁 Make sure you're running this script from the game directory."
    echo ""
    read -p "Press Enter to exit..."
    exit 1
fi

# Check if assets folder exists
if [ ! -d "assets" ]; then
    echo "  ⚠️  Warning: assets folder not found!"
    echo "  📁 Some images may not display correctly."
    echo ""
fi

echo "  🌐 Opening game in default browser..."
echo ""

# Detect the operating system and open the game
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    open run_game.html
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    xdg-open run_game.html
else
    # Windows (if running in WSL or Git Bash)
    start run_game.html
fi

echo "  ✅ Game launcher opened successfully!"
echo ""
echo "  🎯 If the game doesn't open automatically:"
echo "     1. Open your web browser"
echo "     2. Navigate to: file:///$(pwd)/index.html"
echo "     3. Or use: http://localhost:8000 (if using a local server)"
echo ""

# Ask if user wants to start a local server
echo "  🌐 Would you like to start a local server? (y/n)"
read -p "  > " start_server

if [[ $start_server == "y" || $start_server == "Y" ]]; then
    echo ""
    echo "  🚀 Starting local server..."
    
    # Check if Python is available
    if command -v python3 &> /dev/null; then
        echo "  📡 Using Python 3 server..."
        python3 start_server.py
    elif command -v python &> /dev/null; then
        echo "  📡 Using Python 2 server..."
        python start_server.py
    elif command -v node &> /dev/null; then
        echo "  📡 Using Node.js server..."
        node start_server.js
    else
        echo "  ❌ No suitable server found!"
        echo "  📁 Please open index.html directly in your browser."
        echo ""
        read -p "Press Enter to exit..."
    fi
else
    echo ""
    echo "  🛑 Press Enter to exit this launcher..."
    read -p ""
fi

echo ""
echo "  👋 Thank you for playing NexGame Casino!"
echo ""
