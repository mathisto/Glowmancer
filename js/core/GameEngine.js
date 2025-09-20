class GameEngine {
    constructor() {
        this.currentArray = [];
        this.targetArray = [];
        this.mana = 0;
        this.maxMana = 0;
        this.moves = [];
        this.currentLevel = null;
        this.score = 0;
    }

    loadLevel(level) {
        this.currentLevel = level;
        this.currentArray = [...level.start];
        this.targetArray = [...level.target];
        this.mana = level.mana;
        this.maxMana = level.mana;
        this.moves = [];
    }

    applyOperation(operationName, cost) {
        if (this.mana < cost) {
            return { success: false, message: 'Not enough mana!' };
        }

        const previousState = [...this.currentArray];
        
        // Check if ArrayOperations has this method
        if (typeof ArrayOperations[operationName] === 'function') {
            this.currentArray = ArrayOperations[operationName](this.currentArray);
        } else {
            return { success: false, message: 'Unknown operation: ' + operationName };
        }

        this.mana -= cost;
        this.moves.push({
            operation: operationName,
            cost: cost,
            previousState: previousState,
            resultState: [...this.currentArray]
        });

        return { 
            success: true, 
            won: this.checkWin(),
            previousState: previousState,
            newState: this.currentArray
        };
    }

    undo() {
        if (this.moves.length === 0) {
            return { success: false, message: 'No moves to undo' };
        }

        const lastMove = this.moves.pop();
        this.currentArray = lastMove.previousState;
        this.mana += lastMove.cost;

        return { success: true };
    }

    reset() {
        if (this.currentLevel) {
            this.loadLevel(this.currentLevel);
        }
    }

    checkWin() {
        const flatCurrent = this.flattenDeep(this.currentArray);
        const flatTarget = this.flattenDeep(this.targetArray);
        
        if (flatCurrent.length !== flatTarget.length) return false;
        
        return flatCurrent.every((val, idx) => val === flatTarget[idx]);
    }

    flattenDeep(arr) {
        return Array.isArray(arr) 
            ? arr.reduce((acc, val) => acc.concat(this.flattenDeep(val)), [])
            : arr;
    }

    calculateScore() {
        if (!this.currentLevel) return 0;
        
        const par = this.currentLevel.par || 1;
        const movesUsed = this.moves.length;
        const manaEfficiency = this.mana / this.maxMana;
        
        let baseScore = 1000;
        if (movesUsed <= par) {
            baseScore += 500;
        }
        baseScore += Math.floor(manaEfficiency * 300);
        baseScore -= (movesUsed - par) * 50;
        
        return Math.max(100, baseScore);
    }
}