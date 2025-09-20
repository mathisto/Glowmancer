class LevelManager {
    constructor() {
        this.levels = [];
        this.currentLevelIndex = 0;
        this.unlockedLevels = 1;
        this.levelsByDifficulty = {
            tutorial: [],
            easy: [],
            medium: [],
            hard: [],
            expert: [],
            foundation: []
        };
    }

    async loadLevels() {
        // Define all level files in order
        const levelFiles = [
            // Tutorial (1-2)
            'tutorial/001-first-incantation.json',
            'tutorial/002-circular-dance.json',
            // Easy (3-4)
            'easy/003-dimensional-flip.json',
            'easy/004-row-reversal.json',
            // Medium (5-7)
            'medium/005-transpose-paradox.json',
            'medium/006-spiral-pattern.json',
            'medium/007-planar-shift.json',
            // Hard (8-9)
            'hard/008-harmonic-convergence.json',
            'hard/009-mirror-maze.json',
            // Expert (10)
            'expert/010-archmage-trial.json',
            // Foundation (11-20) - Additional levels
            'foundation/011-mirror-lake.json',
            'foundation/012-the-bisection.json',
            'foundation/013-selective-symmetry.json',
            'foundation/014-rotation-challenge.json',
            'foundation/015-the-perfect-center.json',
            'foundation/016-mirror-and-select.json',
            'foundation/017-the-extraction.json',
            'foundation/018-dimensional-prep.json',
            'foundation/019-complex-symmetry.json',
            'foundation/020-dimensional-architect.json'
        ];

        // Load each level
        for (const file of levelFiles) {
            try {
                const response = await fetch(`data/levels/${file}`);
                if (response.ok) {
                    const level = await response.json();
                    this.levels.push(level);
                    
                    // Categorize by difficulty
                    if (this.levelsByDifficulty[level.difficulty]) {
                        this.levelsByDifficulty[level.difficulty].push(level);
                    }
                }
            } catch (error) {
                console.error(`Failed to load level ${file}:`, error);
            }
        }

        // If no levels loaded from files, use defaults
        if (this.levels.length === 0) {
            console.log('Using default levels as fallback');
            this.loadDefaultLevels();
        }

        console.log(`Loaded ${this.levels.length} levels`);
    }

    loadDefaultLevels() {
        // Fallback levels if files can't be loaded
        this.levels = [
            {
                id: 1,
                name: "The First Incantation",
                flavorText: "Every apprentice begins with the Spell of Reflection...",
                difficulty: "tutorial",
                mana: 2,
                start: ["◆", "◇", "◈", "◊"],
                target: ["◊", "◈", "◇", "◆"],
                solutions: [["reverse"]],
                par: 1,
                hint: "The Spell of Reflection (⌽) reverses all elements",
                unlockedOperations: ["reverse"]
            },
            {
                id: 2,
                name: "The Circular Dance",
                flavorText: "The spheres must dance in a circle...",
                difficulty: "tutorial",
                mana: 3,
                start: ["★", "☆", "✦", "✧"],
                target: ["✧", "★", "☆", "✦"],
                solutions: [["rotateRight"]],
                par: 1,
                hint: "Use Sunwise Rotation (⟳) to shift the dance",
                unlockedOperations: ["reverse", "rotateRight", "rotateLeft"]
            },
            {
                id: 3,
                name: "Matrix Awakening",
                flavorText: "The grid holds secrets in its corners...",
                difficulty: "easy",
                mana: 3,
                start: [["◆", "◇"], ["◈", "◊"]],
                target: [["◆", "◈"], ["◇", "◊"]],
                solutions: [["transpose"]],
                par: 1,
                hint: "Matrix Transmutation (⍉) flips rows and columns",
                unlockedOperations: ["reverse", "transpose", "rotateLeft", "rotateRight"]
            },
            {
                id: 4,
                name: "Row Reversal",
                flavorText: "Each row must reflect upon itself...",
                difficulty: "easy",
                mana: 4,
                start: [["◆", "◇", "◈"], ["◊", "★", "☆"]],
                target: [["◈", "◇", "◆"], ["☆", "★", "◊"]],
                solutions: [["reverseRows"]],
                par: 1,
                hint: "Row Reflection reverses each row independently",
                unlockedOperations: ["reverse", "transpose", "rotateLeft", "rotateRight", "reverseRows"]
            },
            {
                id: 5,
                name: "Dimensional Shift",
                flavorText: "Reality bends to your will...",
                difficulty: "medium",
                mana: 6,
                start: ["◆", "◇", "◈", "◊", "★", "☆"],
                target: [["◆", "◇", "◈"], ["◊", "★", "☆"]],
                solutions: [["reshape2x3"]],
                par: 1,
                hint: "Dual Trinity Form reshapes flat arrays into grids",
                unlockedOperations: ["reverse", "transpose", "rotateLeft", "rotateRight", "reshape2x3", "reshape3x2", "flatten"]
            }
        ];
    }

    getCurrentLevel() {
        return this.levels[this.currentLevelIndex];
    }

    getLevel(index) {
        return this.levels[index];
    }

    getLevelById(id) {
        return this.levels.find(level => level.id === id);
    }

    nextLevel() {
        if (this.currentLevelIndex < this.levels.length - 1) {
            this.currentLevelIndex++;
            this.unlockedLevels = Math.max(this.unlockedLevels, this.currentLevelIndex + 1);
            return true;
        }
        return false;
    }

    previousLevel() {
        if (this.currentLevelIndex > 0) {
            this.currentLevelIndex--;
            return true;
        }
        return false;
    }

    selectLevel(index) {
        if (index >= 0 && index < this.levels.length && index < this.unlockedLevels) {
            this.currentLevelIndex = index;
            return true;
        }
        return false;
    }

    unlockNextLevel() {
        this.unlockedLevels = Math.min(this.unlockedLevels + 1, this.levels.length);
    }

    getTotalLevels() {
        return this.levels.length;
    }

    getUnlockedLevels() {
        return this.unlockedLevels;
    }

    getLevelsByDifficulty(difficulty) {
        return this.levelsByDifficulty[difficulty] || [];
    }
}