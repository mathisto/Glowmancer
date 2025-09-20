// Magical transformations using Ramda.js for glow orb patterns
class ArrayOperations {
    static reverse(pattern) {
        // R.reverse creates a new reversed pattern
        return R.reverse(pattern);
    }

    static transpose(pattern) {
        if (!Array.isArray(pattern[0])) {
            // For single-row patterns, try to make them 2D square if possible
            const size = Math.sqrt(pattern.length);
            if (size === Math.floor(size)) {
                // Convert to 2D, transpose, then flatten
                const matrix = R.splitEvery(size, pattern);
                return R.flatten(R.transpose(matrix));
            }
            return pattern;
        }
        
        // For 2D patterns, use Ramda's transpose
        return R.transpose(pattern);
    }

    static rotateLeft(pattern) {
        if (!Array.isArray(pattern[0])) {
            // For single-row patterns: move first element to end
            // R.append adds to end, R.tail gets all but first
            return R.append(R.head(pattern), R.tail(pattern));
        }
        
        // For 2D patterns: transpose then reverse each row (counter-clockwise)
        return R.map(R.reverse, R.transpose(pattern));
    }

    static rotateRight(pattern) {
        if (!Array.isArray(pattern[0])) {
            // For single-row patterns: move last element to front
            // R.prepend adds to front, R.init gets all but last
            return R.prepend(R.last(pattern), R.init(pattern));
        }
        
        // For 2D patterns: reverse each row then transpose (clockwise)
        return R.transpose(R.map(R.reverse, pattern));
    }

    static reverseRows(pattern) {
        if (!Array.isArray(pattern[0])) {
            // For 1D patterns, try to make them 2D square if possible
            const size = Math.sqrt(pattern.length);
            if (size === Math.floor(size)) {
                const matrix = R.splitEvery(size, pattern);
                return R.flatten(R.map(R.reverse, matrix));
            }
            return pattern;
        }
        
        // For 2D patterns: reverse each row
        return R.map(R.reverse, pattern);
    }

    static flatten(pattern) {
        // R.flatten flattens one level deep
        return R.flatten(pattern);
    }

    static reshape2x3(pattern) {
        // Flatten first, then split into chunks of 3
        const flat = R.flatten([pattern]);
        if (flat.length !== 6) return pattern;
        
        return R.splitEvery(3, flat);
    }

    static reshape3x2(pattern) {
        // Flatten first, then split into chunks of 2
        const flat = R.flatten([pattern]);
        if (flat.length !== 6) return pattern;
        
        return R.splitEvery(2, flat);
    }

    // Selection Operations
    static first(pattern) {
        return R.take(1, pattern);
    }

    static last(pattern) {
        return R.takeLast(1, pattern);
    }

    static init(pattern) {
        // Remove last element
        return R.init(pattern);
    }

    static tail(pattern) {
        // Remove first element
        return R.tail(pattern);
    }

    static halve(pattern) {
        const mid = Math.ceil(pattern.length / 2);
        return [R.take(mid, pattern), R.drop(mid, pattern)];
    }

    // Weaving Operations
    static zip(pattern) {
        if (!Array.isArray(pattern[0]) || pattern.length !== 2) {
            return pattern;
        }
        // Interleave two patterns
        const zipped = R.zip(pattern[0], pattern[1]);
        return R.flatten(zipped);
    }

    static unzip(pattern) {
        if (!Array.isArray(pattern[0])) {
            // Split alternating elements
            const indexed = R.addIndex(R.map);
            const evens = indexed((val, idx) => idx % 2 === 0 ? val : null, pattern);
            const odds = indexed((val, idx) => idx % 2 === 1 ? val : null, pattern);
            return [
                R.filter(x => x !== null, evens),
                R.filter(x => x !== null, odds)
            ];
        }
        return pattern;
    }

    static dedupe(pattern) {
        // Remove adjacent duplicates
        if (!Array.isArray(pattern[0])) {
            return R.reduce((acc, val) => {
                if (acc.length === 0 || !R.equals(R.last(acc), val)) {
                    return R.append(val, acc);
                }
                return acc;
            }, [], pattern);
        }
        // For 2D patterns, dedupe rows
        return R.reduce((acc, row) => {
            if (acc.length === 0 || !R.equals(R.last(acc), row)) {
                return R.append(row, acc);
            }
            return acc;
        }, [], pattern);
    }

    static mirror(pattern) {
        // Append reversed copy
        return R.concat(pattern, R.reverse(pattern));
    }

