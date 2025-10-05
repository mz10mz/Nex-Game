# 🎰 NexGame Casino - Professional Slot Machine Game

<div align="center">

![NexGame Casino](https://img.shields.io/badge/NexGame-Casino-gold?style=for-the-badge&logo=gamepad&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

**لعبة كازينو احترافية تعتمد على نظام RNG متقدم مع نظام خطوط كلاسيكي**

[🎮 Play Now](https://yourusername.github.io/nexgame-casino/) | [📖 Documentation](https://github.com/yourusername/nexgame-casino/wiki) | [🐛 Report Bug](https://github.com/yourusername/nexgame-casino/issues) | [✨ Request Feature](https://github.com/yourusername/nexgame-casino/issues)

</div>

## 🌟 Features

### 🎲 Advanced RNG System
- **True Randomness**: Advanced RNG algorithm with cryptographic security
- **Controllable Win Rates**: Adjustable win rates from 0% to 100%
- **House Edge Control**: Configurable house edge from 0% to 50%
- **Jackpot System**: Customizable jackpot rates

### 🎯 Classic Payline System
- **9 Paylines**: Multiple winning combinations
- **5 Reels × 3 Rows**: Classic slot machine design
- **Scatter System**: Pays anywhere on the reels
- **8 Unique Symbols**: From gems to crown and cup

### 🎉 Free Spins System
- **Auto Trigger**: Activates with 4+ Scatter symbols
- **15 Free Spins**: Consecutive spins without balance deduction
- **Win Accumulation**: Collects all free spin winnings
- **Summary Display**: Shows total winnings at the end

### ⚙️ Admin Control Panel
- **Full Control**: Modify all game settings
- **Instant Application**: Changes apply without restart
- **Settings Persistence**: Automatically saved settings
- **Security Protection**: Anti-tampering measures

### 🎨 Advanced Visual Effects
- **Particle System**: For wins and fireworks
- **Smooth Animations**: 60 FPS on capable devices
- **Confetti Effects**: For big wins
- **Screen Shake**: For major wins
- **Color Flashing**: For jackpots

### 📱 Responsive Design
- **Desktop Support**: Optimized for large screens
- **Mobile Support**: Touch controls and gestures
- **Cross-Platform**: Works on all modern browsers
- **Performance Optimized**: Automatic quality adjustment

## 🚀 Quick Start

### Option 1: Direct Play
1. **Desktop**: Double-click `LAUNCH_GAME.bat`
2. **Mobile**: Open `mobile_game.html` in your browser
3. **Universal**: Open `index.html` in any modern browser

### Option 2: Local Server
```bash
# Python
python simple_server.py

# Node.js
node start_server.js

# Or using npx
npx http-server -p 8000
```

### Option 3: GitHub Pages
Visit: `https://yourusername.github.io/nexgame-casino/`

## 🎮 How to Play

### Basic Controls
- **Space/Enter**: Spin
- **A**: Auto Spin
- **+/-**: Change Bet
- **Escape**: Close Win Modal

### Touch Controls (Mobile)
- **Swipe Up**: Spin
- **Swipe Left**: Increase Bet
- **Swipe Right**: Decrease Bet
- **Tap Buttons**: Direct control

### Payline System
1. **9 Different Paylines** for various winning combinations
2. **3+ Matching Symbols** from left to right for wins
3. **Scatter Pays Anywhere** (3+ symbols anywhere)

## ⚙️ Admin Panel

### Access
1. Click the gear icon (⚙️) in the top-right corner
2. Admin control panel will appear

### Available Settings
- **Win Rate**: 0% - 100% (Default: 30%)
- **Jackpot Rate**: 0% - 10% (Default: 2%)
- **House Edge**: 0% - 50% (Default: 5%)

### Apply Changes
1. Modify the desired values
2. Click "Apply Settings"
3. Changes are applied immediately

## 📊 Paytable

| Symbol | 3 Symbols | 4 Symbols | 5 Symbols |
|--------|-----------|-----------|-----------|
| 💎 Blue Gem | 5x | 15x | 50x |
| 💚 Green Gem | 8x | 25x | 80x |
| 💜 Purple Gem | 12x | 40x | 120x |
| ❤️ Red Gem | 18x | 60x | 200x |
| 💍 Ring | 25x | 100x | 300x |
| 🏆 Cup | 35x | 150x | 500x |
| 👑 Crown | 50x | 250x | 1000x |
| ⭐ Scatter | 100x | 500x | 2000x |

## 🔧 Technical Requirements

### Supported Browsers
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile Browsers

### Requirements
- HTML5 and CSS3 support
- JavaScript ES6+ support
- Canvas support for visual effects
- 2GB RAM (or more for optimal performance)

## 📁 Project Structure

```
NexGame/
├── index.html              # Main game page
├── mobile_game.html        # Mobile-optimized version
├── mobile_test.html        # Mobile testing page
├── styles.css              # Styling and animations
├── game.js                 # Main game logic
├── effects.js              # Visual effects system
├── performance.js          # Performance optimizations
├── config.js               # Game configuration
├── assets/                 # Game symbols and images
│   ├── blue_gem.PNG
│   ├── green_gem.PNG
│   ├── purple_gem.PNG
│   ├── red_gem.PNG
│   ├── ring.PNG
│   ├── cup.PNG
│   ├── crown.PNG
│   └── scatter.PNG
├── LAUNCH_GAME.bat         # Windows launcher
├── LAUNCH_GAME.sh          # Mac/Linux launcher
├── MOBILE_LAUNCH.bat       # Mobile launcher
├── start_server.py         # Python server
├── start_server.js         # Node.js server
├── simple_server.py        # Simple Python server
├── package.json            # Project configuration
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## 🎯 Advanced Features

### Performance Optimization
- **Device Detection**: Automatically adjusts quality for low-end devices
- **Battery Optimization**: Reduces performance when battery is low
- **Memory Management**: Automatic cleanup every 30 seconds
- **Animation Pausing**: Stops animations when window is not focused

### Security Features
- **Anti-Tampering**: Protection against code manipulation
- **Settings Encryption**: Sensitive settings are encrypted
- **Integrity Checks**: Periodic code integrity verification

### Customization
- **Symbol Replacement**: Easy to replace symbols in `assets/` folder
- **Color Themes**: Modify colors in `styles.css`
- **New Paylines**: Add paylines in `config.js`
- **Payout Adjustments**: Modify payouts in `config.js`

## 🛠️ Development

### Setup Development Environment
```bash
# Clone the repository
git clone https://github.com/yourusername/nexgame-casino.git
cd nexgame-casino

# Install dependencies (optional)
npm install

# Start development server
python simple_server.py
# or
node start_server.js
```

### Building
```bash
# No build process needed - pure HTML5 game
# Just open index.html in browser
```

### Testing
```bash
# Open mobile_test.html for mobile testing
# Use browser developer tools for debugging
```

## 📱 Mobile Support

### Responsive Design
- **3 Breakpoints**: Desktop, Tablet, Mobile
- **Touch Controls**: Swipe gestures and tap controls
- **Performance Scaling**: Automatic quality adjustment
- **Battery Optimization**: Reduced effects on low battery

### Mobile Features
- **Gesture Recognition**: Swipe up for spin, left/right for bet changes
- **Haptic Feedback**: Vibration on wins (supported devices)
- **Audio System**: Sound effects (optional)
- **Offline Play**: Works without internet connection

## 🔒 Security

### Admin Protection
- **Password Protection**: Default password `admin123` (changeable)
- **Session Timeout**: 5 minutes of inactivity
- **Action Logging**: All admin actions are logged
- **Access Control**: Admin panel can be disabled

### Game Integrity
- **RNG Verification**: Cryptographic random number generation
- **State Validation**: Game state integrity checks
- **Anti-Cheat**: Protection against manipulation

## 📈 Performance

### Optimization Features
- **FPS Monitoring**: Automatic quality adjustment based on performance
- **Memory Management**: Automatic cleanup and garbage collection
- **Battery Awareness**: Reduces effects when battery is low
- **Device Adaptation**: Adjusts quality based on device capabilities

### Performance Metrics
- **Target FPS**: 60 FPS (30 FPS on low-end devices)
- **Memory Usage**: < 100MB typical usage
- **Load Time**: < 3 seconds on modern devices
- **Battery Impact**: Minimal on optimized devices

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### How to Contribute
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Areas for Contribution
- **New Features**: Additional game modes, symbols, or effects
- **Bug Fixes**: Report and fix bugs
- **Performance**: Optimize code and improve performance
- **Documentation**: Improve documentation and examples
- **Translations**: Add support for more languages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Font Awesome**: For the amazing icons
- **Google Fonts**: For the Cairo font family
- **Open Source Community**: For inspiration and tools
- **Contributors**: Thank you to all contributors!

## 📞 Support

### Getting Help
- **Documentation**: Check the [Wiki](https://github.com/yourusername/nexgame-casino/wiki)
- **Issues**: Report bugs on [GitHub Issues](https://github.com/yourusername/nexgame-casino/issues)
- **Discussions**: Join discussions on [GitHub Discussions](https://github.com/yourusername/nexgame-casino/discussions)

### Common Issues
- **Game not loading**: Check browser console for errors
- **Images not showing**: Ensure `assets/` folder is present
- **Mobile not working**: Try `mobile_game.html` instead
- **Performance issues**: Check device compatibility

## 🎉 Enjoy Playing!

Thank you for using NexGame Casino! We hope you enjoy the game.

**Play Now**: [https://yourusername.github.io/nexgame-casino/](https://yourusername.github.io/nexgame-casino/)

---

<div align="center">

**Made with ❤️ by NexGame Development Team**

[⭐ Star this repo](https://github.com/yourusername/nexgame-casino) | [🐛 Report Bug](https://github.com/yourusername/nexgame-casino/issues) | [✨ Request Feature](https://github.com/yourusername/nexgame-casino/issues)

</div>