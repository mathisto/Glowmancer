// Datamancy - Main Game Configuration
const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent: 'game-canvas',
    backgroundColor: '#0a0e27',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [Preloader, MainMenu, GameScene],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    render: {
        antialias: true,
        pixelArt: false,
        roundPixels: false
    }
};

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    // Remove loading text
    const gameCanvas = document.getElementById('game-canvas');
    gameCanvas.innerHTML = '';
    gameCanvas.classList.remove('loading');
    
    // Initialize Phaser game
    const game = new Phaser.Game(config);
    
    // Add keyboard focus
    gameCanvas.tabIndex = 1;
    gameCanvas.focus();
    
    // Store game reference globally for debugging
    window.datamancy = game;
    
    console.log('✨ Datamancy initialized! Use window.datamancy to access the game instance.');
});