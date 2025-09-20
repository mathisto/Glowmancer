class SpellEffects {
    constructor(scene) {
        this.scene = scene;
    }
    
    playSpellEffect(spellName, glyphSprites, onComplete) {
        switch(spellName) {
            case 'reverse':
                this.reverseEffect(glyphSprites, onComplete);
                break;
            case 'transpose':
                this.transposeEffect(glyphSprites, onComplete);
                break;
            case 'rotateLeft':
                this.rotateEffect(glyphSprites, true, onComplete);
                break;
            case 'rotateRight':
                this.rotateEffect(glyphSprites, false, onComplete);
                break;
            case 'reverseRows':
                this.reverseRowsEffect(glyphSprites, onComplete);
                break;
            case 'flatten':
                this.flattenEffect(glyphSprites, onComplete);
                break;
            case 'reshape2x3':
            case 'reshape3x2':
                this.reshapeEffect(glyphSprites, onComplete);
                break;
            default:
                // For any unhandled operations, just do a simple pulse
                this.genericEffect(glyphSprites, onComplete);
        }
    }
    
    reverseEffect(sprites, onComplete) {
        // Don't move sprites - they'll be recreated in new positions
        // Just show a visual effect indicating reversal
        
        // Flash all sprites
        sprites.forEach(sprite => sprite.pulse('#8a2be2'));
        
        // Create a mirror line effect through the center
        const centerX = this.scene.cameras.main.width / 4;
        const line = this.scene.add.rectangle(centerX, 250, 2, 200, 0x8a2be2, 1);
        
        // Expand the line horizontally to create mirror effect
        this.scene.tweens.add({
            targets: line,
            scaleX: 150,
            alpha: 0,
            duration: 400,
            ease: 'Power2',
            onComplete: () => line.destroy()
        });
        
        // Scale sprites horizontally to create flip effect
        sprites.forEach((sprite, i) => {
            this.scene.tweens.add({
                targets: sprite,
                scaleX: 0,
                duration: 200,
                ease: 'Power2',
                yoyo: true,
                onComplete: () => {
                    sprite.sparkle();
                    if (i === sprites.length - 1 && onComplete) {
                        this.scene.time.delayedCall(100, onComplete);
                    }
                }
            });
        });
    }
    
    transposeEffect(sprites, onComplete) {
        // For transpose, show a rotation effect without moving sprites
        
        const centerX = this.scene.cameras.main.width / 4;
        const centerY = 250;
        
        // Create grid overlay
        const gridContainer = this.scene.add.container(centerX, centerY);
        
        // Add grid lines
        for (let i = -1; i <= 1; i++) {
            const vLine = this.scene.add.rectangle(i * 60, 0, 1, 180, 0x44ccff, 0.6);
            const hLine = this.scene.add.rectangle(0, i * 60, 180, 1, 0x44ccff, 0.6);
            gridContainer.add([vLine, hLine]);
        }
        
        // Rotate the grid 90 degrees
        this.scene.tweens.add({
            targets: gridContainer,
            angle: 90,
            alpha: 0,
            duration: 500,
            ease: 'Power2',
            onComplete: () => gridContainer.destroy()
        });
        
        // Pulse sprites with a flip effect
        sprites.forEach((sprite, i) => {
            sprite.pulse('#44ccff');
            
            // Shrink and grow to simulate flip
            this.scene.tweens.add({
                targets: sprite,
                scaleX: 0.1,
                scaleY: 0.1,
                duration: 250,
                ease: 'Power2',
                yoyo: true,
                onComplete: () => {
                    sprite.sparkle();
                    if (i === sprites.length - 1 && onComplete) {
                        this.scene.time.delayedCall(100, onComplete);
                    }
                }
            });
        });
    }
    
    rotateEffect(sprites, isLeft, onComplete) {
        // Show rotation without moving sprites
        
        const centerX = this.scene.cameras.main.width / 4;
        const centerY = 250;
        
        // Create rotation indicator
        const circle = this.scene.add.circle(centerX, centerY, 100, 0x000000, 0);
        circle.setStrokeStyle(3, 0xffcc00, 1);
        
        // Add rotation arrow
        const arrow = this.scene.add.text(
            centerX, 
            centerY - 120, 
            isLeft ? '↺' : '↻', 
            { font: 'bold 48px monospace', fill: '#ffcc00' }
        );
        arrow.setOrigin(0.5);
        
        // Animate circle and arrow
        this.scene.tweens.add({
            targets: circle,
            angle: isLeft ? -360 : 360,
            duration: 500,
            ease: 'Power2'
        });
        
        this.scene.tweens.add({
            targets: [circle, arrow],
            alpha: 0,
            duration: 600,
            ease: 'Power2',
            onComplete: () => {
                circle.destroy();
                arrow.destroy();
            }
        });
        
        // Just pulse the sprites in sequence to show movement direction
        sprites.forEach((sprite, i) => {
            this.scene.time.delayedCall(i * 50, () => {
                sprite.pulse('#ffcc00');
                sprite.sparkle();
                
                if (i === sprites.length - 1 && onComplete) {
                    this.scene.time.delayedCall(200, onComplete);
                }
            });
        });
    }
    
    reverseRowsEffect(sprites, onComplete) {
        // Flash sprites row by row
        sprites.forEach((sprite, i) => {
            sprite.pulse('#ff88ff');
        });
        
        // Create horizontal flip lines
        const centerX = this.scene.cameras.main.width / 4;
        
        // Estimate row positions (this is approximate)
        const rowY = [220, 280]; // Assuming 2 rows
        
        rowY.forEach(y => {
            const line = this.scene.add.rectangle(centerX, y, 200, 2, 0xff88ff, 1);
            
            this.scene.tweens.add({
                targets: line,
                scaleX: 0,
                alpha: 0,
                duration: 400,
                ease: 'Power2',
                onComplete: () => line.destroy()
            });
        });
        
        // Flip sprites horizontally
        sprites.forEach((sprite, i) => {
            this.scene.tweens.add({
                targets: sprite,
                scaleX: -1,
                duration: 200,
                yoyo: true,
                ease: 'Power2',
                onComplete: () => {
                    sprite.sparkle();
                    if (i === sprites.length - 1 && onComplete) {
                        this.scene.time.delayedCall(100, onComplete);
                    }
                }
            });
        });
    }
    
    flattenEffect(sprites, onComplete) {
        // Create compression effect
        const centerX = this.scene.cameras.main.width / 4;
        const centerY = 250;
        
        // Compression lines from top and bottom
        const topLine = this.scene.add.rectangle(centerX, centerY - 80, 300, 3, 0x44ff44, 1);
        const bottomLine = this.scene.add.rectangle(centerX, centerY + 80, 300, 3, 0x44ff44, 1);
        
        this.scene.tweens.add({
            targets: [topLine, bottomLine],
            y: centerY,
            scaleY: 0.1,
            alpha: 0,
            duration: 400,
            ease: 'Power2',
            onComplete: () => {
                topLine.destroy();
                bottomLine.destroy();
            }
        });
        
        // Compress sprites vertically
        sprites.forEach((sprite, i) => {
            sprite.pulse('#44ff44');
            
            this.scene.tweens.add({
                targets: sprite,
                scaleY: 0.2,
                duration: 200,
                yoyo: true,
                ease: 'Power2',
                onComplete: () => {
                    sprite.sparkle();
                    if (i === sprites.length - 1 && onComplete) {
                        this.scene.time.delayedCall(100, onComplete);
                    }
                }
            });
        });
    }
    
    reshapeEffect(sprites, onComplete) {
        // Grid formation effect
        const centerX = this.scene.cameras.main.width / 4;
        const centerY = 250;
        
        // Create expanding grid
        const grid = this.scene.add.container(centerX, centerY);
        
        // Add grid points
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const dot = this.scene.add.circle(i * 60, j * 60, 3, 0xffffff, 1);
                grid.add(dot);
            }
        }
        
        // Expand and fade grid
        this.scene.tweens.add({
            targets: grid,
            scaleX: 2,
            scaleY: 2,
            alpha: 0,
            duration: 600,
            ease: 'Power2',
            onComplete: () => grid.destroy()
        });
        
        // Pulse sprites with scaling
        sprites.forEach((sprite, i) => {
            sprite.pulse('#ffffff');
            
            this.scene.tweens.add({
                targets: sprite,
                scaleX: 1.3,
                scaleY: 1.3,
                duration: 200,
                yoyo: true,
                ease: 'Back',
                onComplete: () => {
                    sprite.sparkle();
                    if (i === sprites.length - 1 && onComplete) {
                        this.scene.time.delayedCall(100, onComplete);
                    }
                }
            });
        });
    }
    
    genericEffect(sprites, onComplete) {
        // Generic effect for operations without specific animations
        const centerX = this.scene.cameras.main.width / 4;
        const centerY = 250;
        
        // Create a magical circle
        const circle = this.scene.add.circle(centerX, centerY, 80, 0x000000, 0);
        circle.setStrokeStyle(2, 0x8a2be2, 1);
        
        this.scene.tweens.add({
            targets: circle,
            scaleX: 2,
            scaleY: 2,
            alpha: 0,
            duration: 500,
            ease: 'Power2',
            onComplete: () => circle.destroy()
        });
        
        // Pulse all sprites
        sprites.forEach((sprite, i) => {
            sprite.pulse('#8a2be2');
            this.scene.time.delayedCall(i * 30, () => {
                sprite.sparkle();
                if (i === sprites.length - 1 && onComplete) {
                    this.scene.time.delayedCall(200, onComplete);
                }
            });
        });
    }
    
    createMagicCircle(x, y, color = 0x8a2be2) {
        const circle = this.scene.add.circle(x, y, 50, 0x000000, 0);
        circle.setStrokeStyle(2, color, 1);
        
        // Inner circle
        const inner = this.scene.add.circle(x, y, 30, 0x000000, 0);
        inner.setStrokeStyle(1, color, 0.5);
        
        // Animate
        this.scene.tweens.add({
            targets: [circle, inner],
            scaleX: 2,
            scaleY: 2,
            alpha: 0,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                circle.destroy();
                inner.destroy();
            }
        });
        
        // Rotating runes
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const runeX = x + Math.cos(angle) * 60;
            const runeY = y + Math.sin(angle) * 60;
            
            const rune = this.scene.add.text(runeX, runeY, '✦', {
                font: '16px monospace',
                fill: '#' + color.toString(16).padStart(6, '0')
            });
            rune.setOrigin(0.5);
            
            this.scene.tweens.add({
                targets: rune,
                angle: 360,
                alpha: 0,
                duration: 1000,
                ease: 'Power2',
                onComplete: () => rune.destroy()
            });
        }
    }
}