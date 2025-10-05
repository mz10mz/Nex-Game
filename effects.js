// Advanced Visual Effects for NexGame Casino
class VisualEffects {
    constructor() {
        this.particleSystem = [];
        this.confettiSystem = [];
        this.init();
    }
    
    init() {
        this.createParticleCanvas();
        this.setupEventListeners();
    }
    
    createParticleCanvas() {
        // إنشاء canvas للتأثيرات البصرية
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'effectsCanvas';
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '999';
        document.body.appendChild(this.canvas);
        
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    setupEventListeners() {
        // ربط التأثيرات بأحداث اللعبة
        document.addEventListener('gameWin', (e) => {
            this.triggerWinEffects(e.detail.amount);
        });
        
        document.addEventListener('bigWin', (e) => {
            this.triggerBigWinEffects();
        });
        
        document.addEventListener('jackpot', (e) => {
            this.triggerJackpotEffects();
        });
    }
    
    // تأثيرات الفوز العادي
    triggerWinEffects(amount) {
        this.createParticles(50, '#ffd700');
        this.createSparkles(30);
        
        if (amount >= 500) {
            this.triggerBigWinEffects();
        }
    }
    
    // تأثيرات الفوز الكبير
    triggerBigWinEffects() {
        this.createConfetti();
        this.createParticles(100, '#ff6b6b');
        this.createSparkles(50);
        this.screenShake();
        this.flashScreen('#ffd700');
    }
    
    // تأثيرات الجائزة الكبرى
    triggerJackpotEffects() {
        this.createConfetti();
        this.createParticles(200, '#ffd700');
        this.createSparkles(100);
        this.screenShake(0.5);
        this.flashScreen('#ffd700', 3);
        this.createFireworks();
    }
    
    // نظام الجسيمات
    createParticles(count, color) {
        for (let i = 0; i < count; i++) {
            this.particleSystem.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                life: 1.0,
                decay: Math.random() * 0.02 + 0.01,
                size: Math.random() * 5 + 2,
                color: color,
                alpha: 1.0
            });
        }
    }
    
    // نظام الألماس المتلألئ
    createSparkles(count) {
        for (let i = 0; i < count; i++) {
            this.particleSystem.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: 0,
                vy: 0,
                life: 1.0,
                decay: 0.01,
                size: Math.random() * 3 + 1,
                color: '#ffffff',
                alpha: 1.0,
                type: 'sparkle',
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.2
            });
        }
    }
    
    // نظام الكونفيتي
    createConfetti() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
        
        for (let i = 0; i < 150; i++) {
            this.confettiSystem.push({
                x: Math.random() * this.canvas.width,
                y: -10,
                vx: (Math.random() - 0.5) * 4,
                vy: Math.random() * 3 + 2,
                life: 1.0,
                decay: 0.005,
                size: Math.random() * 8 + 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                alpha: 1.0,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.1,
                gravity: 0.1
            });
        }
    }
    
    // الألعاب النارية
    createFireworks() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#ffd700'];
        
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const centerX = Math.random() * this.canvas.width;
                const centerY = Math.random() * this.canvas.height * 0.5;
                
                for (let j = 0; j < 50; j++) {
                    const angle = (Math.PI * 2 * j) / 50;
                    const speed = Math.random() * 8 + 4;
                    
                    this.particleSystem.push({
                        x: centerX,
                        y: centerY,
                        vx: Math.cos(angle) * speed,
                        vy: Math.sin(angle) * speed,
                        life: 1.0,
                        decay: 0.01,
                        size: Math.random() * 4 + 2,
                        color: colors[Math.floor(Math.random() * colors.length)],
                        alpha: 1.0,
                        type: 'firework',
                        gravity: 0.05
                    });
                }
            }, i * 500);
        }
    }
    
    // اهتزاز الشاشة
    screenShake(intensity = 0.3) {
        const gameContainer = document.querySelector('.game-container');
        const originalTransform = gameContainer.style.transform;
        
        let shakeX = 0;
        let shakeY = 0;
        const shakeDuration = 500;
        const startTime = Date.now();
        
        const shake = () => {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / shakeDuration;
            
            if (progress < 1) {
                shakeX = (Math.random() - 0.5) * intensity * 20 * (1 - progress);
                shakeY = (Math.random() - 0.5) * intensity * 20 * (1 - progress);
                
                gameContainer.style.transform = `translate(${shakeX}px, ${shakeY}px)`;
                requestAnimationFrame(shake);
            } else {
                gameContainer.style.transform = originalTransform;
            }
        };
        
        shake();
    }
    
    // وميض الشاشة
    flashScreen(color, duration = 1) {
        const flash = document.createElement('div');
        flash.style.position = 'fixed';
        flash.style.top = '0';
        flash.style.left = '0';
        flash.style.width = '100%';
        flash.style.height = '100%';
        flash.style.backgroundColor = color;
        flash.style.pointerEvents = 'none';
        flash.style.zIndex = '1001';
        flash.style.opacity = '0.3';
        flash.style.animation = `flash ${duration}s ease-out`;
        
        document.body.appendChild(flash);
        
        setTimeout(() => {
            document.body.removeChild(flash);
        }, duration * 1000);
    }
    
    // تحديث الرسوم المتحركة
    update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // تحديث الجسيمات
        this.particleSystem = this.particleSystem.filter(particle => {
            this.updateParticle(particle);
            this.drawParticle(particle);
            return particle.life > 0;
        });
        
        // تحديث الكونفيتي
        this.confettiSystem = this.confettiSystem.filter(confetti => {
            this.updateConfetti(confetti);
            this.drawConfetti(confetti);
            return confetti.life > 0;
        });
    }
    
    updateParticle(particle) {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= particle.decay;
        particle.alpha = particle.life;
        
        if (particle.gravity) {
            particle.vy += particle.gravity;
        }
        
        if (particle.rotationSpeed) {
            particle.rotation += particle.rotationSpeed;
        }
    }
    
    updateConfetti(confetti) {
        confetti.x += confetti.vx;
        confetti.y += confetti.vy;
        confetti.vy += confetti.gravity;
        confetti.life -= confetti.decay;
        confetti.alpha = confetti.life;
        confetti.rotation += confetti.rotationSpeed;
    }
    
    drawParticle(particle) {
        this.ctx.save();
        this.ctx.globalAlpha = particle.alpha;
        this.ctx.translate(particle.x, particle.y);
        
        if (particle.rotation) {
            this.ctx.rotate(particle.rotation);
        }
        
        if (particle.type === 'sparkle') {
            this.drawSparkle(particle);
        } else if (particle.type === 'firework') {
            this.drawFirework(particle);
        } else {
            this.drawCircle(particle);
        }
        
        this.ctx.restore();
    }
    
    drawConfetti(confetti) {
        this.ctx.save();
        this.ctx.globalAlpha = confetti.alpha;
        this.ctx.translate(confetti.x, confetti.y);
        this.ctx.rotate(confetti.rotation);
        
        this.ctx.fillStyle = confetti.color;
        this.ctx.fillRect(-confetti.size/2, -confetti.size/2, confetti.size, confetti.size);
        
        this.ctx.restore();
    }
    
    drawCircle(particle) {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
        this.ctx.fillStyle = particle.color;
        this.ctx.fill();
    }
    
    drawSparkle(particle) {
        this.ctx.strokeStyle = particle.color;
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        
        // رسم نجمة متلألئة
        for (let i = 0; i < 4; i++) {
            const angle = (Math.PI * i) / 2;
            this.ctx.moveTo(0, 0);
            this.ctx.lineTo(Math.cos(angle) * particle.size, Math.sin(angle) * particle.size);
        }
        
        this.ctx.stroke();
    }
    
    drawFirework(particle) {
        this.ctx.fillStyle = particle.color;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
        this.ctx.fill();
        
        // إضافة توهج
        this.ctx.shadowColor = particle.color;
        this.ctx.shadowBlur = 10;
        this.ctx.fill();
    }
    
    // حلقة الرسوم المتحركة
    animate() {
        this.update();
        requestAnimationFrame(() => this.animate());
    }
    
    // بدء النظام
    start() {
        this.animate();
    }
}

