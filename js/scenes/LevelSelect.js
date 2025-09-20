class LevelSelect extends Phaser.Scene {
    constructor() {
        super({ key: 'LevelSelect' });
        
        // Chapter definitions - each chapter has 10 levels
        this.chapters = [
            { id: 1, name: 'The Awakening', levels: [1, 10], color: '#8a2be2', unlocked: true },
            { id: 2, name: 'Glow Foundations', levels: [11, 20], color: '#4169e1', unlocked: true },
            { id: 3, name: 'Crystal Caverns', levels: [21, 30], color: '#00ced1', unlocked: false },
            { id: 4, name: 'Ember Plains', levels: [31, 40], color: '#ff6347', unlocked: false },
            { id: 5, name: 'Mystic Forest', levels: [41, 50], color: '#32cd32', unlocked: false },
            { id: 6, name: 'Frozen Peaks', levels: [51, 60], color: '#87ceeb', unlocked: false },
            { id: 7, name: 'Shadow Realm', levels: [61, 70], color: '#8b008b', unlocked: false },
            { id: 8, name: 'Astral Temple', levels: [71, 80], color: '#ffd700', unlocked: false },
            { id: 9, name: 'Void Nexus', levels: [81, 90], color: '#4b0082', unlocked: false },
            { id: 10, name: 'Eternal Spire', levels: [91, 100], color: '#ff1493', unlocked: false }
        ];
        
        this.currentChapter = 0;
        this.levelButtons = [];
        this.chapterButtons = [];
        this.selectedLevel = null;
    }

    create() {
        const { width, height } = this.cameras.main;
        
        // Background
        this.add.rectangle(width/2, height/2, width, height, 0x0a0e27);
        
        // Title
        const title = this.add.text(width/2, 40, 'SELECT YOUR CHALLENGE', {
            font: 'bold 36px monospace',
            fill: '#ffffff',
            stroke: '#8a2be2',
            strokeThickness: 4
        });
        title.setOrigin(0.5);
        title.setShadow(0, 0, '#8a2be2', 8, true, true);
        
        // Get progress data
        this.loadProgress();
        
        // Create chapter selector at top
        this.createChapterSelector();
        
        // Create level grid for current chapter
        this.createLevelGrid();
        
        // Create navigation buttons
        this.createNavigationButtons();
        
        // Create info panel at bottom
        this.createInfoPanel();
        
        // Setup keyboard controls
        this.setupKeyboardControls();
        
        // Pulse animation for unlocked but unplayed levels
        this.time.addEvent({
            delay: 1500,
            callback: this.pulseNewLevels,
            callbackScope: this,
            loop: true
        });
    }

    loadProgress() {
        // Load saved progress or use defaults
        const savedProgress = localStorage.getItem('glowmancer_progress');
        if (savedProgress) {
            this.progress = JSON.parse(savedProgress);
        } else {
            // Default progress - first 2 chapters unlocked, level 1 available
            this.progress = {
                highestUnlocked: 1,
                completedLevels: {},
                stars: {},
                totalStars: 0
            };
        }
        
        // Update chapter unlock status based on progress
        this.updateChapterUnlocks();
    }

    updateChapterUnlocks() {
        this.chapters.forEach((chapter, index) => {
            // Unlock chapter if any level in it is unlocked
            const firstLevel = chapter.levels[0];
            if (this.progress.highestUnlocked >= firstLevel || index < 2) {
                chapter.unlocked = true;
            }
        });
    }

    createChapterSelector() {
        const { width } = this.cameras.main;
        const startY = 100;
        const buttonWidth = 150;
        const buttonHeight = 40;
        const spacing = 10;
        const buttonsPerRow = 5;
        
        this.chapterContainer = this.add.container(0, 0);
        
        // Chapter label
        this.add.text(width/2, startY - 25, 'CHAPTERS', {
            font: 'bold 20px monospace',
            fill: '#ccccff'
        }).setOrigin(0.5);
        
        this.chapters.forEach((chapter, index) => {
            const row = Math.floor(index / buttonsPerRow);
            const col = index % buttonsPerRow;
            
            const x = width/2 + (col - 2) * (buttonWidth + spacing);
            const y = startY + row * (buttonHeight + spacing);
            
            // Chapter button background
            const button = this.add.rectangle(
                x, y, buttonWidth, buttonHeight,
                chapter.unlocked ? Phaser.Display.Color.HexStringToColor(chapter.color).color : 0x333333
            );
            button.setStrokeStyle(2, chapter.unlocked ? 0xffffff : 0x666666);
            button.setAlpha(chapter.unlocked ? 1 : 0.5);
            button.setInteractive();
            
            // Chapter text
            const text = this.add.text(x, y - 7, `${chapter.id}. ${chapter.name}`, {
                font: '14px monospace',
                fill: chapter.unlocked ? '#ffffff' : '#666666'
            }).setOrigin(0.5);
            
            // Progress text
            const completed = this.getChapterProgress(chapter);
            const progressText = this.add.text(x, y + 7, `${completed}/10`, {
                font: '12px monospace',
                fill: chapter.unlocked ? '#ffcc00' : '#444444'
            }).setOrigin(0.5);
            
            // Selection indicator
            if (index === this.currentChapter) {
                const selector = this.add.rectangle(x, y, buttonWidth + 8, buttonHeight + 8);
                selector.setStrokeStyle(3, 0xffcc00);
                this.chapterContainer.add(selector);
            }
            
            this.chapterContainer.add([button, text, progressText]);
            
            // Click handler
            if (chapter.unlocked) {
                button.on('pointerover', () => {
                    button.setScale(1.05);
                    this.tweens.add({
                        targets: button,
                        alpha: 0.8,
                        duration: 100
                    });
                });
                
                button.on('pointerout', () => {
                    button.setScale(1);
                    button.setAlpha(1);
                });
                
                button.on('pointerdown', () => {
                    this.selectChapter(index);
                });
            }
            
            this.chapterButtons.push({ button, text, progressText, chapter, index });
        });
    }

    getChapterProgress(chapter) {
        let completed = 0;
        for (let i = chapter.levels[0]; i <= chapter.levels[1]; i++) {
            if (this.progress.completedLevels[i]) {
                completed++;
            }
        }
        return completed;
    }

    selectChapter(index) {
        if (this.chapters[index].unlocked) {
            this.currentChapter = index;
            // this.sound.play('select', { volume: 0.3 }); // TODO: Add sound
            
            // Update visual selection
            this.chapterContainer.removeAll();
            this.createChapterSelector();
            
            // Recreate level grid for new chapter
            this.levelContainer.removeAll();
            this.createLevelGrid();
        }
    }

    createLevelGrid() {
        const { width, height } = this.cameras.main;
        const chapter = this.chapters[this.currentChapter];
        const startY = 220;
        const gridWidth = 600;
        const gridHeight = 380;
        
        this.levelContainer = this.add.container(0, 0);
        
        // Chapter name display
        const chapterTitle = this.add.text(width/2, startY - 20, chapter.name.toUpperCase(), {
            font: 'bold 24px monospace',
            fill: chapter.color
        });
        chapterTitle.setOrigin(0.5);
        this.levelContainer.add(chapterTitle);
        
        // Level buttons grid (5x2 for 10 levels per chapter)
        const buttonsPerRow = 5;
        const buttonSize = 80;
        const spacing = 20;
        
        for (let i = 0; i < 10; i++) {
            const levelNum = chapter.levels[0] + i;
            const row = Math.floor(i / buttonsPerRow);
            const col = i % buttonsPerRow;
            
            const x = width/2 + (col - 2) * (buttonSize + spacing);
            const y = startY + 50 + row * (buttonSize + spacing);
            
            this.createLevelButton(x, y, levelNum, buttonSize);
        }
    }

    createLevelButton(x, y, levelNum, size) {
        const isUnlocked = levelNum <= this.progress.highestUnlocked;
        const isCompleted = this.progress.completedLevels[levelNum];
        const stars = this.progress.stars[levelNum] || 0;
        
        // Button background
        let buttonColor = 0x333333;
        if (isCompleted) {
            buttonColor = 0x32cd32; // Green for completed
        } else if (isUnlocked) {
            buttonColor = 0x4169e1; // Blue for unlocked
        }
        
        const button = this.add.rectangle(x, y, size, size, buttonColor);
        button.setStrokeStyle(2, isUnlocked ? 0xffffff : 0x666666);
        button.setAlpha(isUnlocked ? 1 : 0.6);
        
        // Level number
        const levelText = this.add.text(x, y - 10, levelNum.toString(), {
            font: 'bold 28px monospace',
            fill: isUnlocked ? '#ffffff' : '#666666'
        });
        levelText.setOrigin(0.5);
        
        // Stars display
        if (isCompleted && stars > 0) {
            const starY = y + 20;
            for (let i = 0; i < 3; i++) {
                const starX = x + (i - 1) * 20;
                const star = this.add.text(starX, starY, '★', {
                    font: '16px monospace',
                    fill: i < stars ? '#ffd700' : '#444444'
                });
                star.setOrigin(0.5);
                this.levelContainer.add(star);
            }
        } else if (isUnlocked && !isCompleted) {
            // "NEW" indicator for unlocked but unplayed levels
            const newText = this.add.text(x, y + 20, 'NEW', {
                font: 'bold 12px monospace',
                fill: '#ffcc00'
            });
            newText.setOrigin(0.5);
            newText.setName('new_' + levelNum); // For pulsing animation
            this.levelContainer.add(newText);
        }
        
        // Lock icon for locked levels
        if (!isUnlocked) {
            const lock = this.add.text(x, y + 20, '🔒', {
                font: '20px monospace'
            });
            lock.setOrigin(0.5);
            this.levelContainer.add(lock);
        }
        
        // Interaction
        if (isUnlocked) {
            button.setInteractive();
            
            button.on('pointerover', () => {
                button.setScale(1.1);
                this.selectedLevel = levelNum;
                this.updateInfoPanel(levelNum);
            });
            
            button.on('pointerout', () => {
                button.setScale(1);
                this.selectedLevel = null;
                this.updateInfoPanel(null);
            });
            
            button.on('pointerdown', () => {
                this.startLevel(levelNum);
            });
        }
        
        this.levelContainer.add([button, levelText]);
        this.levelButtons.push({ button, levelText, levelNum, isUnlocked });
    }

    createInfoPanel() {
        const { width, height } = this.cameras.main;
        const panelY = height - 100;
        
        // Info panel background
        this.infoPanel = this.add.rectangle(width/2, panelY, 700, 80, 0x1a1a2e);
        this.infoPanel.setStrokeStyle(2, 0x8a2be2);
        this.infoPanel.setAlpha(0.9);
        
        // Info text (will be updated when hovering levels)
        this.infoText = this.add.text(width/2, panelY - 15, 'Hover over a level to see details', {
            font: '18px monospace',
            fill: '#ccccff'
        });
        this.infoText.setOrigin(0.5);
        
        this.infoSubtext = this.add.text(width/2, panelY + 15, '', {
            font: '14px monospace',
            fill: '#aaaaff'
        });
        this.infoSubtext.setOrigin(0.5);
    }

    updateInfoPanel(levelNum) {
        if (levelNum === null) {
            this.infoText.setText('Hover over a level to see details');
            this.infoSubtext.setText('');
            return;
        }
        
        // Get level data from LevelManager
        const levelManager = this.registry.get('levelManager');
        const levelData = levelManager.getLevel(levelNum - 1); // Convert to 0-based index
        
        if (levelData) {
            this.infoText.setText(`Level ${levelNum}: ${levelData.name}`);
            this.infoSubtext.setText(levelData.flavorText || '');
            
            // Add completion info if completed
            if (this.progress.completedLevels[levelNum]) {
                const stars = this.progress.stars[levelNum] || 0;
                this.infoSubtext.setText(
                    this.infoSubtext.text + ` | Completed with ${stars} star${stars !== 1 ? 's' : ''}`
                );
            }
        }
    }

    createNavigationButtons() {
        const { width, height } = this.cameras.main;
        
        // Back button
        const backButton = this.add.text(50, height - 40, '← BACK', {
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
            // this.sound.play('select', { volume: 0.3 }); // TODO: Add sound
            this.scene.start('MainMenu');
        });
        
        // Stats display
        const totalStars = this.progress.totalStars || 0;
        const totalLevels = Object.keys(this.progress.completedLevels).length;
        
        const statsText = this.add.text(width - 50, height - 40, 
            `${totalLevels} Completed | ${totalStars} ★`, {
            font: '16px monospace',
            fill: '#ffd700'
        });
        statsText.setOrigin(1, 0);
    }

    setupKeyboardControls() {
        // ESC to go back
        this.input.keyboard.on('keydown-ESC', () => {
            // this.sound.play('select', { volume: 0.3 }); // TODO: Add sound
            this.scene.start('MainMenu');
        });
        
        // Number keys for chapter selection
        for (let i = 1; i <= 9; i++) {
            this.input.keyboard.on(`keydown-${i}`, () => {
                if (i <= this.chapters.length) {
                    this.selectChapter(i - 1);
                }
            });
        }
        
        // 0 for chapter 10
        this.input.keyboard.on('keydown-ZERO', () => {
            if (this.chapters.length >= 10) {
                this.selectChapter(9);
            }
        });
    }

    pulseNewLevels() {
        // Pulse animation for "NEW" text
        this.levelContainer.list.forEach(child => {
            if (child.name && child.name.startsWith('new_')) {
                this.tweens.add({
                    targets: child,
                    scaleX: 1.2,
                    scaleY: 1.2,
                    alpha: 0.7,
                    duration: 500,
                    yoyo: true,
                    ease: 'Sine.inOut'
                });
            }
        });
    }

    startLevel(levelNum) {
        // Save selected level
        this.registry.set('selectedLevel', levelNum - 1); // Convert to 0-based
        
        // Play sound
        // this.sound.play('select', { volume: 0.5 }); // TODO: Add sound
        
        // Transition effect
        this.cameras.main.fadeOut(300, 0, 0, 0);
        
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            // Start the game scene with the selected level
            const levelManager = this.registry.get('levelManager');
            levelManager.currentLevelIndex = levelNum - 1;
            this.scene.start('GameScene');
        });
    }

    saveProgress() {
        localStorage.setItem('glowmancer_progress', JSON.stringify(this.progress));
    }
}