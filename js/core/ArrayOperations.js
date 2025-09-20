// ArrayOperations using Ramda.js for elegant functional transformations
class ArrayOperations {
    static reverse(arr) {
        // R.reverse creates a new reversed array
        return R.reverse(arr);
    }

    static transpose(arr) {
        if (!Array.isArray(arr[0])) {
            // For 1D arrays, try to make them 2D square if possible
            const size = Math.sqrt(arr.length);
            if (size === Math.floor(size)) {
                // Convert to 2D, transpose, then flatten
                const matrix = R.splitEvery(size, arr);
                return R.flatten(R.transpose(matrix));
            }
            return arr;
        }
        
        // For 2D arrays, use Ramda's transpose
        return R.transpose(arr);
    }

    static rotateLeft(arr) {
        if (!Array.isArray(arr[0])) {
            // For 1D arrays: move first element to end
            // R.append adds to end, R.tail gets all but first
            return R.append(R.head(arr), R.tail(arr));
        }
        
        // For 2D arrays: transpose then reverse each row (counter-clockwise)
        return R.map(R.reverse, R.transpose(arr));
    }

    static rotateRight(arr) {
        if (!Array.isArray(arr[0])) {
            // For 1D arrays: move last element to front
            // R.prepend adds to front, R.init gets all but last
            return R.prepend(R.last(arr), R.init(arr));
        }
        
        // For 2D arrays: reverse each row then transpose (clockwise)
        return R.transpose(R.map(R.reverse, arr));
    }

    static reverseRows(arr) {
        if (!Array.isArray(arr[0])) {
            // For 1D arrays, try to make them 2D square if possible
            const size = Math.sqrt(arr.length);
            if (size === Math.floor(size)) {
                const matrix = R.splitEvery(size, arr);
                return R.flatten(R.map(R.reverse, matrix));
            }
            return arr;
        }
        
        // For 2D arrays: reverse each row
        return R.map(R.reverse, arr);
    }

    static flatten(arr) {
        // R.flatten flattens one level deep
        return R.flatten(arr);
    }

    static reshape2x3(arr) {
        // Flatten first, then split into chunks of 3
        const flat = R.flatten([arr]);
        if (flat.length !== 6) return arr;
        
        return R.splitEvery(3, flat);
    }

    static reshape3x2(arr) {
        // Flatten first, then split into chunks of 2
        const flat = R.flatten([arr]);
        if (flat.length !== 6) return arr;
        
        return R.splitEvery(2, flat);
    }

    // Selection Operations
    static first(arr) {
        return R.take(1, arr);
    }

    static last(arr) {
        return R.takeLast(1, arr);
    }

    static init(arr) {
        // Remove last element
        return R.init(arr);
    }

    static tail(arr) {
        // Remove first element
        return R.tail(arr);
    }

    static halve(arr) {
        const mid = Math.ceil(arr.length / 2);
        return [R.take(mid, arr), R.drop(mid, arr)];
    }

    // Weaving Operations
    static zip(arr) {
        if (!Array.isArray(arr[0]) || arr.length !== 2) {
            return arr;
        }
        // Interleave two arrays
        const zipped = R.zip(arr[0], arr[1]);
        return R.flatten(zipped);
    }

    static unzip(arr) {
        if (!Array.isArray(arr[0])) {
            // Split alternating elements
            const indexed = R.addIndex(R.map);
            const evens = indexed((val, idx) => idx % 2 === 0 ? val : null, arr);
            const odds = indexed((val, idx) => idx % 2 === 1 ? val : null, arr);
            return [
                R.filter(x => x !== null, evens),
                R.filter(x => x !== null, odds)
            ];
        }
        return arr;
    }

    static dedupe(arr) {
        // Remove adjacent duplicates
        if (!Array.isArray(arr[0])) {
            return R.reduce((acc, val) => {
                if (acc.length === 0 || !R.equals(R.last(acc), val)) {
                    return R.append(val, acc);
                }
                return acc;
            }, [], arr);
        }
        // For 2D arrays, dedupe rows
        return R.reduce((acc, row) => {
            if (acc.length === 0 || !R.equals(R.last(acc), row)) {
                return R.append(row, acc);
            }
            return acc;
        }, [], arr);
    }

    static mirror(arr) {
        // Append reversed copy
        return R.concat(arr, R.reverse(arr));
    }

    static palindrome(arr) {
        // Create palindrome (don't duplicate middle)
        return R.concat(arr, R.reverse(R.init(arr)));
    }

    // Pattern Operations
    static chunk(arr) {
        if (!Array.isArray(arr[0])) {
            return R.splitEvery(2, arr);
        }
        return arr;
    }

    static unchunk(arr) {
        return R.flatten(arr);
    }

    static spiral(arr) {
        if (!Array.isArray(arr[0])) {
            return arr;
        }
        
        const result = [];
        let top = 0, bottom = arr.length - 1;
        let left = 0, right = arr[0].length - 1;
        
        while (top <= bottom && left <= right) {
            // Right
            for (let i = left; i <= right; i++) {
                result.push(arr[top][i]);
            }
            top++;
            
            // Down
            for (let i = top; i <= bottom; i++) {
                result.push(arr[i][right]);
            }
            right--;
            
            // Left
            if (top <= bottom) {
                for (let i = right; i >= left; i--) {
                    result.push(arr[bottom][i]);
                }
                bottom--;
            }
            
            // Up
            if (left <= right) {
                for (let i = bottom; i >= top; i--) {
                    result.push(arr[i][left]);
                }
                left++;
            }
        }
        
        return result;
    }

    static zigzag(arr) {
        if (!Array.isArray(arr[0])) {
            return arr;
        }
        
        return R.flatten(
            R.addIndex(R.map)((row, idx) => 
                idx % 2 === 0 ? row : R.reverse(row)
            , arr)
        );
    }

    static diagonal(arr) {
        if (!Array.isArray(arr[0])) {
            return arr;
        }
        
        const size = Math.min(arr.length, arr[0].length);
        return R.times(i => arr[i][i], size);
    }
}