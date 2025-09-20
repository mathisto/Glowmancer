class OperationLoader {
    constructor() {
        this.operations = new Map();
        this.operationsByCategory = {
            basic: [],
            selection: [],
            weaving: [],
            pattern: [],
            advanced: []
        };
        this.operationsByKey = new Map();
    }

    async loadOperations() {
        // In a real implementation, this would load from JSON files
        // For now, we'll define them inline
        const operations = [
            // Basic Operations
            {
                id: "reverse",
                name: "Spell of Reflection",
                symbol: "⇄",
                aplSymbol: "⌽",
                cost: 1,
                key: "r",
                category: "basic",
                unlockLevel: 1,
                description: "Reverses all elements"
            },
            {
                id: "transpose",
                name: "Matrix Transmutation",
                symbol: "⤨",
                aplSymbol: "⍉",
                cost: 1,
                key: "t",
                category: "basic",
                unlockLevel: 3,
                description: "Flips rows and columns"
            },
            {
                id: "rotateLeft",
                name: "Widdershins Rotation",
                symbol: "⟲",
                aplSymbol: "⊖",
                cost: 2,
                key: "a",
                category: "basic",
                unlockLevel: 2,
                description: "Rotates counter-clockwise"
            },
            {
                id: "rotateRight",
                name: "Sunwise Rotation",
                symbol: "⟳",
                aplSymbol: "⌽⊖",
                cost: 2,
                key: "d",
                category: "basic",
                unlockLevel: 2,
                description: "Rotates clockwise"
            },
            {
                id: "reverseRows",
                name: "Row Reflection",
                symbol: "⇄",
                aplSymbol: "⌽¨",
                cost: 2,
                key: "e",
                category: "basic",
                unlockLevel: 4,
                description: "Reverses each row"
            },
            {
                id: "flatten",
                name: "Planar Collapse",
                symbol: "⊡",
                aplSymbol: ",",
                cost: 3,
                key: "f",
                category: "basic",
                unlockLevel: 7,
                description: "Flattens to 1D"
            },
            {
                id: "reshape2x3",
                name: "Dual Trinity Form",
                symbol: "⊞",
                aplSymbol: "2 3⍴",
                cost: 3,
                key: "2",
                category: "basic",
                unlockLevel: 7,
                description: "Reshape to 2x3"
            },
            {
                id: "reshape3x2",
                name: "Triple Duality Form",
                symbol: "⊟",
                aplSymbol: "3 2⍴",
                cost: 3,
                key: "3",
                category: "basic",
                unlockLevel: 7,
                description: "Reshape to 3x2"
            },
            // Selection Operations
            {
                id: "first",
                name: "Prima Extraction",
                symbol: "◂",
                aplSymbol: "⊃",
                cost: 2,
                key: "h",
                category: "selection",
                unlockLevel: 8,
                description: "Keep first element"
            },
            {
                id: "last",
                name: "Ultima Selection",
                symbol: "▸",
                aplSymbol: "⊢↑",
                cost: 2,
                key: "l",
                category: "selection",
                unlockLevel: 6,
                description: "Keep last element"
            },
            {
                id: "init",
                name: "Final Severance",
                symbol: "◂▫",
                aplSymbol: "¯1↓",
                cost: 2,
                key: "i",
                category: "selection",
                unlockLevel: 7,
                description: "Remove last element"
            },
            {
                id: "tail",
                name: "Essence Shedding",
                symbol: "▫▸",
                aplSymbol: "1↓",
                cost: 2,
                key: "x",
                category: "selection",
                unlockLevel: 5,
                description: "Remove first element"
            },
            {
                id: "halve",
                name: "Bisection Ritual",
                symbol: "╫",
                aplSymbol: "⌊2÷⍨≢",
                cost: 3,
                key: "v",
                category: "selection",
                unlockLevel: 12,
                description: "Split into two parts"
            },
            // Weaving Operations
            {
                id: "zip",
                name: "Thread Binding",
                symbol: "⋈",
                aplSymbol: "⍪",
                cost: 3,
                key: "z",
                category: "weaving",
                unlockLevel: 15,
                description: "Interleave elements"
            },
            {
                id: "unzip",
                name: "Thread Separation",
                symbol: "⋉",
                aplSymbol: "⊂[2]",
                cost: 3,
                key: "u",
                category: "weaving",
                unlockLevel: 15,
                description: "Separate alternating"
            },
            {
                id: "mirror",
                name: "Twin Reflection",
                symbol: "⧉",
                aplSymbol: "⌽,⊢",
                cost: 4,
                key: "m",
                category: "weaving",
                unlockLevel: 11,
                description: "Append reversed copy"
            },
            {
                id: "palindrome",
                name: "Ouroboros Form",
                symbol: "⧈",
                aplSymbol: "⌽,1↓⊢",
                cost: 4,
                key: "p",
                category: "weaving",
                unlockLevel: 20,
                description: "Make palindromic"
            },
            {
                id: "dedupe",
                name: "Essence Purification",
                symbol: "≡",
                aplSymbol: "∪",
                cost: 3,
                key: "q",
                category: "weaving",
                unlockLevel: 18,
                description: "Remove duplicates"
            },
            // Pattern Operations
            {
                id: "chunk",
                name: "Pair Bonding",
                symbol: "⊟",
                aplSymbol: "2,/",
                cost: 2,
                key: "c",
                category: "pattern",
                unlockLevel: 10,
                description: "Group into pairs"
            },
            {
                id: "spiral",
                name: "Vortex Unwinding",
                symbol: "◉",
                aplSymbol: "⍉⊖",
                cost: 4,
                key: "s",
                category: "pattern",
                unlockLevel: 25,
                description: "Spiral pattern"
            },
            {
                id: "zigzag",
                name: "Serpent's Path",
                symbol: "⤸",
                aplSymbol: "⍉⌽",
                cost: 3,
                key: "g",
                category: "pattern",
                unlockLevel: 22,
                description: "Snake pattern"
            },
            {
                id: "diagonal",
                name: "Crystal Lattice",
                symbol: "⟋",
                aplSymbol: "1 1⍉",
                cost: 3,
                key: "j",
                category: "pattern",
                unlockLevel: 28,
                description: "Extract diagonal"
            }
        ];

        // Load operations into maps
        operations.forEach(op => {
            this.operations.set(op.id, op);
            this.operationsByKey.set(op.key, op);
            this.operationsByCategory[op.category].push(op);
        });
    }

    getOperation(id) {
        return this.operations.get(id);
    }

    getOperationByKey(key) {
        return this.operationsByKey.get(key);
    }

    getOperationsByCategory(category) {
        return this.operationsByCategory[category] || [];
    }

    getUnlockedOperations(level) {
        return Array.from(this.operations.values())
            .filter(op => op.unlockLevel <= level);
    }

    getAllOperations() {
        return Array.from(this.operations.values());
    }

    getOperationDisplay(operation) {
        // Format operation for display with APL symbol
        return {
            name: operation.name,
            symbol: operation.symbol,
            aplSymbol: operation.aplSymbol || '',
            cost: operation.cost,
            key: operation.key.toUpperCase(),
            description: operation.description
        };
    }
}