class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.glyphSprites = [];
        this.targetGlyphSprites = [];
        this.isAnimating = false;
    }

    create() {
        const { width, height } = this.cameras.main;
        
        // Clean up any previous event listeners
        this.input.keyboard.removeAllListeners();
        
        // Get game systems
        this.operationLoader = this.registry.get('operationLoader');
        this.levelManager = this.registry.get('levelManager');
        this.gameEngine = this.registry.get('gameEngine');
        
        // Load first level
        const level = this.levelManager.getCurrentLevel();
        this.gameEngine.loadLevel(level);
        
        // Create UI background
        this.add.rectangle(width/2, height/2, width, height, 0x0a0e27);
        
        // Level title
        this.levelText = this.add.text(width/2, 40, `Level ${level.id}: ${level.name}`, {
            font: 'bold 28px monospace',
            fill: '#ffffff'
        });
        this.levelText.setOrigin(0.5);
        
        // Flavor text
        this.flavorText = this.add.text(width/2, 75, level.flavorText, {
            font: 'italic 16px monospace',
            fill: '#aaaaff'
        });
        this.flavorText.setOrigin(0.5);
        
        // Create game areas
        this.createGameAreas();
        
        // Create mana bar
        this.createManaBar();
        
        // Create spellbook UI
        this.createSpellbook();
        
        // Create glyphs
        this.createGlyphs();
        
        // Setup keyboard controls
        this.setupControls();
        
        // Create spell effects manager
        this.spellEffects = new SpellEffects(this);
    }

    createGameAreas() {
        const { width, height } = this.cameras.main;
        
        // Current pattern area
        this.add.text(width/4, 140, 'CURRENT', {
            font: 'bold 20px monospace',
            fill: '#ffcc00'
        }).setOrigin(0.5);
        
        this.currentArea = this.add.rectangle(width/4, 250, 300, 200, 0x1a1a2e, 0.8);
        this.currentArea.setStrokeStyle(2, 0x8a2be2);
        
        // Target pattern area
        this.add.text(3*width/4, 140, 'TARGET', {
            font: 'bold 20px monospace',
            fill: '#44ff44'
        }).setOrigin(0.5);
        
        this.targetArea = this.add.rectangle(3*width/4, 250, 300, 200, 0x1a1a2e, 0.8);
        this.targetArea.setStrokeStyle(2, 0x44ff44);
        
        // Arrow between areas
        const arrow = this.add.text(width/2, 250, '→', {
            font: 'bold 48px monospace',
            fill: '#ffffff'
        }).setOrigin(0.5);
        
        // Pulse animation for arrow
        this.tweens.add({
            targets: arrow,
            scaleX: 1.2,
            scaleY: 1.2,
            alpha: 0.7,
            duration: 1000,
            ease: 'Sine.inOut',
            yoyo: true,
            repeat: -1
        });
    }

    createManaBar() {
        const { width } = this.cameras.main;
        
        this.add.text(width/2, 380, 'MANA', {
            font: 'bold 18px monospace',
            fill: '#44ccff'
        }).setOrigin(0.5);
        
        // Mana bar background
        this.manaBarBg = this.add.rectangle(width/2, 410, 400, 30, 0x1a1a2e);
        this.manaBarBg.setStrokeStyle(2, 0x44ccff);
        
        // Mana bar fill
        this.manaBarFill = this.add.rectangle(
            width/2,
            410,
            400,
            26,
            0x44ccff
        );
        this.manaBarFill.setOrigin(0.5, 0.5);
        
        // Mana text
        this.manaText = this.add.text(width/2, 410, '', {
            font: 'bold 16px monospace',
            fill: '#ffffff'
        }).setOrigin(0.5);
        
        this.updateManaBar();
    }

    createSpellbook() {
        const { width, height } = this.cameras.main;
        const startY = 480;
        
        this.add.text(width/2, startY, '~ SPELLBOOK ~', {
            font: 'bold 22px monospace',
            fill: '#ff88ff'
        }).setOrigin(0.5);
        
        // Get spells from OperationLoader
        const level = this.levelManager.getCurrentLevel();
        const allOperations = this.operationLoader.getAllOperations();
        
        // Filter to only show unlocked operations for this level
        const spells = allOperations.filter(op => 
            level.unlockedOperations.includes(op.id)
        ).slice(0, 8); // Show max 8 spells (2 rows)
        
        this.spellButtons = [];
        
        spells.forEach((operation, index) => {
            const x = width/2 + ((index % 4) - 1.5) * 165;  // Increased spacing for wider boxes
            const y = startY + 55 + Math.floor(index / 4) * 75;  // Added more padding from title
            
            // Spell button background - wider to fit titles
            const bg = this.add.rectangle(x, y, 155, 68, 0x2a2a3e, 0.9);
            bg.setStrokeStyle(2, 0x8a2be2);
            
            bg.setInteractive();
            bg.on('pointerover', () => {
                bg.setFillStyle(0x3a3a4e);
                this.showSpellTooltip(x, y - 45, operation);
            });
            bg.on('pointerout', () => {
                bg.setFillStyle(0x2a2a3e);
                this.hideSpellTooltip();
            });
            bg.on('pointerdown', () => {
                this.castSpell(operation.id, operation.cost);
            });
            
            // Hotkey in top left corner
            const keyText = this.add.text(x - 70, y - 27, `[${operation.key.toUpperCase()}]`, {
                font: 'bold 10px monospace',
                fill: '#ffcc00'
            });
            keyText.setOrigin(0, 0.5);
            
            // MP cost in top right
            const costText = this.add.text(x + 70, y - 27, `${operation.cost} MP`, {
                font: 'bold 10px monospace',
                fill: '#44ccff'
            });
            costText.setOrigin(1, 0.5);
            
            // Large central glyph - bigger and less glow
            const symbolText = this.add.text(x, y - 3, operation.symbol, {
                font: 'bold 38px monospace',  // Increased from 32px
                fill: '#ff88ff'
            }).setOrigin(0.5);
            symbolText.setShadow(0, 0, '#ff88ff', 2, true, true);  // Reduced glow from 4 to 2
            
            // Magical name at bottom (smaller) - with more room now
            const nameText = this.add.text(x, y + 24, operation.name, {
                font: '10px monospace',  // Slightly smaller to ensure it fits
                fill: '#ffffff'
            }).setOrigin(0.5);
            
            this.spellButtons.push({ bg, operation });
        });
        
        // Game controls info
        this.add.text(width/2, height - 60, '[U] Undo  [Ctrl+R] Reset  [H] Hint  [Q] Menu', {
            font: '14px monospace',
            fill: '#888888'
        }).setOrigin(0.5);
    }

    createGlyphs() {
        const { width } = this.cameras.main;
        
        // Clear existing sprites
        this.glyphSprites.forEach(sprite => sprite.destroy());
        this.targetGlyphSprites.forEach(sprite => sprite.destroy());
        this.glyphSprites = [];
        this.targetGlyphSprites = [];
        
        // Create current pattern orbs
        this.updateGlyphDisplay(this.gameEngine.currentArray, width/4, 250, this.glyphSprites, true);
        
        // Create target pattern orbs
        this.updateGlyphDisplay(this.gameEngine.targetArray, 3*width/4, 250, this.targetGlyphSprites, false);
    }

    updateGlyphDisplay(pattern, centerX, centerY, spriteArray, interactive = false) {
        const flat = this.flattenForDisplay(pattern);
        const isMatrix = Array.isArray(pattern[0]);
        
        let positions = [];
        
        if (isMatrix) {
            // 2D pattern layout
            const rows = pattern.length;
            const cols = pattern[0].length;
            const spacing = 60;
            
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    const x = centerX + (col - (cols-1)/2) * spacing;
                    const y = centerY + (row - (rows-1)/2) * spacing;
                    positions.push({ x, y });
                }
            }
        } else {
            // 1D pattern layout
            const count = flat.length;
            const spacing = 60;
            
            if (count <= 4) {
                // Horizontal line
                for (let i = 0; i < count; i++) {
                    const x = centerX + (i - (count-1)/2) * spacing;
                    positions.push({ x, y: centerY });
                }
            } else {
                // Grid layout for larger patterns
                const cols = 3;
                const rows = Math.ceil(count / cols);
                
                for (let i = 0; i < count; i++) {
                    const row = Math.floor(i / cols);
                    const col = i % cols;
                    const x = centerX + (col - (cols-1)/2) * spacing;
                    const y = centerY + (row - (rows-1)/2) * spacing;
                    positions.push({ x, y });
                }
            }
        }
        
        // Create glyph sprites
        flat.forEach((glyph, index) => {
            const pos = positions[index];
            const glyphSprite = new GlyphSprite(this, pos.x, pos.y, glyph);
            
            if (interactive) {
                glyphSprite.setInteractive();
            }
            
            spriteArray.push(glyphSprite);
        });
    }

    flattenForDisplay(arr) {
        if (!Array.isArray(arr)) return [arr];
        return arr.reduce((acc, val) => {
            return acc.concat(Array.isArray(val) ? this.flattenForDisplay(val) : val);
        }, []);
    }

    setupControls() {
        // Dynamic spell hotkeys based on OperationLoader
        const allOperations = this.operationLoader.getAllOperations();
        
        allOperations.forEach(operation => {
            const keyCode = operation.key.toUpperCase();
            const phaserKey = keyCode.match(/^\d$/) ? `keydown-${['ZERO','ONE','TWO','THREE','FOUR','FIVE','SIX','SEVEN','EIGHT','NINE'][keyCode]}` : `keydown-${keyCode}`;
            
            this.input.keyboard.on(phaserKey, () => {
                const level = this.levelManager.getCurrentLevel();
                if (level.unlockedOperations.includes(operation.id)) {
                    this.castSpell(operation.id, operation.cost);
                }
            });
        });
        
        // Game controls
        this.input.keyboard.on('keydown-U', () => this.undoMove());
        this.input.keyboard.on('keydown-H', () => this.showHint());
        this.input.keyboard.on('keydown-Q', () => this.returnToMenu());
        
        // Reset with Ctrl+R
        this.input.keyboard.on('keydown', (event) => {
            if (event.ctrlKey && event.key === 'r') {
                event.preventDefault();
                if (!this.isAnimating) {
                    this.resetLevel();
                }
            }
        });
    }

    castSpell(operation, cost) {
        if (this.isAnimating) return;
        
        const level = this.levelManager.getCurrentLevel();
        if (!level || !level.unlockedOperations) {
            console.error('No level loaded or unlockedOperations missing');
            return;
        }
        
        if (!level.unlockedOperations.includes(operation)) {
            this.showMessage('Spell not yet unlocked!', '#ff4444');
            return;
        }
        
        const result = this.gameEngine.applyOperation(operation, cost);
        
        if (!result.success) {
            this.showMessage(result.message, '#ff4444');
            return;
        }
        
        // Animate the transformation
        this.isAnimating = true;
        this.spellEffects.playSpellEffect(operation, this.glyphSprites, () => {
            // Update display after animation
            this.glyphSprites.forEach(sprite => sprite.destroy());
            this.glyphSprites = [];
            this.updateGlyphDisplay(this.gameEngine.currentArray, this.cameras.main.width/4, 250, this.glyphSprites, true);
            
            this.updateManaBar();
            this.isAnimating = false;
            
            // Check for win
            if (result.won) {
                this.handleWin();
            }
        });
    }

    undoMove() {
        if (this.isAnimating) return;
        
        const result = this.gameEngine.undo();
        if (result.success) {
            this.glyphSprites.forEach(sprite => sprite.destroy());
            this.glyphSprites = [];
            this.updateGlyphDisplay(this.gameEngine.currentArray, this.cameras.main.width/4, 250, this.glyphSprites, true);
            this.updateManaBar();
        } else {
            this.showMessage('No moves to undo!', '#ff8844');
        }
    }

    resetLevel() {
        // Stop any ongoing animations
        this.isAnimating = false;
        
        // Stop all tweens on glyph sprites before destroying them
        this.glyphSprites.forEach(sprite => {
            this.tweens.killTweensOf(sprite);
        });
        
        // Reset game engine
        this.gameEngine.reset();
        
        // Recreate glyphs (this will destroy old ones)
        this.createGlyphs();
        
        // Update UI
        this.updateManaBar();
        this.showMessage('Level reset!', '#ffcc00');
    }

    showHint() {
        if (this.isAnimating) return;
        
        const level = this.levelManager.getCurrentLevel();
        if (level.hint) {
            this.showMessage(level.hint, '#44ff44', 3000);
        }
    }

    showMessage(text, color = '#ffffff', duration = 2000) {
        const { width } = this.cameras.main;
        // Position above the arrow (which is at y: 250)
        const message = this.add.text(width/2, 200, text, {
            font: 'bold 20px monospace',
            fill: color
        }).setOrigin(0.5);
        
        this.tweens.add({
            targets: message,
            alpha: 0,
            y: 180,
            duration: duration,
            ease: 'Power2',
            onComplete: () => message.destroy()
        });
    }

    updateManaBar() {
        const manaPercent = this.gameEngine.mana / this.gameEngine.maxMana;
        this.manaBarFill.displayWidth = 400 * manaPercent;
        this.manaText.setText(`${this.gameEngine.mana} / ${this.gameEngine.maxMana}`);
        
        // Change color based on mana level
        let color = 0x44ccff;
        if (manaPercent < 0.3) color = 0xff4444;
        else if (manaPercent < 0.6) color = 0xffcc00;
        
        this.manaBarFill.setFillStyle(color);
    }

    handleWin() {
        // Show messages higher up so they won't be covered by victory panel
        this.showMessage('✨ LEVEL COMPLETE! ✨', '#ffcc00', 3000);
        
        // Calculate and show score slightly below the level complete message
        const score = this.gameEngine.calculateScore();
        this.time.delayedCall(500, () => {
            const { width } = this.cameras.main;
            const scoreText = this.add.text(width/2, 220, `Score: ${score}`, {
                font: 'bold 18px monospace',
                fill: '#44ff44'
            }).setOrigin(0.5);
            
            this.tweens.add({
                targets: scoreText,
                alpha: 0,
                y: 200,
                duration: 3000,
                ease: 'Power2',
                onComplete: () => scoreText.destroy()
            });
        });
        
        // Unlock next level
        this.levelManager.unlockNextLevel();
        
        // Show continue prompt
        this.time.delayedCall(1500, () => {
            const { width, height } = this.cameras.main;
            
            const winPanel = this.add.rectangle(width/2, height/2, 400, 200, 0x2a2a3e, 0.95);
            winPanel.setStrokeStyle(3, 0xffcc00);
            
            const winText = this.add.text(width/2, height/2 - 40, 'Victory!', {
                font: 'bold 36px monospace',
                fill: '#ffcc00'
            }).setOrigin(0.5);
            
            const continueText = this.add.text(width/2, height/2 + 10, 'Press any key to continue', {
                font: '18px monospace',
                fill: '#ffffff'
            }).setOrigin(0.5);
            
            const clickText = this.add.text(width/2, height/2 + 35, '(or click anywhere)', {
                font: '14px monospace',
                fill: '#aaaaff'
            }).setOrigin(0.5);
            
            const menuText = this.add.text(width/2, height/2 + 60, '[Q] Return to Menu', {
                font: '14px monospace',
                fill: '#888888'
            }).setOrigin(0.5);
            
            // Animate panel
            this.tweens.add({
                targets: [winPanel, winText, continueText, clickText, menuText],
                scaleX: 1,
                scaleY: 1,
                duration: 300,
                ease: 'Back.easeOut',
                from: { scaleX: 0, scaleY: 0 }
            });
            
            // Flag to prevent multiple inputs
            let levelAdvancing = false;
            
            // Function to go to next level
            const goToNextLevel = () => {
                if (levelAdvancing) return;
                levelAdvancing = true;
                
                if (this.levelManager.nextLevel()) {
                    this.scene.restart();
                } else {
                    this.showMessage('All levels complete!', '#ffcc00');
                    this.time.delayedCall(2000, () => this.returnToMenu());
                }
            };
            
            // Make the whole screen clickable
            winPanel.setInteractive();
            winPanel.on('pointerdown', goToNextLevel);
            
            // Also make background clickable
            this.input.on('pointerdown', goToNextLevel);
            
            // Handle keyboard input
            const handleKey = (event) => {
                // Q returns to menu
                if (event.key === 'q' || event.key === 'Q') {
                    this.input.keyboard.off('keydown', handleKey);
                    this.returnToMenu();
                } else {
                    // Any other key goes to next level
                    this.input.keyboard.off('keydown', handleKey);
                    goToNextLevel();
                }
            };
            
            this.input.keyboard.on('keydown', handleKey);
        });
    }

    returnToMenu() {
        this.scene.start('MainMenu');
    }

    showSpellTooltip(x, y, operation) {
        if (this.tooltip) {
            this.tooltip.destroy();
        }

        this.tooltip = this.add.container(x, y);
        
        // Background
        const bg = this.add.rectangle(0, 0, 250, 60, 0x2a2a3e, 0.95);
        bg.setStrokeStyle(2, 0x8a2be2);
        this.tooltip.add(bg);
        
        // Description
        const desc = this.add.text(0, 0, operation.description, {
            font: '11px monospace',
            fill: '#ffffff',
            align: 'center',
            wordWrap: { width: 230 }
        }).setOrigin(0.5);
        this.tooltip.add(desc);
    }

    hideSpellTooltip() {
        if (this.tooltip) {
            this.tooltip.destroy();
            this.tooltip = null;
        }
    }
}