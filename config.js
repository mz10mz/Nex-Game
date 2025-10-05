// Configuration and Settings for NexGame Casino
class GameConfig {
    constructor() {
        this.config = {
            // إعدادات اللعبة الأساسية
            game: {
                initialBalance: 1000,
                minBet: 5,
                maxBet: 1000,
                betIncrements: [5, 10, 25, 50, 100, 250, 500, 1000],
                maxAutoSpins: 100,
                defaultWinRate: 30,
                defaultJackpotRate: 2,
                defaultHouseEdge: 5
            },
            
            // إعدادات الرموز
            symbols: {
                blue_gem: { value: 1, weight: 25, image: 'assets/blue_gem.PNG' },
                green_gem: { value: 2, weight: 20, image: 'assets/green_gem.PNG' },
                purple_gem: { value: 3, weight: 15, image: 'assets/purple_gem.PNG' },
                red_gem: { value: 4, weight: 12, image: 'assets/red_gem.PNG' },
                ring: { value: 5, weight: 10, image: 'assets/ring.PNG' },
                cup: { value: 6, weight: 8, image: 'assets/cup.PNG' },
                crown: { value: 7, weight: 5, image: 'assets/crown.PNG' },
                scatter: { value: 8, weight: 5, image: 'assets/scatter.PNG' }
            },
            
            // جدول المدفوعات
            payouts: {
                1: { 3: 5, 4: 15, 5: 50 },    // blue_gem
                2: { 3: 8, 4: 25, 5: 80 },    // green_gem
                3: { 3: 12, 4: 40, 5: 120 },  // purple_gem
                4: { 3: 18, 4: 60, 5: 200 },  // red_gem
                5: { 3: 25, 4: 100, 5: 300 }, // ring
                6: { 3: 35, 4: 150, 5: 500 }, // cup
                7: { 3: 50, 4: 250, 5: 1000 }, // crown
                8: { 3: 100, 4: 500, 5: 2000 } // scatter
            },
            
            // خطوط الفوز
            paylines: [
                [0, 0, 0, 0, 0], // خط أفقي علوي
                [1, 1, 1, 1, 1], // خط أفقي وسط
                [2, 2, 2, 2, 2], // خط أفقي سفلي
                [0, 1, 2, 1, 0], // خط مائل صاعد
                [2, 1, 0, 1, 2], // خط مائل هابط
                [0, 0, 1, 2, 2], // خط متعرج
                [2, 2, 1, 0, 0], // خط متعرج معكوس
                [1, 0, 0, 0, 1], // خط V
                [1, 2, 2, 2, 1]  // خط V معكوس
            ],
            
            // إعدادات الأداء
            performance: {
                targetFPS: 60,
                lowEndDeviceFPS: 30,
                maxParticles: 100,
                maxConfetti: 150,
                memoryCleanupInterval: 30000,
                batteryOptimizationThreshold: 0.2
            },
            
            // إعدادات الصوت
            audio: {
                enabled: true,
                volume: 0.5,
                sounds: {
                    spin: { frequency: 200, duration: 0.1, type: 'sine' },
                    win: { frequency: 400, duration: 0.3, type: 'sine' },
                    bigWin: { frequency: 600, duration: 0.5, type: 'sine' },
                    jackpot: { frequency: 800, duration: 1.0, type: 'sine' }
                }
            },
            
            // إعدادات الاهتزاز
            haptic: {
                enabled: true,
                patterns: {
                    spin: [50],
                    win: [100, 50, 100],
                    bigWin: [200, 100, 200, 100, 200],
                    jackpot: [300, 150, 300, 150, 300, 150, 300]
                }
            },
            
            // إعدادات الواجهة
            ui: {
                language: 'ar',
                theme: 'dark',
                animations: true,
                soundEnabled: true,
                hapticEnabled: true,
                showPaylines: true,
                showPayouts: true
            },
            
            // إعدادات الإدمن
            admin: {
                password: 'admin123', // كلمة مرور الإدمن
                sessionTimeout: 300000, // 5 دقائق
                logActions: true,
                maxWinRate: 100,
                minWinRate: 0,
                maxJackpotRate: 10,
                minJackpotRate: 0,
                maxHouseEdge: 50,
                minHouseEdge: 0
            }
        };
        
        this.loadFromStorage();
    }
    
    // تحميل الإعدادات من التخزين المحلي
    loadFromStorage() {
        try {
            const savedConfig = localStorage.getItem('nexgame_config');
            if (savedConfig) {
                const parsedConfig = JSON.parse(savedConfig);
                this.config = this.mergeConfigs(this.config, parsedConfig);
            }
        } catch (e) {
            console.log('Error loading config from storage:', e);
        }
    }
    
