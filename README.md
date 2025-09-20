# ✨ Glowmancer

<div align="center">

[![Play Now](https://img.shields.io/badge/Play-Now-brightgreen?style=for-the-badge&logo=google-chrome&logoColor=white)](http://localhost:8080)
[![Version](https://img.shields.io/badge/version-0.1.0-blue?style=for-the-badge)](package.json)
[![Levels](https://img.shields.io/badge/levels-20+-purple?style=for-the-badge)](data/levels)
[![Spells](https://img.shields.io/badge/spells-23+-orange?style=for-the-badge)](data/operations)
[![License](https://img.shields.io/badge/license-MIT-yellow?style=for-the-badge)](LICENSE)

**A mystical puzzle game of glow magic and pattern transformation**

[Features](#features) • [Getting Started](#getting-started) • [Spell Compendium](#spell-compendium) • [How to Play](#how-to-play)

</div>

---

## 🎮 About

Welcome, apprentice! In Glowmancer, you wield ancient spells to transform patterns of glowing mana orbs. Each puzzle challenges you to reshape mystical configurations using a limited pool of magical energy. Master the arcane arts through 20+ increasingly complex trials, from simple reflections to mind-bending dimensional manipulations.

## ⚡ Features

- **20+ Mystical Puzzles** - Progress from apprentice tutorials to archmage trials
- **23+ Unique Spells** - Each with distinct magical transformations and glyphs
- **Multiple Solutions** - Discover creative paths to victory
- **Par System** - Challenge yourself to find the most efficient incantations
- **Visual Magic** - Watch your spells animate with ethereal effects
- **Spellbook Reference** - In-game guide to all available transformations
- **Undo System** - Experiment freely with magical combinations

## 🚀 Getting Started

### Quick Start
```bash
npm install
npm start
```
Navigate to `http://localhost:8080` and begin your magical journey!

### System Requirements
- Modern web browser (Chrome, Firefox, Safari)
- Local development server

## 📖 Spell Compendium

### Basic Incantations
| Spell | Glyph | Hotkey | Mana | Effect |
|-------|-------|--------|------|--------|
| Spell of Reflection | ⇌ | R | 1 MP | Reverses the pattern |
| Matrix Transmutation | ⍉ | T | 1 MP | Transposes the matrix |
| Widdershins Rotation | ↺ | A | 2 MP | Rotates counterclockwise |
| Sunwise Rotation | ↻ | D | 2 MP | Rotates clockwise |
| Row Reflection | ⥀ | E | 2 MP | Reverses each row |
| Planar Collapse | ♭ | F | 3 MP | Flattens to one dimension |
| Dual Trinity Form | ⊞ | 2 | 3 MP | Reshapes to 2×3 grid |
| Triple Duality Form | ⊟ | 3 | 3 MP | Reshapes to 3×2 grid |

### Selection Magic
| Spell | Glyph | Hotkey | Mana | Effect |
|-------|-------|--------|------|--------|
| Prima Extraction | ⊢ | H | 2 MP | Keep first element |
| Ultima Selection | ⊣ | L | 2 MP | Keep last element |
| Essence Shedding | ↓ | X | 2 MP | Remove first element |
| Element Dismissal | ↘ | K | 2 MP | Drop first n elements |
| Element Harvest | ↙ | Y | 2 MP | Take first n elements |
| Index Invocation | ⊏ | N | 3 MP | Select by indices |
| Truth Seeking | ⊚ | W | 3 MP | Find non-zero indices |

### Weaving Techniques
| Spell | Glyph | Hotkey | Mana | Effect |
|-------|-------|--------|------|--------|
| Thread Binding | ⋈ | Z | 3 MP | Interleave elements |
| Twin Reflection | ⧇ | M | 4 MP | Mirror pattern |
| Dual Fusion | ⊟ | O | 2 MP | Combine as rows |
| Linear Fusion | ⊂ | J | 2 MP | Append end-to-end |
| Selective Retention | ▽ | 9 | 3 MP | Keep by mask |
| Unique Distillation | ◴ | B | 3 MP | Remove all duplicates |

### Advanced Transformations
| Spell | Glyph | Hotkey | Mana | Effect |
|-------|-------|--------|------|--------|
| Vortex Unwinding | @ | S | 4 MP | Spiral transformation |
| Essence Classification | ⊛ | 4 | 3 MP | Assign unique indices |
| Convergence Ritual | ∧ | 5 | 4 MP | Fold to single value |
| Segmentation Spell | ⊜ | 7 | 3 MP | Split into groups |
| Window Weaving | ⧈ | 8 | 4 MP | Apply to sliding windows |
| Containment Seal | □ | 0 | 1 MP | Box the pattern |
| Seal Breaking | ◇ | - | 1 MP | Unbox the pattern |

## 🎯 How to Play

### Objective
Transform your starting pattern of glowing orbs to match the target configuration using the fewest spells and least mana possible.

### Controls
- **Cast Spells**: Press letter/number keys or click spell cards
- **Undo**: `U` - Reverse your last incantation
- **Reset**: `Ctrl+R` - Restart the current trial
- **Hint**: `H` - Receive mystical guidance
- **Menu**: `Q` - Return to the main sanctum

### Mana System
Each spell consumes magical energy. You begin each trial with limited mana:
- Simple spells (⌽, ⍉) cost 1 MP
- Rotations (⊖, ⌽⊖) cost 2 MP  
- Complex forms (2 3⍴, 3 2⍴) cost 3 MP
- Master techniques cost 3-4 MP

### Progression
- **Tutorial** (Levels 1-2): Learn the fundamentals
- **Easy** (Levels 3-4): Apply basic transformations
- **Medium** (Levels 5-7): Combine multiple spells
- **Hard** (Levels 8-9): Master complex patterns
- **Expert** (Level 10): The ultimate archmage trial
- **Foundation** (Levels 11-20): Extended mystical challenges

## 🏆 Scoring

Your mastery is measured by:
- **Completion**: Achieving the target pattern
- **Efficiency**: Matching or beating par
- **Discovery**: Finding alternate solutions
- **Speed**: Swift spell execution

Perfect scores require matching the target using exactly the par number of moves!

## 🌟 Tips for Apprentices

1. **Study the Patterns** - Often the solution reveals itself through observation
2. **Think in Transformations** - Visualize how each spell affects the whole
3. **Combine Wisely** - Some spells work beautifully in sequence
4. **Use Your Spellbook** - Reference available spells with their glyphs
5. **Experiment Freely** - The undo spell (`U`) is always available

## 🔮 The Mystical Orbs

Each orb type possesses unique magical properties:
- ◆ ◇ ◈ ◊ - Diamond aspects
- ● ○ ◐ ◑ - Circular essences  
- ■ □ ▪ ▫ - Square formations
- ▲ △ ▼ ▽ - Triangular energies
- ★ ☆ ✦ ✧ - Stellar alignments

## 🎨 Credits

Created with mystical energies and ancient wisdom.

---

<div align="center">

**May your spells be swift and your patterns true!**

*Begin your journey at `http://localhost:8080`*

</div>