    static palindrome(pattern) {
        // Create palindrome (don't duplicate middle)
        return R.concat(pattern, R.reverse(R.init(pattern)));
    }

    // Pattern Operations
    static chunk(pattern) {
        if (!Array.isArray(pattern[0])) {
            return R.splitEvery(2, pattern);
        }
        return pattern;
    }

    static unchunk(pattern) {
        return R.flatten(pattern);
    }

    static spiral(pattern) {
        if (!Array.isArray(pattern[0])) {
            return pattern;
        }
        
        const result = [];
        let top = 0, bottom = pattern.length - 1;
        let left = 0, right = pattern[0].length - 1;
        
        while (top <= bottom && left <= right) {
            // Right
            for (let i = left; i <= right; i++) {
                result.push(pattern[top][i]);
            }
            top++;
            
            // Down
            for (let i = top; i <= bottom; i++) {
                result.push(pattern[i][right]);
            }
            right--;
            
            // Left
            if (top <= bottom) {
                for (let i = right; i >= left; i--) {
                    result.push(pattern[bottom][i]);
                }
                bottom--;
            }
            
            // Up
            if (left <= right) {
                for (let i = bottom; i >= top; i--) {
                    result.push(pattern[i][left]);
                }
                left++;
            }
        }
        
        return result;
    }

    static zigzag(pattern) {
        if (!Array.isArray(pattern[0])) {
            return pattern;
        }
        
        return R.flatten(
            R.addIndex(R.map)((row, idx) => 
                idx % 2 === 0 ? row : R.reverse(row)
            , pattern)
        );
    }

    static diagonal(pattern) {
        if (!Array.isArray(pattern[0])) {
            return pattern;
        }
        
        const size = Math.min(pattern.length, pattern[0].length);
        return R.times(i => pattern[i][i], size);
    }

    // New operations stolen from Uiua
    static deduplicate(pattern) {
        // Remove duplicate rows (◴)
        return R.uniq(pattern);
    }

    static classify(pattern) {
        // Assign unique index to each unique element (⊛)
        const unique = R.uniq(pattern);
        return R.map(elem => R.indexOf(elem, unique), pattern);
    }

    static fold(pattern, fn = R.add) {
        // Reduce/fold operation (∧)
        return R.reduce(fn, R.head(pattern), R.tail(pattern));
    }

    static partition(pattern, delimiter = null) {
        // Split pattern into groups (⊜)
        if (delimiter === null) {
            // Split on change
            return R.reduce((acc, val) => {
                if (acc.length === 0 || !R.equals(R.last(R.last(acc)), val)) {
                    return R.append([val], acc);
                }
                return R.adjust(-1, R.append(val), acc);
            }, [], pattern);
        }
        // Split on delimiter
        return R.split(delimiter, pattern);
    }

    static stencil(pattern, size = 3) {
        // Apply operation to sliding windows (⧈)
        if (!Array.isArray(pattern[0])) {
            const windows = [];
            for (let i = 0; i <= pattern.length - size; i++) {
                windows.push(R.slice(i, i + size, pattern));
            }
            return windows;
        }
        return pattern;
    }

    static couple(pattern1, pattern2) {
        // Combine two arrays as rows (⊟)
        return [pattern1, pattern2];
    }

    static join(pattern1, pattern2) {
        // Append arrays end-to-end (⊂)
        return R.concat(pattern1, pattern2);
    }

    static box(pattern) {
        // Turn array into a box/container (□)
        return [pattern];
    }

    static unbox(pattern) {
        // Extract from box
        return Array.isArray(pattern[0]) && pattern.length === 1 ? pattern[0] : pattern;
    }

    static keep(pattern, mask) {
        // Filter based on boolean mask (▽)
        if (!Array.isArray(mask)) return pattern;
        return R.addIndex(R.filter)((val, idx) => mask[idx], pattern);
    }

    static drop(pattern, n) {
        // Drop first n elements (↘)
        return R.drop(n, pattern);
    }

    static take(pattern, n) {
        // Take first n elements (↙)  
        return R.take(n, pattern);
    }

    static select(pattern, indices) {
        // Select elements by indices (⊏)
        return R.map(i => pattern[i], indices);
    }

    static where(pattern) {
        // Get indices of non-zero elements (⊚)
        return R.addIndex(R.reduce)((acc, val, idx) => {
            if (val !== 0 && val !== '0' && val !== null && val !== false) {
                return R.append(idx, acc);
            }
            return acc;
        }, [], pattern);
    }
}