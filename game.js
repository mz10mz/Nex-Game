// NexGame Casino - Professional Slot Machine Game
class NexGameCasino {
    constructor() {
        this.symbols = [
            { name: 'blue_gem', value: 1, image: 'assets/blue_gem.PNG' },
            { name: 'green_gem', value: 2, image: 'assets/green_gem.PNG' },
            { name: 'purple_gem', value: 3, image: 'assets/purple_gem.PNG' },
            { name: 'red_gem', value: 4, image: 'assets/red_gem.PNG' },
            { name: 'ring', value: 5, image: 'assets/ring.PNG' },
            { name: 'cup', value: 6, image: 'assets/cup.PNG' },
            { name: 'crown', value: 7, image: 'assets/crown.PNG' },
            { name: 'scatter', value: 8, image: 'assets/scatter.PNG' }
        ];
        
        this.gameState = {
            balance: 1000,
            currentBet: 10,
            lastWin: 0,
            totalWins: 0,
            isSpinning: false,
            autoSpin: false,
            autoSpinCount: 0,
            maxAutoSpins: 0,
            // Free Spins System
            freeSpinsActive: false,
            freeSpinsRemaining: 0,
            freeSpinsTotal: 0,
            freeSpinsWinnings: 0,
            freeSpinsBet: 0
        };
        
        this.adminSettings = {
            winRate: 30,        // نسبة الفوز العامة
            jackpotRate: 2,     // نسبة الجائزة الكبرى
            houseEdge: 5,       // هامش البيت
            isAdminMode: false
        };
        
        this.paylines = [
            [0, 0, 0, 0, 0], // خط أفقي علوي
            [1, 1, 1, 1, 1], // خط أفقي وسط
            [2, 2, 2, 2, 2], // خط أفقي سفلي
            [0, 1, 2, 1, 0], // خط مائل صاعد
            [2, 1, 0, 1, 2], // خط مائل هابط
            [0, 0, 1, 2, 2], // خط متعرج
            [2, 2, 1, 0, 0], // خط متعرج معكوس
            [1, 0, 0, 0, 1], // خط V
            [1, 2, 2, 2, 1]  // خط V معكوس
        ];
        
        this.payoutTable = {
            1: { 3: 5, 4: 15, 5: 50 },    // blue_gem
            2: { 3: 8, 4: 25, 5: 80 },    // green_gem
            3: { 3: 12, 4: 40, 5: 120 },  // purple_gem
            4: { 3: 18, 4: 60, 5: 200 },  // red_gem
            5: { 3: 25, 4: 100, 5: 300 }, // ring
            6: { 3: 35, 4: 150, 5: 500 }, // cup
            7: { 3: 50, 4: 250, 5: 1000 }, // crown
            8: { 3: 100, 4: 500, 5: 2000 } // scatter (scatter pays anywhere)
        };
        
        this.reels = [[], [], [], [], []];
        this.currentReels = [[], [], [], [], []];
        this.winningLines = [];
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.generateReels();
        this.updateDisplay();
        this.generatePaytable();
        this.hideLoadingScreen();
    }
    
