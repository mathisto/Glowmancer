class GlyphSprite extends Phaser.GameObjects.Container {
    constructor(scene, x, y, glyph) {
        super(scene, x, y);
        
        // Safety check for undefined glyph
        if (!glyph) {
            console.error('GlyphSprite created with undefined glyph');
            glyph = '?'; // Fallback glyph
        }
        
        this.glyph = glyph;
        this.glyphColors = {
            '◆': '#ff4444',
            '◇': '#4444ff', 
            '◈': '#ffff44',
            '◊': '#44ff44',
            '★': '#ff44ff',
            '☆': '#44ffff',
            '✦': '#ffffff',
            '✧': '#888888',
            '●': '#ff8844',
            '○': '#88ff44',
            '▲': '#ff88ff',
            '▼': '#88ffff',
            '►': '#ffff88',
            '◄': '#8888ff',
            '■': '#ff4488',
            '□': '#44ff88',
            '▪': '#8844ff',
            '▫': '#44ffff',
            '✚': '#ffaa44',
            '✖': '#44aaff',
            '✸': '#aaff44',
            '✹': '#ff44aa',
            '?': '#666666'  // Fallback color
        };
        
        // Get color with fallback
        const glyphColor = this.glyphColors[glyph] || '#666666';
        
        // Create background circle
        this.bg = scene.add.circle(0, 0, 25, 0x1a1a2e, 0.8);
        this.bg.setStrokeStyle(2, parseInt(glyphColor.replace('#', '0x')));
        this.add(this.bg);
        
        // Create glyph text
        this.text = scene.add.text(0, 0, glyph, {
            font: 'bold 28px monospace',
            fill: glyphColor
        });
        this.text.setOrigin(0.5);
        this.add(this.text);
        
        // Add glow effect
        this.text.setShadow(0, 0, glyphColor, 8, true, true);
        
        // Add to scene
        scene.add.existing(this);
        
        // Subtle floating animation
        scene.tweens.add({
            targets: this,
            y: y + Phaser.Math.Between(-3, 3),
            duration: 2000 + Phaser.Math.Between(0, 1000),
            ease: 'Sine.inOut',
            yoyo: true,
            repeat: -1
        });
    }
    
    setInteractive() {
        this.bg.setInteractive();
        
        this.bg.on('pointerover', () => {
            this.scene.tweens.add({
                targets: this,
                scaleX: 1.2,
                scaleY: 1.2,
                duration: 100,
                ease: 'Power2'
            });
            const color = this.glyphColors[this.glyph] || '#666666';
            this.bg.setStrokeStyle(3, parseInt(color.replace('#', '0x')));
        });
        
        this.bg.on('pointerout', () => {
            this.scene.tweens.add({
                targets: this,
                scaleX: 1,
                scaleY: 1,
                duration: 100,
                ease: 'Power2'
            });
            const color = this.glyphColors[this.glyph] || '#666666';
            this.bg.setStrokeStyle(2, parseInt(color.replace('#', '0x')));
        });
        
        return this;
    }
    
    pulse(color = null) {
        const pulseColor = color || this.glyphColors[this.glyph] || '#666666';
        
        this.scene.tweens.add({
            targets: this.bg,
            fillAlpha: 1,
            duration: 200,
            yoyo: true,
            onStart: () => {
                this.bg.setFillStyle(parseInt(pulseColor.replace('#', '0x')));
            },
            onComplete: () => {
                this.bg.setFillStyle(0x1a1a2e, 0.8);
            }
        });
    }
    
    animateTransform(newX, newY, duration = 300, onComplete = null) {
        this.scene.tweens.add({
            targets: this,
            x: newX,
            y: newY,
            duration: duration,
            ease: 'Power2',
            onComplete: onComplete
        });
    }
    
    sparkle() {
        // Create particle burst
        const particles = this.scene.add.particles(this.x, this.y, 'particle', {
            speed: { min: 50, max: 150 },
            scale: { start: 0.5, end: 0 },
            blendMode: 'ADD',
            lifespan: 600,
            quantity: 10,
            tint: parseInt((this.glyphColors[this.glyph] || '#666666').replace('#', '0x'))
        });
        
        this.scene.time.delayedCall(600, () => {
            particles.destroy();
        });
    }
    
    destroy() {
        // Kill all tweens targeting this sprite
        if (this.scene) {
            this.scene.tweens.killTweensOf(this);
            this.scene.tweens.killTweensOf(this.bg);
            this.scene.tweens.killTweensOf(this.text);
        }
        
        // Remove event listeners
        if (this.bg) {
            this.bg.removeAllListeners();
        }
        
        // Call parent destroy
        super.destroy();
    }
}