class SpellbookScene extends Phaser.Scene {
    constructor() {
        super({ key: 'SpellbookScene' });
        
        // Spell categories - organized by type and complexity
        this.categories = [
            { id: 'basic', name: 'Basic Spells', color: '#4169e1', icon: '✦' },
            { id: 'transform', name: 'Transformations', color: '#32cd32', icon: '⟲' },
            { id: 'selection', name: 'Selection Magic', color: '#ffd700', icon: '◈' },
            { id: 'weaving', name: 'Weaving Spells', color: '#ff6347', icon: '⊞' },
            { id: 'pattern', name: 'Pattern Magic', color: '#8a2be2', icon: '✧' },
            { id: 'advanced', name: 'Master Spells', color: '#ff1493', icon: '★' }
        ];
        
        this.currentCategory = 0;
        this.selectedSpell = null;
        this.spellCards = [];
        this.categoryButtons = [];
        
        // All available spells (will be loaded from OperationLoader)
        this.allSpells = [];
        
        // Glyph colors from GlyphSprite
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
            '✹': '#ff44aa'
        };
    }

    create() {
        const { width, height } = this.cameras.main;
        
        // Background
        this.add.rectangle(width/2, height/2, width, height, 0x0a0e27);
        
        // Title with magical effect
        const title = this.add.text(width/2, 40, 'THE ARCANE SPELLBOOK', {
            font: 'bold 36px monospace',
            fill: '#ffffff',
            stroke: '#8a2be2',
            strokeThickness: 4
        });
        title.setOrigin(0.5);
        title.setShadow(0, 0, '#8a2be2', 8, true, true);
        
        // Magical particle effect behind title
        this.createMagicalParticles();
        
        // Load spell data
        this.loadSpellData();
        
        // Create category tabs
        this.createCategoryTabs();
        
        // Create spell grid
        this.createSpellGrid();
        
        // Create detail panel
        this.createDetailPanel();
        
        // Create navigation
        this.createNavigation();
        
        // Setup keyboard controls
        this.setupKeyboardControls();
        
        // Initial category selection
        this.selectCategory(0);
    }

    loadSpellData() {
        // Get spells from the OperationLoader
        const operationLoader = this.registry.get('operationLoader');
        
        // Define all spells with their categories
        this.allSpells = [
            // Basic Spells
            {
                id: 'reverse',
                name: 'Spell of Reflection',
                category: 'basic',
                key: 'R',
                cost: 1,
                symbol: '◆',  // Using game glyph
                color: '#4169e1',
                description: 'Reverses the order of all orbs',
                example: '[◆◇◈◊] → [◊◈◇◆]',
                unlockLevel: 1,
                unlocked: true
            },
            {
                id: 'transpose',
                name: 'Matrix Transmutation',
                category: 'transform',
                key: 'T',
                cost: 1,
                symbol: '◇',  // Using game glyph
                color: '#32cd32',
                description: 'Flips pattern along diagonal',
                example: '[[◆◇],[◈◊]] → [[◆◈],[◇◊]]',
                unlockLevel: 3,
                unlocked: true
            },
            {
                id: 'rotateLeft',
                name: 'Widdershins Rotation',
                category: 'transform',
                key: 'A',
                cost: 2,
                symbol: '◈',  // Using game glyph
                color: '#32cd32',
                description: 'Rotates orbs counter-clockwise',
                example: '[◆◇◈◊] → [◇◈◊◆]',
                unlockLevel: 2,
                unlocked: true
            },
            {
                id: 'rotateRight',
                name: 'Sunwise Rotation',
                category: 'transform',
                key: 'D',
                cost: 2,
                symbol: '◊',  // Using game glyph
                color: '#32cd32',
                description: 'Rotates orbs clockwise',
                example: '[◆◇◈◊] → [◊◆◇◈]',
                unlockLevel: 2,
                unlocked: true
            },
            {
                id: 'reverseRows',
                name: 'Row Reflection',
                category: 'transform',
                key: 'E',
                cost: 2,
                symbol: '★',  // Using game glyph
                color: '#32cd32',
                description: 'Reverses each row individually',
                example: '[[◆◇],[◈◊]] → [[◇◆],[◊◈]]',
                unlockLevel: 4,
                unlocked: false
            },
            {
                id: 'flatten',
                name: 'Planar Collapse',
                category: 'transform',
                key: 'F',
                cost: 3,
                symbol: '☆',  // Using game glyph
                color: '#32cd32',
                description: 'Collapses 2D pattern to single row',
                example: '[[◆◇],[◈◊]] → [◆◇◈◊]',
                unlockLevel: 5,
                unlocked: false
            },
            {
                id: 'reshape2x3',
                name: 'Dual Trinity Form',
                category: 'weaving',
                key: '2',
                cost: 3,
                symbol: '✦',  // Using game glyph
                color: '#ff6347',
                description: 'Reshapes into 2 rows, 3 columns',
                example: '[◆◇◈◊★☆] → [[◆◇◈],[◊★☆]]',
                unlockLevel: 6,
                unlocked: false
            },
            {
                id: 'reshape3x2',
                name: 'Triple Duality Form',
                category: 'weaving',
                key: '3',
                cost: 3,
                symbol: '✧',  // Using game glyph
                color: '#ff6347',
                description: 'Reshapes into 3 rows, 2 columns',
                example: '[◆◇◈◊★☆] → [[◆◇],[◈◊],[★☆]]',
                unlockLevel: 6,
                unlocked: false
            },
            {
                id: 'first',
                name: 'Prima Extraction',
                category: 'selection',
                key: 'H',
                cost: 1,
                symbol: '●',  // Using game glyph
                color: '#ffd700',
                description: 'Extracts the first orb',
                example: '[◆◇◈◊] → [◆]',
                unlockLevel: 8,
                unlocked: false
            },
            {
                id: 'last',
                name: 'Ultima Selection',
                category: 'selection',
                key: 'L',
                cost: 1,
                symbol: '○',  // Using game glyph
                color: '#ffd700',
                description: 'Extracts the last orb',
                example: '[◆◇◈◊] → [◊]',
                unlockLevel: 8,
                unlocked: false
            },
            {
                id: 'tail',
                name: 'Essence Shedding',
                category: 'selection',
                key: 'J',
                cost: 1,
                symbol: '▲',  // Using game glyph
                color: '#ffd700',
                description: 'Removes the first orb',
                example: '[◆◇◈◊] → [◇◈◊]',
                unlockLevel: 9,
                unlocked: false
            },
            {
                id: 'init',
                name: 'Final Release',
                category: 'selection',
                key: 'K',
                cost: 1,
                symbol: '▼',  // Using game glyph
                color: '#ffd700',
                description: 'Removes the last orb',
                example: '[◆◇◈◊] → [◆◇◈]',
                unlockLevel: 9,
                unlocked: false
            },
            {
                id: 'mirror',
                name: 'Twin Reflection',
                category: 'pattern',
                key: 'M',
                cost: 2,
                symbol: '■',  // Using game glyph
                color: '#8a2be2',
                description: 'Creates mirror pattern',
                example: '[◆◇◈] → [◆◇◈◈◇◆]',
                unlockLevel: 10,
                unlocked: false
            },
            {
                id: 'zip',
                name: 'Thread Binding',
                category: 'weaving',
                key: 'Z',
                cost: 3,
                symbol: '□',  // Using game glyph
                color: '#ff6347',
                description: 'Interleaves two patterns',
                example: '[[◆◇],[◈◊]] → [◆◈◇◊]',
                unlockLevel: 12,
                unlocked: false
            },
            {
                id: 'spiral',
                name: 'Vortex Unwinding',
                category: 'pattern',
                key: 'S',
                cost: 4,
                symbol: '✸',  // Using game glyph
                color: '#8a2be2',
                description: 'Unwinds pattern in spiral',
                example: '[[◆◇◈],[◊★☆],[✦✧●]] → [◆◇◈☆●✧✦◊★]',
                unlockLevel: 15,
                unlocked: false
            },
            {
                id: 'halve',
                name: 'The Bisection',
                category: 'selection',
                key: 'B',
                cost: 2,
                symbol: '►',  // Using game glyph
                color: '#ffd700',
                description: 'Splits pattern in half',
                example: '[◆◇◈◊] → [[◆◇],[◈◊]]',
                unlockLevel: 11,
                unlocked: false
            }
        ];
        
        // Update unlock status based on progress
        this.updateSpellUnlocks();
    }

    updateSpellUnlocks() {
        const progress = this.getProgress();
        const highestLevel = progress.highestUnlocked || 1;
        
        this.allSpells.forEach(spell => {
            spell.unlocked = spell.unlockLevel <= highestLevel;
        });
    }

    getProgress() {
        const savedProgress = localStorage.getItem('glowmancer_progress');
        if (savedProgress) {
            return JSON.parse(savedProgress);
        }
        return { highestUnlocked: 1 };
    }

    createCategoryTabs() {
        const { width } = this.cameras.main;
        const startY = 120;  // Moved down for more space
        const tabWidth = 180;  // Made wider to fit text
        const tabHeight = 45;   // Made taller
        const spacing = 10;
        
        // Clear existing container
        if (this.categoryContainer) {
            this.categoryContainer.destroy();
        }
        this.categoryContainer = this.add.container(0, 0);
        
        // Category label - with more padding
        const categoryLabel = this.add.text(width/2, startY - 45, 'SPELL CATEGORIES', {
            font: 'bold 18px monospace',
            fill: '#ccccff'
        });
        categoryLabel.setOrigin(0.5);
        this.categoryContainer.add(categoryLabel);
        
        // Create tabs in two rows
        this.categories.forEach((category, index) => {
            const row = Math.floor(index / 3);
            const col = index % 3;
            
            const x = width/2 + (col - 1) * (tabWidth + spacing);
            const y = startY + row * (tabHeight + spacing);
            
            // Tab background
            const isSelected = index === this.currentCategory;
            const tabBg = this.add.rectangle(
                x, y, tabWidth, tabHeight,
                Phaser.Display.Color.HexStringToColor(category.color).color
            );
            tabBg.setStrokeStyle(2, isSelected ? 0xffcc00 : 0xffffff);
            tabBg.setAlpha(isSelected ? 1 : 0.7);
            tabBg.setInteractive();
            
            // Category icon
            const tabText = this.add.text(x - 65, y, category.icon, {
                font: '20px monospace',
                fill: '#ffffff'
            }).setOrigin(0.5);
            
            // Category name - centered in remaining space
            const nameText = this.add.text(x - 10, y, category.name, {
                font: '11px monospace',
                fill: '#ffffff'
            }).setOrigin(0.5);
            
            // Spell count - on right side
            const spellCount = this.getSpellCountForCategory(category.id);
            const countText = this.add.text(x + 65, y, `(${spellCount.unlocked}/${spellCount.total})`, {
                font: '10px monospace',
                fill: '#ffcc00'
            }).setOrigin(0.5);
            
            this.categoryContainer.add([tabBg, tabText, nameText, countText]);
            
            // Interaction
            tabBg.on('pointerover', () => {
                if (index !== this.currentCategory) {
                    tabBg.setAlpha(0.85);
                    tabBg.setScale(1.05);
                }
            });
            
            tabBg.on('pointerout', () => {
                if (index !== this.currentCategory) {
                    tabBg.setAlpha(0.7);
                    tabBg.setScale(1);
                }
            });
            
            tabBg.on('pointerdown', () => {
                this.selectCategory(index);
            });
            
            this.categoryButtons.push({ bg: tabBg, category, index });
        });
    }

    getSpellCountForCategory(categoryId) {
        const categorySpells = this.allSpells.filter(spell => spell.category === categoryId);
        const unlockedSpells = categorySpells.filter(spell => spell.unlocked);
        return {
            total: categorySpells.length,
            unlocked: unlockedSpells.length
        };
    }

    selectCategory(index) {
        this.currentCategory = index;
        this.selectedSpell = null;
        
        // Recreate tabs with new selection
        this.createCategoryTabs();
        
        // Update spell grid
        this.createSpellGrid();
        
        // Clear detail panel
        this.updateDetailPanel(null);
    }

    createSpellGrid() {
        const { width, height } = this.cameras.main;
        const startY = 220;  // Moved down to give more space
        
        // Clear existing spell container
        if (this.spellContainer) {
            this.spellContainer.destroy();
        }
        this.spellContainer = this.add.container(0, 0);
        
        // Get spells for current category
        const category = this.categories[this.currentCategory];
        const categorySpells = this.allSpells.filter(spell => spell.category === category.id);
        
        // Category title
        const categoryTitle = this.add.text(width/2, startY - 15, 
            `${category.icon} ${category.name.toUpperCase()} ${category.icon}`, {
            font: 'bold 20px monospace',
            fill: category.color
        });
        categoryTitle.setOrigin(0.5);
        this.spellContainer.add(categoryTitle);
        
        // Spell cards grid (4 columns)
        const cardWidth = 180;
        const cardHeight = 100;
        const spacing = 15;
        const cardsPerRow = 4;
        const gridStartX = width/2 - (cardsPerRow * cardWidth + (cardsPerRow - 1) * spacing) / 2;
        
        categorySpells.forEach((spell, index) => {
            const row = Math.floor(index / cardsPerRow);
            const col = index % cardsPerRow;
            
            const x = gridStartX + col * (cardWidth + spacing) + cardWidth/2;
            const y = startY + 50 + row * (cardHeight + spacing);  // More space below title
            
            this.createSpellCard(x, y, spell, cardWidth, cardHeight);
        });
        
        // If no spells in category
        if (categorySpells.length === 0) {
            const noSpellsText = this.add.text(width/2, startY + 100, 
                'No spells discovered in this category yet', {
                font: '18px monospace',
                fill: '#666666'
            });
            noSpellsText.setOrigin(0.5);
            this.spellContainer.add(noSpellsText);
        }
    }

    createSpellCard(x, y, spell, width, height) {
        // Card background
        const cardColor = spell.unlocked ? 0x2a2a3e : 0x1a1a1a;
        const card = this.add.rectangle(x, y, width, height, cardColor);
        card.setStrokeStyle(2, spell.unlocked ? 
            Phaser.Display.Color.HexStringToColor(spell.color).color : 0x444444);
        card.setAlpha(spell.unlocked ? 1 : 0.6);
        
        if (spell.unlocked) {
            card.setInteractive();
        }
        
        // Key binding - top left corner
        const keyBg = this.add.rectangle(x - width/2 + 20, y - height/2 + 20, 25, 25, 0x4169e1);
        keyBg.setStrokeStyle(1, 0xffffff);
        keyBg.setAlpha(spell.unlocked ? 1 : 0.4);
        
        const keyText = this.add.text(x - width/2 + 20, y - height/2 + 20, spell.key, {
            font: 'bold 12px monospace',
            fill: '#ffffff'
        });
        keyText.setOrigin(0.5);
        
        // Spell symbol (large, centered)
        const symbolText = this.add.text(x, y - 5, spell.symbol, {
            font: 'bold 32px monospace',
            fill: spell.unlocked ? spell.color : '#444444'
        });
        symbolText.setOrigin(0.5);
        
        // Spell name - at bottom
        const nameText = this.add.text(x, y + height/2 - 15, spell.name, {
            font: 'bold 12px monospace',
            fill: spell.unlocked ? '#ffffff' : '#666666'
        });
        nameText.setOrigin(0.5);
        
        // Mana cost - top right corner
        const manaText = this.add.text(x + width/2 - 20, y - height/2 + 20, `${spell.cost} MP`, {
            font: '12px monospace',
            fill: spell.unlocked ? '#44ccff' : '#444444'
        });
        manaText.setOrigin(0.5);
        
        // Lock icon if locked
        if (!spell.unlocked) {
            const lockIcon = this.add.text(x, y + 15, '🔒', {
                font: '20px monospace'
            });
            lockIcon.setOrigin(0.5);
            
            this.spellContainer.add(lockIcon);
        }
        
        this.spellContainer.add([card, keyBg, keyText, symbolText, nameText, manaText]);
        
        // Interaction
        if (spell.unlocked) {
            card.on('pointerover', () => {
                card.setScale(1.05);
                this.selectedSpell = spell;
                this.updateDetailPanel(spell);
                
                // Glow effect
                this.tweens.add({
                    targets: card,
                    alpha: 0.8,
                    duration: 200,
                    yoyo: true
                });
            });
            
            card.on('pointerout', () => {
                card.setScale(1);
                card.setAlpha(1);
                this.selectedSpell = null;
                this.updateDetailPanel(null);
            });
        }
    }

    createDetailPanel() {
        const { width, height } = this.cameras.main;
        const panelY = height - 120;
        
        // Detail panel background
        this.detailPanel = this.add.rectangle(width/2, panelY, width - 100, 100, 0x1a1a2e);
        this.detailPanel.setStrokeStyle(2, 0x8a2be2);
        this.detailPanel.setAlpha(0.9);
        
        // Title
        this.detailTitle = this.add.text(width/2 - 350, panelY - 30, 'Hover over a spell to see details', {
            font: 'bold 16px monospace',
            fill: '#ffffff'
        });
        this.detailTitle.setOrigin(0, 0.5);
        
        // Description
        this.detailDesc = this.add.text(width/2 - 350, panelY, '', {
            font: '13px monospace',
            fill: '#ccccff',
            wordWrap: { width: 400 }
        });
        this.detailDesc.setOrigin(0, 0.5);
        
        // Example will be created dynamically with colored glyphs
        this.exampleContainer = null;
        
        // Stats
        this.detailStats = this.add.text(width/2 + 50, panelY + 20, '', {
            font: '12px monospace',
            fill: '#44ccff'
        });
        this.detailStats.setOrigin(0, 0.5);
    }

    updateDetailPanel(spell) {
        if (!spell) {
            this.detailTitle.setText('Hover over a spell to see details');
            this.detailDesc.setText('');
            // Clear example glyphs
            if (this.exampleContainer) {
                this.exampleContainer.destroy();
                this.exampleContainer = null;
            }
            this.detailStats.setText('');
            return;
        }
        
        this.detailTitle.setText(`${spell.symbol} ${spell.name}`);
        this.detailDesc.setText(spell.description);
        
        // Create colored example glyphs
        this.createColoredExample(spell.example);
        
        this.detailStats.setText(`Key: [${spell.key}]  |  Cost: ${spell.cost} MP  |  Unlocked at Level ${spell.unlockLevel}`);
    }
    
    createColoredExample(exampleString) {
        const { width, height } = this.cameras.main;
        const panelY = height - 120;
        
        // Clear previous example
        if (this.exampleContainer) {
            this.exampleContainer.destroy();
        }
        this.exampleContainer = this.add.container(width/2 + 50, panelY - 10);
        
        // Parse the example string and create colored text for each glyph
        const label = this.add.text(0, 0, 'Example: ', {
            font: '14px monospace',
            fill: '#ffcc00'
        });
        this.exampleContainer.add(label);
        
        let xOffset = label.width + 5;
        
        // Process each character in the example
        for (let i = 0; i < exampleString.length; i++) {
            const char = exampleString[i];
            let color = '#ffcc00'; // Default color for arrows and brackets
            
            // Check if it's a glyph that needs coloring
            if (this.glyphColors[char]) {
                color = this.glyphColors[char];
            }
            
            const charText = this.add.text(xOffset, 0, char, {
                font: '14px monospace',
                fill: color
            });
            
            this.exampleContainer.add(charText);
            xOffset += charText.width;
        }
    }

    createNavigation() {
        const { width, height } = this.cameras.main;
        
        // Back button
        const backButton = this.add.text(50, height - 30, '← BACK', {
            font: '20px monospace',
            fill: '#ffffff'
        });
        backButton.setInteractive();
        
        backButton.on('pointerover', () => {
            backButton.setScale(1.1);
            backButton.setFill('#ffcc00');
        });
        
        backButton.on('pointerout', () => {
            backButton.setScale(1);
            backButton.setFill('#ffffff');
        });
        
        backButton.on('pointerdown', () => {
            this.scene.start('MainMenu');
        });
        
        // Stats
        const unlockedCount = this.allSpells.filter(s => s.unlocked).length;
        const totalCount = this.allSpells.length;
        
        const statsText = this.add.text(width - 50, height - 30, 
            `${unlockedCount}/${totalCount} Spells Unlocked`, {
            font: '16px monospace',
            fill: '#ffd700'
        });
        statsText.setOrigin(1, 0);
    }

    setupKeyboardControls() {
        // ESC to go back
        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.start('MainMenu');
        });
        
        // Number keys for category selection
        for (let i = 1; i <= this.categories.length; i++) {
            this.input.keyboard.on(`keydown-${i}`, () => {
                this.selectCategory(i - 1);
            });
        }
    }

    createMagicalParticles() {
        // Create floating magical particles around the title
        const { width } = this.cameras.main;
        
        for (let i = 0; i < 10; i++) {
            const particle = this.add.text(
                width/2 + Phaser.Math.Between(-200, 200),
                Phaser.Math.Between(20, 60),
                '✧', {
                font: '12px monospace',
                fill: '#8a2be2'
            });
            particle.setAlpha(0.3);
            
            // Floating animation
            this.tweens.add({
                targets: particle,
                y: particle.y - 10,
                alpha: 0.7,
                duration: Phaser.Math.Between(2000, 4000),
                yoyo: true,
                repeat: -1,
                ease: 'Sine.inOut',
                delay: Phaser.Math.Between(0, 2000)
            });
            
            // Slow horizontal drift
            this.tweens.add({
                targets: particle,
                x: particle.x + Phaser.Math.Between(-20, 20),
                duration: Phaser.Math.Between(4000, 6000),
                yoyo: true,
                repeat: -1,
                ease: 'Sine.inOut',
                delay: Phaser.Math.Between(0, 2000)
            });
        }
    }
}