// CSS للرسوم المتحركة
const effectsStyle = document.createElement('style');
effectsStyle.textContent = `
    @keyframes flash {
        0% { opacity: 0; }
        50% { opacity: 0.8; }
        100% { opacity: 0; }
    }
    
    @keyframes particleGlow {
        0% { box-shadow: 0 0 5px currentColor; }
        50% { box-shadow: 0 0 20px currentColor; }
        100% { box-shadow: 0 0 5px currentColor; }
    }
    
    .winning-symbol {
        animation: particleGlow 0.5s ease-in-out infinite;
    }
`;
document.head.appendChild(effectsStyle);

// تهيئة التأثيرات البصرية
document.addEventListener('DOMContentLoaded', () => {
    window.visualEffects = new VisualEffects();
    window.visualEffects.start();
});

// دمج التأثيرات مع نظام اللعبة
document.addEventListener('DOMContentLoaded', () => {
    // ربط التأثيرات بأحداث اللعبة
    const originalSpin = window.game?.spin;
    if (originalSpin) {
        window.game.spin = function() {
            const result = originalSpin.call(this);
            
            // إضافة تأثيرات بصرية إضافية
            if (this.gameState.lastWin > 0) {
                if (this.gameState.lastWin >= 1000) {
                    document.dispatchEvent(new CustomEvent('jackpot', { detail: { amount: this.gameState.lastWin } }));
                } else if (this.gameState.lastWin >= 500) {
                    document.dispatchEvent(new CustomEvent('bigWin', { detail: { amount: this.gameState.lastWin } }));
                } else {
                    document.dispatchEvent(new CustomEvent('gameWin', { detail: { amount: this.gameState.lastWin } }));
                }
            }
            
            return result;
        };
    }
});
