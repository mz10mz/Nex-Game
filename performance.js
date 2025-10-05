// Performance Optimization and Additional Features for NexGame Casino
class PerformanceOptimizer {
    constructor() {
        this.isLowEndDevice = this.detectLowEndDevice();
        this.animationFrameId = null;
        this.lastFrameTime = 0;
        this.targetFPS = this.isLowEndDevice ? 30 : 60;
        this.frameInterval = 1000 / this.targetFPS;
        
        this.init();
    }
    
    init() {
        this.optimizeForDevice();
        this.setupPerformanceMonitoring();
        this.setupBatteryOptimization();
    }
    
    detectLowEndDevice() {
        // كشف الأجهزة منخفضة الأداء
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        
        if (!gl) return true;
        
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
            const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
            const isLowEnd = /intel|amd|mali|powervr|adreno 3|adreno 4|mali-4/i.test(renderer);
            return isLowEnd;
        }
        
        // كشف بناءً على ذاكرة الجهاز
        if (navigator.deviceMemory && navigator.deviceMemory <= 2) {
            return true;
        }
        
        // كشف بناءً على عدد المعالجات
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) {
            return true;
        }
        
        return false;
    }
    
    optimizeForDevice() {
        if (this.isLowEndDevice) {
            // تقليل جودة التأثيرات البصرية
            this.reduceVisualQuality();
            this.enableBatterySaving();
        }
        
        // تحسين استهلاك الذاكرة
        this.setupMemoryManagement();
    }
    
    reduceVisualQuality() {
        // تقليل عدد الجسيمات
        if (window.visualEffects) {
            window.visualEffects.maxParticles = 50;
            window.visualEffects.maxConfetti = 75;
        }
        
        // تعطيل التأثيرات المعقدة
        document.documentElement.style.setProperty('--particle-count', '50');
        document.documentElement.style.setProperty('--confetti-count', '75');
    }
    
    enableBatterySaving() {
        // تقليل معدل الإطارات
        this.targetFPS = 30;
        this.frameInterval = 1000 / this.targetFPS;
        
        // تعطيل الرسوم المتحركة عند عدم التركيز
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAnimations();
            } else {
                this.resumeAnimations();
            }
        });
    }
    
    setupMemoryManagement() {
        // تنظيف الذاكرة كل 30 ثانية
        setInterval(() => {
            this.cleanupMemory();
        }, 30000);
        
        // تنظيف الذاكرة عند تغيير الصفحة
        window.addEventListener('beforeunload', () => {
            this.cleanupMemory();
        });
    }
    
    cleanupMemory() {
        // تنظيف الجسيمات القديمة
        if (window.visualEffects) {
            window.visualEffects.particleSystem = window.visualEffects.particleSystem.filter(
                particle => particle.life > 0
            );
            window.visualEffects.confettiSystem = window.visualEffects.confettiSystem.filter(
                confetti => confetti.life > 0
            );
        }
        
        // إجبار جمع القمامة (إذا متاح)
        if (window.gc) {
            window.gc();
        }
    }
    
    setupPerformanceMonitoring() {
        // مراقبة الأداء
        if ('performance' in window) {
            this.monitorPerformance();
        }
        
        // مراقبة استهلاك الذاكرة
        if ('memory' in performance) {
            this.monitorMemory();
        }
    }
    
    monitorPerformance() {
        let frameCount = 0;
        let lastTime = performance.now();
        
        const measureFPS = () => {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime - lastTime >= 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                
                // تقليل الجودة إذا انخفضت FPS
                if (fps < 30 && !this.isLowEndDevice) {
                    this.enableBatterySaving();
                }
                
                frameCount = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(measureFPS);
        };
        
        requestAnimationFrame(measureFPS);
    }
    
    monitorMemory() {
        setInterval(() => {
            const memory = performance.memory;
            const usedMB = memory.usedJSHeapSize / 1024 / 1024;
            const totalMB = memory.totalJSHeapSize / 1024 / 1024;
            
            // تنظيف الذاكرة إذا تجاوزت 80%
            if (usedMB / totalMB > 0.8) {
                this.cleanupMemory();
            }
        }, 5000);
    }
    
    setupBatteryOptimization() {
        // تحسين استهلاك البطارية
        if ('getBattery' in navigator) {
            navigator.getBattery().then(battery => {
                this.optimizeForBattery(battery);
                
                battery.addEventListener('levelchange', () => {
                    this.optimizeForBattery(battery);
                });
            });
        }
    }
    
    optimizeForBattery(battery) {
        if (battery.level < 0.2) {
            // تقليل الأداء عند انخفاض البطارية
            this.enableBatterySaving();
            this.showBatteryWarning();
        } else if (battery.level > 0.5) {
            // استعادة الأداء العادي
            this.targetFPS = 60;
            this.frameInterval = 1000 / this.targetFPS;
        }
    }
    
    showBatteryWarning() {
        if (!document.getElementById('batteryWarning')) {
            const warning = document.createElement('div');
            warning.id = 'batteryWarning';
            warning.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #ff6b6b;
                color: white;
                padding: 10px 15px;
                border-radius: 5px;
                z-index: 10000;
                font-family: 'Cairo', sans-serif;
                font-size: 14px;
            `;
            warning.textContent = '🔋 بطارية منخفضة - تم تقليل الأداء';
            document.body.appendChild(warning);
            
            setTimeout(() => {
                if (warning.parentNode) {
                    warning.parentNode.removeChild(warning);
                }
            }, 5000);
        }
    }
    
    pauseAnimations() {
        // إيقاف الرسوم المتحركة
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
        
        // إيقاف التأثيرات البصرية
        if (window.visualEffects) {
            window.visualEffects.paused = true;
        }
    }
    
    resumeAnimations() {
        // استئناف الرسوم المتحركة
        if (window.visualEffects && !window.visualEffects.paused) {
            window.visualEffects.animate();
        }
    }
    
    // تحسينات إضافية للأداء
    optimizeCanvas() {
        const canvas = document.getElementById('effectsCanvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            
            // تحسين جودة الرسم
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            
            // تحسين الأداء
            ctx.globalCompositeOperation = 'source-over';
        }
    }
    
    // تحسين الصور
    optimizeImages() {
        const images = document.querySelectorAll('img, .symbol');
        images.forEach(img => {
            // تحسين تحميل الصور
            if (img.tagName === 'IMG') {
                img.loading = 'lazy';
                img.decoding = 'async';
            }
        });
    }
    
    // تحسين الخطوط
    optimizeFonts() {
        // تحميل الخطوط بشكل محسن
        const fontLink = document.createElement('link');
        fontLink.rel = 'preload';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&display=swap';
        fontLink.as = 'style';
        document.head.appendChild(fontLink);
    }
}

// تحسينات إضافية للعبة
class GameEnhancements {
    constructor() {
        this.setupKeyboardShortcuts();
        this.setupTouchGestures();
        this.setupSoundEffects();
        this.setupHapticFeedback();
    }
    
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // منع الاختصارات الافتراضية
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
            }
            
            // اختصارات اللعبة
            switch(e.key) {
                case ' ':
                    e.preventDefault();
                    if (window.game && !window.game.gameState.isSpinning) {
                        window.game.spin();
                    }
                    break;
                case 'Enter':
                    e.preventDefault();
                    if (window.game && !window.game.gameState.isSpinning) {
                        window.game.spin();
                    }
                    break;
                case 'a':
                case 'A':
                    e.preventDefault();
                    if (window.game) {
                        window.game.toggleAutoSpin();
                    }
                    break;
                case '+':
                case '=':
                    e.preventDefault();
                    if (window.game) {
                        window.game.increaseBet();
                    }
                    break;
                case '-':
                    e.preventDefault();
                    if (window.game) {
                        window.game.decreaseBet();
                    }
                    break;
                case 'Escape':
                    e.preventDefault();
                    if (window.game) {
                        window.game.closeWinModal();
                    }
                    break;
            }
        });
    }
    
    setupTouchGestures() {
        let touchStartX = 0;
        let touchStartY = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            
            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;
            
            // مسح لليسار - زيادة الرهان
            if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 50) {
                if (window.game) {
                    window.game.increaseBet();
                }
            }
            
            // مسح لليمين - تقليل الرهان
            if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX < -50) {
                if (window.game) {
                    window.game.decreaseBet();
                }
            }
            
            // مسح لأعلى - دوران
            if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY < -50) {
                if (window.game && !window.game.gameState.isSpinning) {
                    window.game.spin();
                }
            }
        });
    }
    
    setupSoundEffects() {
        // إنشاء نظام الصوت
        this.audioContext = null;
        this.sounds = {};
        
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.createSounds();
        } catch (e) {
            console.log('Audio not supported');
        }
    }
    
    createSounds() {
        if (!this.audioContext) return;
        
        // صوت الدوران
        this.sounds.spin = this.createTone(200, 0.1, 'sine');
        
        // صوت الفوز
        this.sounds.win = this.createTone(400, 0.3, 'sine');
        
        // صوت الفوز الكبير
        this.sounds.bigWin = this.createTone(600, 0.5, 'sine');
    }
    
    createTone(frequency, duration, type) {
        return () => {
            if (!this.audioContext) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = type;
            
            gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration);
        };
    }
    
    playSound(soundName) {
        if (this.sounds[soundName]) {
            this.sounds[soundName]();
        }
    }
    
    setupHapticFeedback() {
        // ردود فعل لمسية للأجهزة المدعومة
        if ('vibrate' in navigator) {
            this.vibrate = (pattern) => {
                navigator.vibrate(pattern);
            };
        }
    }
    
    triggerHapticFeedback(type) {
        if (!this.vibrate) return;
        
        switch(type) {
            case 'spin':
                this.vibrate(50);
                break;
            case 'win':
                this.vibrate([100, 50, 100]);
                break;
            case 'bigWin':
                this.vibrate([200, 100, 200, 100, 200]);
                break;
        }
    }
}

// تهيئة التحسينات
document.addEventListener('DOMContentLoaded', () => {
    // تحسين الأداء
    window.performanceOptimizer = new PerformanceOptimizer();
    
    // التحسينات الإضافية
    window.gameEnhancements = new GameEnhancements();
    
    // ربط الأصوات والاهتزاز بأحداث اللعبة
    if (window.game) {
        const originalSpin = window.game.spin;
        window.game.spin = function() {
            window.gameEnhancements.playSound('spin');
            window.gameEnhancements.triggerHapticFeedback('spin');
            return originalSpin.call(this);
        };
        
        // ربط أصوات الفوز
        document.addEventListener('gameWin', () => {
            window.gameEnhancements.playSound('win');
            window.gameEnhancements.triggerHapticFeedback('win');
        });
        
        document.addEventListener('bigWin', () => {
            window.gameEnhancements.playSound('bigWin');
            window.gameEnhancements.triggerHapticFeedback('bigWin');
        });
    }
});