    setupEventListeners() {
        // Spin button
        document.getElementById('spinBtn').addEventListener('click', () => this.spin());
        
        // Bet controls
        document.getElementById('betUp').addEventListener('click', () => this.increaseBet());
        document.getElementById('betDown').addEventListener('click', () => this.decreaseBet());
        
        // Auto spin
        document.getElementById('autoSpinBtn').addEventListener('click', () => this.toggleAutoSpin());
        
        // Admin panel
        document.getElementById('adminBtn').addEventListener('click', () => this.toggleAdminPanel());
        document.getElementById('applySettings').addEventListener('click', () => this.applyAdminSettings());
        document.getElementById('resetSettings').addEventListener('click', () => this.resetAdminSettings());
        
        // Win modal
        document.getElementById('closeWinModal').addEventListener('click', () => this.closeWinModal());
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && !this.gameState.isSpinning) {
                e.preventDefault();
                this.spin();
            }
        });
    }
    
    // Advanced RNG System
    generateRandomSymbol() {
        const random = Math.random() * 100;
        let cumulativeProbability = 0;
        
        // تطبيق نسب الإدمن على احتمالية الرموز
        const adjustedProbabilities = this.calculateAdjustedProbabilities();
        
        for (let i = 0; i < this.symbols.length; i++) {
            cumulativeProbability += adjustedProbabilities[i];
            if (random <= cumulativeProbability) {
                return this.symbols[i];
            }
        }
        
        return this.symbols[0]; // fallback
    }
    
    calculateAdjustedProbabilities() {
        const baseProbabilities = [25, 20, 15, 12, 10, 8, 5, 5]; // النسب الأساسية
        const adjustedProbabilities = [...baseProbabilities];
        
        // تطبيق نسبة الفوز المحددة من الإدمن
        const winRateMultiplier = this.adminSettings.winRate / 30; // 30% هو المعدل الافتراضي
        const houseEdgeMultiplier = 1 - (this.adminSettings.houseEdge / 100);
        
        // تقليل احتمالية الرموز عالية القيمة عند انخفاض نسبة الفوز
        if (winRateMultiplier < 1) {
            for (let i = 4; i < adjustedProbabilities.length; i++) {
                adjustedProbabilities[i] *= winRateMultiplier;
            }
        }
        
        // تطبيق هامش البيت
        for (let i = 0; i < adjustedProbabilities.length; i++) {
            adjustedProbabilities[i] *= houseEdgeMultiplier;
        }
        
        // تطبيع الاحتمالات
        const total = adjustedProbabilities.reduce((sum, prob) => sum + prob, 0);
        return adjustedProbabilities.map(prob => (prob / total) * 100);
    }
    
    generateReels() {
        for (let reelIndex = 0; reelIndex < 5; reelIndex++) {
            this.reels[reelIndex] = [];
            for (let i = 0; i < 20; i++) { // 20 رمز لكل بكرة
                this.reels[reelIndex].push(this.generateRandomSymbol());
            }
        }
    }
    
    spin() {
        if (this.gameState.isSpinning || this.gameState.balance < this.gameState.currentBet || this.gameState.freeSpinsActive) {
            return;
        }
        
        this.gameState.isSpinning = true;
        this.gameState.balance -= this.gameState.currentBet;
        
        // إيقاف الدوران التلقائي إذا نفد الرصيد
        if (this.gameState.autoSpin && this.gameState.balance < this.gameState.currentBet) {
            this.toggleAutoSpin();
        }
        
        this.updateDisplay();
        this.startReelAnimation();
        
        // توليد النتائج بعد انتهاء الرسوم المتحركة
        setTimeout(() => {
            this.generateSpinResult();
            this.checkWins();
            this.gameState.isSpinning = false;
            this.updateDisplay();
            
            // استمرار الدوران التلقائي
            if (this.gameState.autoSpin && this.gameState.balance >= this.gameState.currentBet) {
                setTimeout(() => this.spin(), 1000);
            }
        }, 2000);
    }
    
    startReelAnimation() {
        const reels = document.querySelectorAll('.reel');
        reels.forEach((reel, index) => {
            // تطبيق الرسوم المتحركة على الرموز فقط
            const symbols = reel.querySelectorAll('.symbol');
            symbols.forEach((symbol, symbolIndex) => {
                // تأخير مختلف لكل رمز لخلق تأثير الدوران
                setTimeout(() => {
                    symbol.style.animation = `reelSpin 0.2s linear infinite, reelBlur 0.4s ease-in-out infinite`;
                    symbol.style.transform = 'translateY(0)';
                }, symbolIndex * 100);
            });
            
            // إيقاف الرسوم المتحركة بعد فترات مختلفة
            setTimeout(() => {
                symbols.forEach(symbol => {
                    symbol.style.animation = 'none';
                    symbol.style.transform = 'translateY(0) scale(1)';
                    symbol.style.filter = 'none';
                    symbol.style.opacity = '1';
                });
            }, 1500 + (index * 100));
        });
    }
    
    generateSpinResult() {
        this.currentReels = [[], [], [], [], []];
        
        for (let reelIndex = 0; reelIndex < 5; reelIndex++) {
            for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
                const symbol = this.generateRandomSymbol();
                this.currentReels[reelIndex][rowIndex] = symbol;
            }
        }
        
        this.displayReels();
    }
    
    displayReels() {
        for (let reelIndex = 0; reelIndex < 5; reelIndex++) {
            const reelElement = document.getElementById(`reel${reelIndex + 1}`);
            const symbols = reelElement.querySelectorAll('.symbol');
            
            symbols.forEach((symbolElement, rowIndex) => {
                const symbol = this.currentReels[reelIndex][rowIndex];
                symbolElement.style.backgroundImage = `url(${symbol.image})`;
                symbolElement.style.backgroundSize = 'contain';
                symbolElement.style.backgroundRepeat = 'no-repeat';
                symbolElement.style.backgroundPosition = 'center';
                symbolElement.dataset.symbol = symbol.name;
                symbolElement.dataset.value = symbol.value;
            });
        }
    }
    
    checkWins() {
        this.winningLines = [];
        let totalWin = 0;
        
        // فحص الخطوط
        for (let lineIndex = 0; lineIndex < this.paylines.length; lineIndex++) {
            const line = this.paylines[lineIndex];
            const lineSymbols = line.map((row, reelIndex) => 
                this.currentReels[reelIndex][row]
            );
            
            const win = this.checkLineWin(lineSymbols, lineIndex);
            if (win > 0) {
                this.winningLines.push({ lineIndex, win });
                totalWin += win;
            }
        }
        
        // فحص Scatter (يدفع في أي مكان)
        const scatterResult = this.checkScatterWin();
        totalWin += scatterResult.win;
        
        // فحص الجولات المجانية (4+ Scatter)
        if (scatterResult.count >= 4 && !this.gameState.freeSpinsActive) {
            this.triggerFreeSpins();
        }
        
        if (totalWin > 0) {
            this.gameState.lastWin = totalWin;
            this.gameState.totalWins += totalWin;
            
            // في الجولات المجانية، لا نخصم من الرصيد ولا نضيف إليه حتى النهاية
            if (!this.gameState.freeSpinsActive) {
                this.gameState.balance += totalWin;
            } else {
                // جمع أرباح الجولات المجانية
                this.gameState.freeSpinsWinnings += totalWin;
            }
            
            this.showWinningLines();
            this.showWinModal(totalWin);
        } else {
            this.gameState.lastWin = 0;
        }
    }
    
    checkLineWin(symbols, lineIndex) {
        // فحص التطابقات من اليسار
        const firstSymbol = symbols[0];
        let matchCount = 1;
        
        for (let i = 1; i < symbols.length; i++) {
            if (symbols[i].name === firstSymbol.name) {
                matchCount++;
            } else {
                break;
            }
        }
        
        if (matchCount >= 3) {
            const multiplier = this.payoutTable[firstSymbol.value][matchCount] || 0;
            return multiplier * this.gameState.currentBet;
        }
        
        return 0;
    }
    
    checkScatterWin() {
        let scatterCount = 0;
        
        for (let reelIndex = 0; reelIndex < 5; reelIndex++) {
            for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
                if (this.currentReels[reelIndex][rowIndex].name === 'scatter') {
                    scatterCount++;
                }
            }
        }
        
        let win = 0;
        if (scatterCount >= 3) {
            const multiplier = this.payoutTable[8][scatterCount] || 0;
            win = multiplier * this.gameState.currentBet;
        }
        
        return { count: scatterCount, win: win };
    }
    
    // نظام الجولات المجانية
    triggerFreeSpins() {
        this.gameState.freeSpinsActive = true;
        this.gameState.freeSpinsRemaining = 15;
        this.gameState.freeSpinsTotal = 15;
        this.gameState.freeSpinsWinnings = 0;
        this.gameState.freeSpinsBet = this.gameState.currentBet;
        
        // إيقاف الدوران التلقائي العادي
        this.gameState.autoSpin = false;
        
        // إظهار رسالة الجولات المجانية
        this.showFreeSpinsModal();
        
        // بدء الجولات المجانية بعد 3 ثوان
        setTimeout(() => {
            this.startFreeSpins();
        }, 3000);
    }
    
    startFreeSpins() {
        if (this.gameState.freeSpinsRemaining > 0) {
            this.gameState.freeSpinsRemaining--;
            this.updateFreeSpinsDisplay();
            
            // دوران مجاني (بدون خصم من الرصيد)
            this.gameState.isSpinning = true;
            this.updateDisplay();
            this.startReelAnimation();
            
            setTimeout(() => {
                this.generateSpinResult();
                this.checkWins();
                this.gameState.isSpinning = false;
                this.updateDisplay();
                
                // استمرار الجولات المجانية
                if (this.gameState.freeSpinsRemaining > 0) {
                    setTimeout(() => this.startFreeSpins(), 2000);
                } else {
                    // انتهاء الجولات المجانية
                    this.endFreeSpins();
                }
            }, 2000);
        }
    }
    
    endFreeSpins() {
        // إضافة أرباح الجولات المجانية إلى الرصيد
        this.gameState.balance += this.gameState.freeSpinsWinnings;
        this.gameState.totalWins += this.gameState.freeSpinsWinnings;
        
        // إظهار ملخص الجولات المجانية
        this.showFreeSpinsSummary();
        
        // إعادة تعيين حالة الجولات المجانية
        this.gameState.freeSpinsActive = false;
        this.gameState.freeSpinsRemaining = 0;
        this.gameState.freeSpinsTotal = 0;
        this.gameState.freeSpinsWinnings = 0;
        this.gameState.freeSpinsBet = 0;
        
        this.updateFreeSpinsDisplay();
        this.updateDisplay();
    }
    
    showWinningLines() {
        // إخفاء جميع الخطوط الفائزة
        document.querySelectorAll('.payline').forEach(line => {
            line.classList.remove('active');
        });
        
        // إظهار الخطوط الفائزة
        this.winningLines.forEach(({ lineIndex }) => {
            const lineElement = document.getElementById(`payline${lineIndex + 1}`);
            if (lineElement) {
                lineElement.classList.add('active');
            }
        });
        
        // إضافة تأثير الفوز للرموز
        this.winningLines.forEach(({ lineIndex }) => {
            const line = this.paylines[lineIndex];
            line.forEach((row, reelIndex) => {
                const symbolElement = document.querySelector(`#reel${reelIndex + 1} .symbol:nth-child(${row + 1})`);
                if (symbolElement) {
                    symbolElement.classList.add('winning');
                    setTimeout(() => {
                        symbolElement.classList.remove('winning');
                    }, 2000);
                }
            });
        });
    }
    
    showWinModal(amount) {
        const modal = document.getElementById('winModal');
        const title = document.getElementById('winTitle');
        const winAmount = document.getElementById('winAmount');
        
        if (amount >= 1000) {
            title.textContent = 'جائزة كبرى! 🎉';
        } else if (amount >= 500) {
            title.textContent = 'فوز كبير! 🎊';
        } else {
            title.textContent = 'مبروك! فزت! 🎈';
        }
        
        winAmount.textContent = `$${amount.toLocaleString()}`;
        modal.classList.remove('hidden');
        
        // إغلاق تلقائي بعد 3 ثوان
        setTimeout(() => {
            this.closeWinModal();
        }, 3000);
    }
    
    closeWinModal() {
        document.getElementById('winModal').classList.add('hidden');
    }
    
    showFreeSpinsModal() {
        const modal = document.getElementById('winModal');
        const title = document.getElementById('winTitle');
        const winAmount = document.getElementById('winAmount');
        
        title.textContent = '🎉 جولات مجانية!';
        winAmount.textContent = `15 جولة مجانية!`;
        modal.classList.remove('hidden');
        
        // إغلاق تلقائي بعد 3 ثوان
        setTimeout(() => {
            this.closeWinModal();
        }, 3000);
    }
    
    showFreeSpinsSummary() {
        const modal = document.getElementById('winModal');
        const title = document.getElementById('winTitle');
        const winAmount = document.getElementById('winAmount');
        
        title.textContent = '🎊 انتهت الجولات المجانية!';
        winAmount.textContent = `إجمالي الأرباح: $${this.gameState.freeSpinsWinnings.toLocaleString()}`;
        modal.classList.remove('hidden');
        
        // إغلاق تلقائي بعد 5 ثوان
        setTimeout(() => {
            this.closeWinModal();
        }, 5000);
    }
    
    updateFreeSpinsDisplay() {
        const freeSpinsElement = document.getElementById('freeSpinsDisplay');
        if (freeSpinsElement) {
            if (this.gameState.freeSpinsActive) {
                freeSpinsElement.textContent = `الجولات المجانية: ${this.gameState.freeSpinsRemaining}/${this.gameState.freeSpinsTotal}`;
                freeSpinsElement.style.display = 'block';
            } else {
                freeSpinsElement.style.display = 'none';
            }
        }
    }
    
    toggleAutoSpin() {
        this.gameState.autoSpin = !this.gameState.autoSpin;
        const autoBtn = document.getElementById('autoSpinBtn');
        
        if (this.gameState.autoSpin) {
            autoBtn.classList.add('active');
            autoBtn.innerHTML = '<i class="fas fa-stop"></i><span>إيقاف التلقائي</span>';
        } else {
            autoBtn.classList.remove('active');
            autoBtn.innerHTML = '<i class="fas fa-sync"></i><span>دوران تلقائي</span>';
        }
    }
    
    increaseBet() {
        const betAmounts = [5, 10, 25, 50, 100, 250, 500, 1000];
        const currentIndex = betAmounts.indexOf(this.gameState.currentBet);
        
        if (currentIndex < betAmounts.length - 1) {
            this.gameState.currentBet = betAmounts[currentIndex + 1];
            this.updateDisplay();
        }
    }
    
    decreaseBet() {
        const betAmounts = [5, 10, 25, 50, 100, 250, 500, 1000];
        const currentIndex = betAmounts.indexOf(this.gameState.currentBet);
        
        if (currentIndex > 0) {
            this.gameState.currentBet = betAmounts[currentIndex - 1];
            this.updateDisplay();
        }
    }
    
    updateDisplay() {
        document.getElementById('balance').textContent = this.gameState.balance.toLocaleString();
        document.getElementById('currentBet').textContent = this.gameState.currentBet;
        document.getElementById('betAmount').textContent = this.gameState.currentBet;
        document.getElementById('lastWin').textContent = this.gameState.lastWin.toLocaleString();
        document.getElementById('totalWins').textContent = this.gameState.totalWins.toLocaleString();
        
        // تحديث عرض الجولات المجانية
        this.updateFreeSpinsDisplay();
        
        // تعطيل أزرار الرهان إذا لم يكن هناك رصيد كافي أو أثناء الجولات المجانية
        const betDown = document.getElementById('betDown');
        const betUp = document.getElementById('betUp');
        const spinBtn = document.getElementById('spinBtn');
        
        betDown.disabled = this.gameState.currentBet <= 5 || this.gameState.freeSpinsActive;
        betUp.disabled = this.gameState.currentBet >= 1000 || this.gameState.freeSpinsActive;
        spinBtn.disabled = this.gameState.balance < this.gameState.currentBet || this.gameState.isSpinning || this.gameState.freeSpinsActive;
        
        // تحديث نص زر الدوران أثناء الجولات المجانية
        if (this.gameState.freeSpinsActive) {
            spinBtn.innerHTML = '<i class="fas fa-lock"></i><span>جولات مجانية</span>';
        } else {
            spinBtn.innerHTML = '<i class="fas fa-play"></i><span>دوران</span>';
        }
    }
    
    generatePaytable() {
        const paytableContent = document.getElementById('paytableContent');
        paytableContent.innerHTML = '';
        
        this.symbols.forEach(symbol => {
            const paytableItem = document.createElement('div');
            paytableItem.className = 'paytable-item';
            
            const symbolsDiv = document.createElement('div');
            symbolsDiv.className = 'paytable-symbols';
            
            // إظهار 3, 4, 5 رموز
            for (let count = 3; count <= 5; count++) {
                const symbolDiv = document.createElement('div');
                symbolDiv.className = 'paytable-symbol';
                symbolDiv.style.backgroundImage = `url(${symbol.image})`;
                symbolsDiv.appendChild(symbolDiv);
            }
            
            const payoutDiv = document.createElement('div');
            payoutDiv.className = 'paytable-payout';
            payoutDiv.innerHTML = `${this.payoutTable[symbol.value][3]}x / ${this.payoutTable[symbol.value][4]}x / ${this.payoutTable[symbol.value][5]}x`;
            
            paytableItem.appendChild(symbolsDiv);
            paytableItem.appendChild(payoutDiv);
            paytableContent.appendChild(paytableItem);
        });
    }
    
    // Admin Panel Functions
    toggleAdminPanel() {
        const panel = document.getElementById('adminPanel');
        panel.classList.toggle('hidden');
        
        if (!panel.classList.contains('hidden')) {
            this.loadAdminSettings();
        }
    }
    
    loadAdminSettings() {
        document.getElementById('winRate').value = this.adminSettings.winRate;
        document.getElementById('jackpotRate').value = this.adminSettings.jackpotRate;
        document.getElementById('houseEdge').value = this.adminSettings.houseEdge;
    }
    
    applyAdminSettings() {
        this.adminSettings.winRate = parseInt(document.getElementById('winRate').value);
        this.adminSettings.jackpotRate = parseInt(document.getElementById('jackpotRate').value);
        this.adminSettings.houseEdge = parseInt(document.getElementById('houseEdge').value);
        
        // إعادة توليد البكرات مع الإعدادات الجديدة
        this.generateReels();
        
        // إظهار رسالة تأكيد
        alert('تم تطبيق الإعدادات بنجاح!');
        
        this.toggleAdminPanel();
    }
    
    resetAdminSettings() {
        this.adminSettings = {
            winRate: 30,
            jackpotRate: 2,
            houseEdge: 5,
            isAdminMode: false
        };
        
        this.loadAdminSettings();
        this.generateReels();
        
        alert('تم إعادة تعيين الإعدادات إلى القيم الافتراضية!');
    }
    
    hideLoadingScreen() {
        setTimeout(() => {
            document.getElementById('loadingScreen').classList.add('hidden');
        }, 2000);
    }
}

// CSS Animation for spinning reels
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: translateY(0); }
        100% { transform: translateY(-100px); }
    }
`;
document.head.appendChild(style);

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.game = new NexGameCasino();
});

// Prevent context menu on right click
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Prevent drag and drop
document.addEventListener('dragstart', (e) => {
    e.preventDefault();
});
