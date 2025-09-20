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
                glyphSymbol: "⇌",
                cost: 1,
                key: "r",
                category: "basic",
                unlockLevel: 1,
                description: "Reverses all orbs"
            },
            {
                id: "transpose",
                name: "Matrix Transmutation",
                symbol: "⤨",
                glyphSymbol: "⍉",
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
                glyphSymbol: "↺",
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
                glyphSymbol: "↻",
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
                glyphSymbol: "⥀",
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
                glyphSymbol: "♭",
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
                glyphSymbol: "⊞",
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
                glyphSymbol: "⊟",
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
                glyphSymbol: "⊢",
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
                glyphSymbol: "⊣",
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
                glyphSymbol: "⊐",
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
                glyphSymbol: "↓",
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
                glyphSymbol: "╫",
                cost: 3,
                key: "v",
                category: "selection",
                unlockLevel: 12,
                description: "Split into two parts"
            },
            {
                id: "drop",
                name: "Element Dismissal",
                symbol: "↘",
                glyphSymbol: "↘",
                cost: 2,
                key: "k",
                category: "selection",
                unlockLevel: 9,
                description: "Drop first n elements"
            },
            {
                id: "take",
                name: "Element Harvest",
                symbol: "↙",
                glyphSymbol: "↙",
                cost: 2,
                key: "y",
                category: "selection",
                unlockLevel: 9,
                description: "Take first n elements"
            },
            {
                id: "select",
                name: "Index Invocation",
                symbol: "⊏",
                glyphSymbol: "⊏",
                cost: 3,
                key: "n",
                category: "selection",
                unlockLevel: 14,
                description: "Select by indices"
            },
            {
                id: "where",
                name: "Truth Seeking",
                symbol: "⊚",
                glyphSymbol: "⊚",
                cost: 3,
                key: "w",
                category: "selection",
                unlockLevel: 16,
                description: "Find non-zero indices"
            },
            // Weaving Operations
            {
                id: "zip",
                name: "Thread Binding",
                symbol: "⋈",
                glyphSymbol: "⋈",
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
                glyphSymbol: "⋉",
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
                glyphSymbol: "⧇",
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
                glyphSymbol: "⥁",
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
                glyphSymbol: "≡",
                cost: 3,
                key: "q",
                category: "weaving",
                unlockLevel: 18,
                description: "Remove adjacent duplicates"
            },
            {
                id: "deduplicate",
                name: "Unique Distillation",
                symbol: "◴",
                glyphSymbol: "◴",
                cost: 3,
                key: "b",
                category: "weaving",
                unlockLevel: 19,
                description: "Remove all duplicates"
            },
            {
                id: "couple",
                name: "Dual Fusion",
                symbol: "⊟",
                glyphSymbol: "⊟",
                cost: 2,
                key: "o",
                category: "weaving",
                unlockLevel: 10,
                description: "Combine as rows"
            },
            {
                id: "join",
                name: "Linear Fusion",
                symbol: "⊂",
                glyphSymbol: "⊂",
                cost: 2,
                key: "j",
                category: "weaving",
                unlockLevel: 8,
                description: "Append end-to-end"
            },
            {
                id: "keep",
                name: "Selective Retention",
                symbol: "▽",
                glyphSymbol: "▽",
                cost: 3,
                key: "9",
                category: "weaving",
                unlockLevel: 17,
                description: "Keep by mask"
            },
            // Pattern Operations
            {
                id: "chunk",
                name: "Pair Bonding",
                symbol: "⊠",
                glyphSymbol: "⊠",
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
                glyphSymbol: "@",
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
                glyphSymbol: "⤸",
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
                glyphSymbol: "⟋",
                cost: 3,
                key: "6",
                category: "pattern",
                unlockLevel: 28,
                description: "Extract diagonal"
            },
            // Advanced Operations from Uiua
            {
                id: "classify",
                name: "Essence Classification",
                symbol: "⊛",
                glyphSymbol: "⊛",
                cost: 3,
                key: "4",
                category: "pattern",
                unlockLevel: 21,
                description: "Assign unique indices"
            },
            {
                id: "fold",
                name: "Convergence Ritual",
                symbol: "∧",
                glyphSymbol: "∧",
                cost: 4,
                key: "5",
                category: "pattern",
                unlockLevel: 23,
                description: "Reduce to single value"
            },
            {
                id: "partition",
                name: "Segmentation Spell",
                symbol: "⊜",
                glyphSymbol: "⊜",
                cost: 3,
                key: "7",
                category: "pattern",
                unlockLevel: 24,
                description: "Split into groups"
            },
            {
                id: "stencil",
                name: "Window Weaving",
                symbol: "⧈",
                glyphSymbol: "⧈",
                cost: 4,
                key: "8",
                category: "pattern",
                unlockLevel: 26,
                description: "Apply to windows"
            },
            {
                id: "box",
                name: "Containment Seal",
                symbol: "□",
                glyphSymbol: "□",
                cost: 1,
                key: "0",
                category: "pattern",
                unlockLevel: 13,
                description: "Box the pattern"
            },
            {
                id: "unbox",
                name: "Seal Breaking",
                symbol: "◇",
                glyphSymbol: "◇",
                cost: 1,
                key: "-",
                category: "pattern",
                unlockLevel: 13,
                description: "Unbox the pattern"
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
        // Format operation for display with mystical symbol
        return {
            name: operation.name,
            symbol: operation.symbol,
            glyphSymbol: operation.glyphSymbol || '',
            cost: operation.cost,
            key: operation.key.toUpperCase(),
            description: operation.description
        };
    }
}