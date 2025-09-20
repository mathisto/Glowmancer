class Preloader extends Phaser.Scene {
    constructor() {
        super({ key: 'Preloader' });
    }

    preload() {
        // Create loading bar
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222255, 0.8);
        progressBox.fillRect(width/2 - 160, height/2 - 25, 320, 50);
        
        const loadingText = this.add.text(width/2, height/2 - 50, 'Summoning Magic...', {
            font: '20px monospace',
            fill: '#ffffff'
        });
        loadingText.setOrigin(0.5, 0.5);
        
        const percentText = this.add.text(width/2, height/2, '0%', {
            font: '18px monospace',
            fill: '#ffffff'
        });
        percentText.setOrigin(0.5, 0.5);
        
        // Loading events
        this.load.on('progress', (value) => {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0x8a2be2, 1);
            progressBar.fillRect(width/2 - 150, height/2 - 15, 300 * value, 30);
        });
        
        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
        });
        
        // Load assets (we'll add more later)
        // For now, we'll generate assets dynamically
        this.createGlyphTextures();
    }

    async create() {
        // Initialize game systems
        const operationLoader = new OperationLoader();
        const levelManager = new LevelManager();
        const gameEngine = new GameEngine();
        
        // Load operations and levels
        await operationLoader.loadOperations();
        await levelManager.loadLevels();
        
        // Store in registry
        this.registry.set('operationLoader', operationLoader);
        this.registry.set('levelManager', levelManager);
        this.registry.set('gameEngine', gameEngine);
        
        // Start main menu
        this.scene.start('MainMenu');
    }

    createGlyphTextures() {
        // Create textures for each glyph programmatically
        const glyphs = {
            '◆': '#ff4444',
            '◇': '#4444ff', 
            '◈': '#ffff44',
            '◊': '#44ff44',
            '★': '#ff44ff',
            '☆': '#44ffff',
            '✦': '#ffffff',
            '✧': '#888888'
        };

        Object.entries(glyphs).forEach(([glyph, color]) => {
            const graphics = this.make.graphics({ x: 0, y: 0, add: false });
            
            // Draw glyph background
            graphics.fillStyle(0x000000, 0.3);
            graphics.fillCircle(32, 32, 30);
            
            // Draw glyph border
            graphics.lineStyle(3, parseInt(color.replace('#', '0x')), 1);
            graphics.strokeCircle(32, 32, 28);
            
            // Generate texture
            graphics.generateTexture(`glyph_${glyph}`, 64, 64);
            graphics.destroy();
        });

        // Create particle texture
        const particleGraphics = this.make.graphics({ x: 0, y: 0, add: false });
        particleGraphics.fillStyle(0xffffff, 1);
        particleGraphics.fillCircle(4, 4, 4);
        particleGraphics.generateTexture('particle', 8, 8);
        particleGraphics.destroy();
    }
}