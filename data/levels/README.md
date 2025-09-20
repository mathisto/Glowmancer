# Glowmancer Levels

Each level is a mystical puzzle in the Glowmancer universe, defined in its own JSON file.

## Directory Structure

```
levels/
├── tutorial/     # Learn the basics (001-002)
├── easy/        # Simple transformations (003-004)
├── medium/      # Multi-step puzzles (005-007)
├── hard/        # Complex challenges (008-009)
├── expert/      # Master trials (010)
└── foundation/  # Extended content (011-020)
```

## Level Schema

Each level file must follow this structure:

```json
{
  "id": 1,
  "name": "The First Incantation",
  "flavorText": "Every apprentice begins with the Spell of Reflection...",
  "difficulty": "tutorial",
  "mana": 2,
  "start": ["◆", "◇", "◈", "◊"],
  "target": ["◊", "◈", "◇", "◆"],
  "solutions": [
    ["reverse"]
  ],
  "par": 1,
  "hint": "The Spell of Reflection (⌽) reverses all",
  "unlockedOperations": ["reverse"],
  "requiredMasteries": [],
  "scoring": {
    "perfect": 100,
    "parBonus": 50,
    "manaBonus": 25
  }
}
```

## Field Definitions

### Required Fields

- **id**: Unique numeric identifier (sequential)
- **name**: Thematic level name
- **difficulty**: Category (tutorial/easy/medium/hard/expert/foundation)
- **mana**: Starting mana points (energy for spells)
- **start**: Initial orb pattern (1D or 2D array)
- **target**: Goal pattern to achieve
- **solutions**: Array of valid solution paths
- **par**: Optimal number of moves
- **unlockedOperations**: Available spells for this level

### Optional Fields

- **flavorText**: Lore/story text for immersion
- **hint**: Help text shown on request
- **requiredMasteries**: Previous levels that must be completed
- **scoring**: Point values for achievements
- **dimensions**: Force specific grid dimensions (e.g., [2, 3] for 2×3)
- **restrictions**: Special rules (e.g., "no undo allowed")
- **dialogue**: Character dialogue for story progression
- **tutorialSteps**: Step-by-step instructions for tutorial levels

## Orb Symbol Reference

Standard glowing orbs used in patterns:

- ◆ (Diamond - Fire element)
- ◇ (Hollow Diamond - Air element)
- ◈ (Diamond with Dot - Earth element)
- ◊ (Lozenge - Water element)
- ○ (Circle - Light element)
- ● (Filled Circle - Shadow element)
- ◯ (Large Circle - Void element)
- ◉ (Circled Dot - Energy element)
- ▲ (Triangle - Spirit element)
- △ (Hollow Triangle - Mind element)

## Naming Conventions

### File Naming

Files should be named: `{number:03d}-{kebab-case-name}.json`

Examples:
- `001-first-incantation.json`
- `015-the-perfect-center.json`
- `020-dimensional-architect.json`

### Level Naming Guide

Use evocative, mystical names that hint at the solution:

| Concept | Example Names |
|---------|---------------|
| Reflection/Mirror | "Mirror Lake", "The Reflection", "Inverse Reality" |
| Rotation | "Circular Dance", "The Turning", "Widdershins Way" |
| Transformation | "Planar Shift", "Dimensional Flux", "The Transmutation" |
| Symmetry | "Perfect Balance", "Harmonic Convergence", "The Equilibrium" |
| Selection | "The Extraction", "Prima Selection", "Essence Distillation" |
| Combination | "Thread Binding", "The Weaving", "Unified Patterns" |

## Creating New Levels

### 1. Design the Puzzle

Start with the transformation concept:
- What spell(s) should the player learn/master?
- What makes this puzzle unique?
- Is there an elegant solution?

### 2. Create the Patterns

Design visually distinct start and target patterns:
```javascript
// Good - Clear transformation
start:  ["◆", "◇", "◈", "◊"]
target: ["◊", "◈", "◇", "◆"]

// Better - Multiple valid approaches
start:  [["◆", "◇"], ["◈", "◊"]]
target: [["◈", "◆"], ["◊", "◇"]]
```

### 3. Validate Solutions

Test all solution paths:
```json
"solutions": [
  ["reverse"],                    // Simple solution
  ["rotateRight", "rotateRight"], // Alternative approach
  ["transpose", "reverse"]        // Advanced solution
]
```

### 4. Set Appropriate Difficulty

- **Tutorial (1-2)**: Single operation, clear goal
- **Easy (3-4)**: 1-2 operations, obvious solution
- **Medium (5-7)**: 2-3 operations, requires planning
- **Hard (8-9)**: 3-4 operations, multiple approaches
- **Expert (10)**: 4+ operations, non-obvious solution
- **Foundation (11-20)**: Varied difficulty, expanding concepts

### 5. Write Engaging Flavor

Add mystical context:
```json
"flavorText": "The ancient mages discovered that reality itself could be folded...",
"hint": "Sometimes the shortest path requires going backwards first"
```

### 6. Balance Mana Economy

- Mana should be slightly above minimum required
- Par solutions should leave 0-1 mana remaining
- Allow for creative but inefficient solutions

## Level Progression

### Skill Introduction Timeline

1. **Levels 1-2**: Basic reflection (reverse)
2. **Levels 3-4**: Rotation concepts
3. **Levels 5-7**: Matrix operations (transpose)
4. **Levels 8-9**: Dimensional manipulation (flatten/reshape)
5. **Level 10**: Combination mastery
6. **Levels 11-15**: Selection and extraction
7. **Levels 16-20**: Advanced weaving and patterns

### Difficulty Curve

Ensure smooth progression:
- Each level builds on previous knowledge
- Introduce one new concept at a time
- Provide "aha!" moments regularly
- Include breather levels after difficult challenges

## Testing Checklist

Before finalizing a level:

- [ ] All solutions work as intended
- [ ] Par is achievable but challenging
- [ ] Mana budget allows for experimentation
- [ ] Visual patterns are distinct and clear
- [ ] Hint provides guidance without giving away solution
- [ ] Level name reflects the puzzle theme
- [ ] Difficulty matches the category
- [ ] File follows naming convention

## Example Levels

See individual difficulty directories for complete examples:
- tutorial/001-first-incantation.json - Introduction to reflection
- easy/003-dimensional-flip.json - Simple 2D transformation
- medium/005-transpose-paradox.json - Matrix manipulation
- hard/008-harmonic-convergence.json - Complex multi-step puzzle
- expert/010-archmage-trial.json - Ultimate test of mastery