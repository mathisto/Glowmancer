class Spellbook {
    constructor(scene) {
        this.scene = scene;
        this.spells = [
            { 
                key: 'R', 
                name: 'Reverse', 
                operation: 'reverse', 
                cost: 1, 
                symbol: '⇄',
                description: 'Reverses the order of all elements',
                example: '[1,2,3] → [3,2,1]'
            },
            { 
                key: 'T', 
                name: 'Transpose', 
                operation: 'transpose', 
                cost: 1, 
                symbol: '⤨',
                description: 'Flips a matrix along its diagonal',
                example: '[[1,2],[3,4]] → [[1,3],[2,4]]'
            },
            { 
                key: 'A', 
                name: 'Rotate Left', 
                operation: 'rotateLeft', 
                cost: 2, 
                symbol: '⟲',
                description: 'Rotates elements counter-clockwise',
                example: '[1,2,3,4] → [2,3,4,1]'
            },
            { 
                key: 'D', 
                name: 'Rotate Right', 
                operation: 'rotateRight', 
                cost: 2, 
                symbol: '⟳',
                description: 'Rotates elements clockwise',
                example: '[1,2,3,4] → [4,1,2,3]'
            },
            { 
                key: 'E', 
                name: 'Reverse Rows', 
                operation: 'reverseRows', 
                cost: 2, 
                symbol: '⇄',
                description: 'Reverses each row individually',
                example: '[[1,2],[3,4]] → [[2,1],[4,3]]'
            },
            { 
                key: 'F', 
                name: 'Flatten', 
                operation: 'flatten', 
                cost: 3, 
                symbol: '⊡',
                description: 'Converts a 2D array to 1D',
                example: '[[1,2],[3,4]] → [1,2,3,4]'
            },
            { 
                key: '2', 
                name: 'Reshape 2x3', 
                operation: 'reshape2x3', 
                cost: 3, 
                symbol: '⊞',
                description: 'Reshapes array into 2 rows, 3 columns',
                example: '[1,2,3,4,5,6] → [[1,2,3],[4,5,6]]'
            },
            { 
                key: '3', 
                name: 'Reshape 3x2', 
                operation: 'reshape3x2', 
                cost: 3, 
                symbol: '⊟',
                description: 'Reshapes array into 3 rows, 2 columns',
                example: '[1,2,3,4,5,6] → [[1,2],[3,4],[5,6]]'
            }
        ];
    }
    
    getSpell(operation) {
        return this.spells.find(spell => spell.operation === operation);
    }
    
    getSpellByKey(key) {
        return this.spells.find(spell => spell.key === key.toUpperCase());
    }
    
    getAllSpells() {
        return this.spells;
    }
    
    getUnlockedSpells(unlockedOperations) {
        return this.spells.filter(spell => unlockedOperations.includes(spell.operation));
    }
    
    createSpellTooltip(x, y, spell) {
        const container = this.scene.add.container(x, y);
        
        // Background
        const bg = this.scene.add.rectangle(0, 0, 250, 120, 0x2a2a3e, 0.95);
        bg.setStrokeStyle(2, 0x8a2be2);
        container.add(bg);
        
        // Title
        const title = this.scene.add.text(0, -40, spell.name, {
            font: 'bold 16px monospace',
            fill: '#ffcc00'
        }).setOrigin(0.5);
        container.add(title);
        
        // Description
        const desc = this.scene.add.text(0, -15, spell.description, {
            font: '12px monospace',
            fill: '#ffffff',
            align: 'center',
            wordWrap: { width: 220 }
        }).setOrigin(0.5);
        container.add(desc);
        
        // Example
        const example = this.scene.add.text(0, 20, spell.example, {
            font: '11px monospace',
            fill: '#88ccff'
        }).setOrigin(0.5);
        container.add(example);
        
        // Cost
        const cost = this.scene.add.text(0, 40, `Cost: ${spell.cost} MP`, {
            font: 'bold 12px monospace',
            fill: '#44ccff'
        }).setOrigin(0.5);
        container.add(cost);
        
        return container;
    }
}