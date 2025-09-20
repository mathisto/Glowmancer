# Datamancy - Agent Guide

## Project Overview
Datamancy is a browser-based puzzle game teaching array programming through magical data transformations. Players cast spells (operations) inspired by APL/J/K languages to transform colored glyphs, solving puzzles with limited mana. Built with Phaser.js for eventual Steam release.

## Tech Stack
- **Runtime**: Browser (Chrome, Firefox, Safari)
- **Game Engine**: Phaser.js 3.90.0
- **Functional Library**: Ramda.js for array operations
- **Language**: JavaScript (ES6)
- **Package Manager**: npm
- **Server**: http-server for local development

## Project Structure

### Core Architecture
```
datamancy/
├── index.html                    # Main HTML entry point
├── package.json                  # Project dependencies
├── js/
│   ├── main.js                   # Phaser game configuration
│   ├── core/                     # Game logic (pure functions)
│   │   ├── ArrayOperations.js    # Ramda-powered transformations
│   │   ├── GameEngine.js         # State management, scoring
│   │   ├── LevelManager.js       # Level loading and progression
│   │   └── OperationLoader.js    # Spell/operation definitions
│   ├── scenes/                   # Phaser scenes
│   │   ├── Preloader.js          # Asset loading, initialization
│   │   ├── MainMenu.js           # Title screen with options
│   │   └── GameScene.js          # Main gameplay scene
│   ├── objects/                  # Game objects
│   │   └── GlyphSprite.js        # Animated glyph entities
│   ├── effects/                  # Visual effects
│   │   └── SpellEffects.js       # Spell casting animations
│   └── ui/                       # UI components
│       └── Spellbook.js          # Spell reference system
└── data/
    ├── operations/               # Spell definitions (JSON)
    │   ├── basic/               # Fundamental transformations
    │   ├── selection/           # Element extraction/filtering
    │   ├── weaving/             # Combining operations
    │   ├── pattern/             # Complex patterns
    │   └── README.md            # Operation schema documentation
    └── levels/                  # Level definitions (JSON)
        ├── tutorial/            # 001-002: Learning basics
        ├── easy/                # 003-004: Simple puzzles
        ├── medium/              # 005-007: Multi-step solutions
        ├── hard/                # 008-009: Complex challenges
        ├── expert/              # 010: Master trials
        └── foundation/          # 011-020: Extended content
```

## Key Components

### GameEngine
- Manages game state (current array, target array, mana)
- Applies operations using ArrayOperations
- Tracks move history for undo functionality
- Validates win conditions
- Calculates scores based on par

### ArrayOperations (Ramda-powered)
- Pure functional transformations
- All operations return new arrays (immutable)
- Key functions: reverse, transpose, rotate, flatten, reshape, zip, mirror
- Leverages Ramda.js for elegant implementations

### OperationLoader
- Loads spell definitions with magical theming
- Maps operations to:
  - Magical names (e.g., "Spell of Reflection")
  - APL symbols (⌽, ⍉, ⊖, etc.)
  - Keyboard shortcuts
  - Mana costs
  - Visual symbols

### LevelManager
- Loads 20+ levels from JSON files
- Manages progression and unlocking
- Provides level metadata and hints
- Supports multiple solutions per level

### SpellEffects
- Non-destructive visual animations
- Effects include: mirror lines, rotation indicators, compression waves
- Sprites are recreated after animation (not moved)
- Generic fallback for new operations

### GlyphSprite
- Phaser container with circle background
- Supports 20+ glyph types with unique colors
- Floating animation and hover effects
- Proper cleanup on destroy
- Fallback handling for undefined glyphs

## Spell System

### Current Spells (with APL symbols)
| Key | Name | Symbol | APL | Cost | Operation |
|-----|------|--------|-----|------|-----------|
| R | Spell of Reflection | ⇄ | ⌽ | 1 MP | reverse |
| T | Matrix Transmutation | ⤨ | ⍉ | 1 MP | transpose |
| A | Widdershins Rotation | ⟲ | ⊖ | 2 MP | rotateLeft |
| D | Sunwise Rotation | ⟳ | ⌽⊖ | 2 MP | rotateRight |
| E | Row Reflection | ⇄ | ⌽¨ | 2 MP | reverseRows |
| F | Planar Collapse | ⊡ | , | 3 MP | flatten |
| 2 | Dual Trinity Form | ⊞ | 2 3⍴ | 3 MP | reshape2x3 |
| 3 | Triple Duality Form | ⊟ | 3 2⍴ | 3 MP | reshape3x2 |