    // حفظ الإعدادات في التخزين المحلي
    saveToStorage() {
        try {
            localStorage.setItem('nexgame_config', JSON.stringify(this.config));
        } catch (e) {
            console.log('Error saving config to storage:', e);
        }
    }
    
    // دمج الإعدادات
    mergeConfigs(base, override) {
        const result = { ...base };
        
        for (const key in override) {
            if (override[key] && typeof override[key] === 'object' && !Array.isArray(override[key])) {
                result[key] = this.mergeConfigs(base[key] || {}, override[key]);
            } else {
                result[key] = override[key];
            }
        }
        
        return result;
    }
    
    // الحصول على قيمة إعداد
    get(path) {
        return this.getNestedValue(this.config, path);
    }
    
    // تعيين قيمة إعداد
    set(path, value) {
        this.setNestedValue(this.config, path, value);
        this.saveToStorage();
    }
    
    // الحصول على قيمة متداخلة
    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => current?.[key], obj);
    }
    
    // تعيين قيمة متداخلة
    setNestedValue(obj, path, value) {
        const keys = path.split('.');
        const lastKey = keys.pop();
        const target = keys.reduce((current, key) => {
            if (!current[key]) current[key] = {};
            return current[key];
        }, obj);
        target[lastKey] = value;
    }
    
    // إعادة تعيين الإعدادات
    reset() {
        this.config = new GameConfig().config;
        this.saveToStorage();
    }
    
    // تصدير الإعدادات
    export() {
        return JSON.stringify(this.config, null, 2);
    }
    
    // استيراد الإعدادات
    import(configString) {
        try {
            const importedConfig = JSON.parse(configString);
            this.config = this.mergeConfigs(this.config, importedConfig);
            this.saveToStorage();
            return true;
        } catch (e) {
            console.error('Error importing config:', e);
            return false;
        }
    }
    
    // التحقق من صحة الإعدادات
    validate() {
        const errors = [];
        
        // التحقق من إعدادات اللعبة
        if (this.config.game.initialBalance < 0) {
            errors.push('Initial balance must be positive');
        }
        
        if (this.config.game.minBet < 1) {
            errors.push('Minimum bet must be at least 1');
        }
        
        if (this.config.game.maxBet < this.config.game.minBet) {
            errors.push('Maximum bet must be greater than minimum bet');
        }
        
        // التحقق من نسب الإدمن
        if (this.config.game.defaultWinRate < 0 || this.config.game.defaultWinRate > 100) {
            errors.push('Win rate must be between 0 and 100');
        }
        
        if (this.config.game.defaultJackpotRate < 0 || this.config.game.defaultJackpotRate > 10) {
            errors.push('Jackpot rate must be between 0 and 10');
        }
        
        if (this.config.game.defaultHouseEdge < 0 || this.config.game.defaultHouseEdge > 50) {
            errors.push('House edge must be between 0 and 50');
        }
        
        return errors;
    }
    
    // الحصول على إحصائيات اللعبة
    getGameStats() {
        return {
            totalSpins: this.get('game.totalSpins') || 0,
            totalWins: this.get('game.totalWins') || 0,
            totalLosses: this.get('game.totalLosses') || 0,
            biggestWin: this.get('game.biggestWin') || 0,
            currentStreak: this.get('game.currentStreak') || 0,
            longestStreak: this.get('game.longestStreak') || 0
        };
    }
    
    // تحديث إحصائيات اللعبة
    updateStats(spinResult) {
        const currentSpins = this.get('game.totalSpins') || 0;
        this.set('game.totalSpins', currentSpins + 1);
        
        if (spinResult.win > 0) {
            const currentWins = this.get('game.totalWins') || 0;
            this.set('game.totalWins', currentWins + spinResult.win);
            
            const biggestWin = this.get('game.biggestWin') || 0;
            if (spinResult.win > biggestWin) {
                this.set('game.biggestWin', spinResult.win);
            }
            
            const currentStreak = this.get('game.currentStreak') || 0;
            this.set('game.currentStreak', currentStreak + 1);
            
            const longestStreak = this.get('game.longestStreak') || 0;
            if (currentStreak + 1 > longestStreak) {
                this.set('game.longestStreak', currentStreak + 1);
            }
        } else {
            this.set('game.currentStreak', 0);
            
            const currentLosses = this.get('game.totalLosses') || 0;
            this.set('game.totalLosses', currentLosses + spinResult.bet);
        }
    }
}

// إنشاء مثيل عام للإعدادات
window.gameConfig = new GameConfig();

// تصدير للاستخدام في ملفات أخرى
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GameConfig;
}
