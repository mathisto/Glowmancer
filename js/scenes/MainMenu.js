class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenu' });
    }

    create() {
        const { width, height } = this.cameras.main;
        
        // Title with magical effect
        const title = this.add.text(width/2, height/3, 'GLOWMANCER', {
            font: 'bold 72px monospace',
            fill: '#ffffff',
            stroke: '#8a2be2',
            strokeThickness: 6
        });
        title.setOrigin(0.5);
        title.setShadow(0, 0, '#8a2be2', 10, true, true);
        
        // Subtitle
        const subtitle = this.add.text(width/2, height/3 + 80, 'Master the Glow Magic', {
            font: '24px monospace',
            fill: '#ccccff'
        });
        subtitle.setOrigin(0.5);
        
        // Menu options
        const menuOptions = [
            { text: 'Begin Journey', scene: 'GameScene' },
            { text: 'Select Level', action: 'levelSelect' },
            { text: 'Spellbook', action: 'spellbook' },
            { text: 'Settings', action: 'settings' }
        ];

        this.selectedIndex = 0;
        this.menuItems = [];

        menuOptions.forEach((option, index) => {
            const y = height/2 + 50 + (index * 50);
            const menuItem = this.add.text(width/2, y, option.text, {
                font: '28px monospace',
                fill: '#ffffff'
            });
            menuItem.setOrigin(0.5);
            menuItem.setInteractive();
            menuItem.setData('scene', option.scene);
            menuItem.setData('action', option.action);
            
            // Mouse events
            menuItem.on('pointerover', () => {
                this.selectMenuItem(index);
            });
            
            menuItem.on('pointerdown', () => {
                this.activateMenuItem();
            });
            
            this.menuItems.push(menuItem);
        });

        // Keyboard controls
        this.input.keyboard.on('keydown-UP', () => {
            this.selectMenuItem(Math.max(0, this.selectedIndex - 1));
        });

        this.input.keyboard.on('keydown-DOWN', () => {
            this.selectMenuItem(Math.min(this.menuItems.length - 1, this.selectedIndex + 1));
        });

        this.input.keyboard.on('keydown-ENTER', () => {
            this.activateMenuItem();
        });

        this.input.keyboard.on('keydown-SPACE', () => {
            this.activateMenuItem();
        });

        // Initial selection
        this.selectMenuItem(0);

        // Add floating particles for ambiance
        this.createMagicalParticles();

        // Animate title
        this.tweens.add({
            targets: title,
            scaleX: 1.05,
            scaleY: 1.05,
            duration: 2000,
            ease: 'Sine.inOut',
            yoyo: true,
            repeat: -1
        });
    }

    selectMenuItem(index) {
        // Deselect previous
        if (this.menuItems[this.selectedIndex]) {
            this.menuItems[this.selectedIndex].setStyle({
                fill: '#ffffff',
                fontSize: '28px'
            });
        }

        // Select new
        this.selectedIndex = index;
        this.menuItems[this.selectedIndex].setStyle({
            fill: '#ffcc00',
            fontSize: '32px'
        });

        // Play hover sound (when we add audio)
        // this.sound.play('hover');
    }

    activateMenuItem() {
        const selected = this.menuItems[this.selectedIndex];
        const scene = selected.getData('scene');
        const action = selected.getData('action');

        if (scene) {
            // Transition effect
            this.cameras.main.fade(500, 0, 0, 0);
            this.time.delayedCall(500, () => {
                this.scene.start(scene);
            });
        } else if (action) {
            // Handle other actions
            switch(action) {
                case 'levelSelect':
                    this.cameras.main.fade(500, 0, 0, 0);
                    this.time.delayedCall(500, () => {
                        this.scene.start('LevelSelect');
                    });
                    break;
                case 'spellbook':
                    console.log('Spellbook viewer not yet implemented');
                    break;
                case 'settings':
                    console.log('Settings not yet implemented');
                    break;
            }
        }
    }

    createMagicalParticles() {
        // Create particle emitters for magical ambiance
        const particles = this.add.particles(0, 0, 'particle', {
            x: { min: 0, max: this.cameras.main.width },
            y: { min: 0, max: this.cameras.main.height },
            scale: { start: 0.5, end: 0 },
            blendMode: 'ADD',
            lifespan: 3000,
            quantity: 1,
            frequency: 500,
            alpha: { start: 0.5, end: 0 },
            tint: [0x8a2be2, 0x4444ff, 0xff44ff]
        });
    }
}