### Extended Spells (available in later levels)
- Prima Extraction (first)
- Essence Shedding (tail)
- Twin Reflection (mirror)
- Thread Binding (zip)
- Vortex Unwinding (spiral)
- And 15+ more operations

## Game Controls

### Spell Casting
- Letter/number keys cast spells directly
- Mouse click on spell cards
- Hover for tooltips

### Game Controls
- `U` - Undo last move
- `Ctrl+R` - Reset level
- `H` - Show hint
- `Q` - Return to menu
- `Any key` - Next level (on victory)
- Click anywhere - Next level (on victory)

## Level Schema
```json
{
  "id": 1,
  "name": "The First Incantation",
  "flavorText": "Every apprentice begins with the Spell of Reflection...",
  "difficulty": "tutorial",
  "mana": 2,
  "start": ["◆", "◇", "◈", "◊"],
  "target": ["◊", "◈", "◇", "◆"],
  "solutions": [["reverse"]],
  "par": 1,
  "hint": "The Spell of Reflection (⌽) reverses all",
  "unlockedOperations": ["reverse"]
}
```

## Operation Schema
```json
{
  "id": "reverse",
  "name": "Spell of Reflection",
  "symbol": "⇄",
  "aplSymbol": "⌽",
  "cost": 1,
  "key": "r",
  "category": "basic",
  "unlockLevel": 1,
  "description": "Reverses all elements",
  "implementation": {
    "ramda": "R.reverse(arr)",
    "note": "Creates new array"
  }
}
```

## Development & Testing

### Running the Game
```bash
npm install          # Install dependencies
npm start            # Start server on port 8080
# Open http://localhost:8080 in browser
```

### Testing New Features
1. Test operations in browser console: `ArrayOperations.reverse(['a','b','c'])`
2. Skip levels with developer tools
3. Check `window.datamancy` for game instance
4. Use browser DevTools for debugging

## Common Issues & Solutions

### Issue: Game freezes after level completion
- Check GlyphSprite for undefined glyph handling
- Verify all glyphs in level JSON are defined in GlyphSprite.glyphColors
- Check event listener cleanup on scene restart

### Issue: Animations don't match transformations
- SpellEffects should only provide visual feedback
- Sprites are destroyed and recreated after animation
- Don't move sprite positions during effects

### Issue: Spell names cut off
- Spell cards are 155px wide
- Names use 10px font at bottom
- Consider abbreviating long names

## Adding New Content

### New Operation
1. Add to `data/operations/{category}/{name}.json`
2. Implement in `ArrayOperations.js` using Ramda
3. Add to `OperationLoader.js` definitions
4. Create animation in `SpellEffects.js`
5. Add glyph colors if using new symbols

### New Level
1. Create `data/levels/{difficulty}/XXX-{name}.json`
2. Add to `LevelManager.js` level list
3. Test all solutions work
4. Verify unlocked operations are sufficient

### New Visual Effect
1. Add method to `SpellEffects.js`
2. Use non-destructive animations only
3. Call onComplete callback when done
4. Add to switch statement in playSpellEffect

## Performance Optimization
- Minimize Phaser render calls
- Use object pooling for particles
- Destroy unused sprites and tweens
- Clean up event listeners on scene changes

## Design Philosophy
- **Visual Magic**: Every operation should feel magical
- **Clear Feedback**: Players see exactly what transforms
- **Progressive Difficulty**: Gradually introduce complexity
- **Multiple Solutions**: Reward creative problem-solving
- **No Syntax Errors**: Visual operations only

## Future Enhancements
- Sound effects and music
- Particle system improvements
- Level editor mode
- Steam achievements
- Leaderboards
- Daily challenges
- Multiplayer races

## Debugging Tools
- Browser DevTools Console
- Phaser Debug Plugin
- `window.datamancy` game reference
- Network tab for asset loading
- Performance profiler for optimization

## Build & Deployment
- Currently runs directly without build step
- For production: Consider webpack/parcel bundling
- Steam release: Electron wrapper planned
- Web release: Static hosting (GitHub Pages, Netlify)

## Code Style Guidelines
- Use ES6 features (arrow functions, destructuring)
- Ramda for all array operations
- Immutable data transformations
- Clear magical naming conventions
- Comments only where necessary

---
*Datamancy v0.1.0 - 20 levels, 23+ operations, Phaser.js powered*