#!/bin/bash

echo "Starting NexGame Casino..."
echo ""
echo "Opening game in default browser..."

# Detect the operating system
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    open index.html
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    xdg-open index.html
else
    # Windows (if running in WSL or Git Bash)
    start index.html
fi

echo ""
echo "Game started successfully!"
echo ""
echo "Controls:"
echo "- Space or Enter: Spin"
echo "- A: Auto Spin"
echo "- +/-: Change Bet"
echo "- Escape: Close Win Modal"
echo ""
echo "Admin Panel:"
echo "- Click the gear icon (⚙️) to access admin controls"
echo "- Default admin settings can be modified"
echo ""
