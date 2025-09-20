# Datamancy Operations (Spells)

Each operation is a spell in the Datamancy universe, defined in its own JSON file.

## Directory Structure

```
operations/
├── basic/        # Fundamental transformations (Level 1-10)
├── selection/    # Element selection/filtering (Level 5-20)
├── weaving/      # Interleaving and combining (Level 10-30)
├── pattern/      # Complex patterns (Level 20-40)
└── advanced/     # Master-level operations (Level 30+)
```

## Operation Schema

Each operation file must follow this structure:

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
  "description": "Reverses the order of all elements, like a mirror's reflection",
  "flavor": "As above, so below - the ancient incantation flips reality itself",
  "examples": {
    "1d": {
      "input": ["◆", "◇", "◈", "◊"],
      "output": ["◊", "◈", "◇", "◆"]
    },
    "2d": {
      "input": [["◆", "◇"], ["◈", "◊"]],
      "output": [["◈", "◊"], ["◆", "◇"]]
    }
  },
  "implementation": {
    "ramda": "R.reverse(arr)",
    "vanilla": "arr.slice().reverse()",
    "note": "Creates new array, preserves original"
  },
  "tags": ["fundamental", "symmetry", "beginner"],
  "relatedOps": ["reverseRows", "mirror", "palindrome"]
}
```

## Field Definitions

### Required Fields

- **id**: Unique identifier matching the function name
- **name**: Magical/arcane name for the spell
- **symbol**: Unicode symbol for visual representation
- **aplSymbol**: APL/J/K language symbol (if applicable)
- **cost**: Mana cost (1-5 typically)
- **key**: Keyboard shortcut
- **category**: Directory category (basic/selection/weaving/pattern/advanced)
- **unlockLevel**: When this spell becomes available
- **description**: Clear explanation of what the operation does

### Optional Fields

- **flavor**: Lore/story text for immersion
- **examples**: Visual examples showing transformations
- **implementation**: Code hints for different approaches
- **tags**: Searchable tags for categorization
- **relatedOps**: Other operations that work well with this one
- **restrictions**: Any limitations (e.g., "only works on 2D arrays")

## Naming Conventions

### Magical Naming Guide

Transform programming concepts into arcane terminology:

| Programming Term | Magical Name | Example |
|-----------------|--------------|---------|
| reverse | Spell of Reflection | ⌽ |
| transpose | Matrix Transmutation | ⍉ |
| rotate | Circular Incantation | ⌽⊖ |
| flatten | Planar Collapse | ,/ |
| reshape | Dimensional Weaving | ⍴ |
| first/head | Prima Extraction | ↑ |
| last | Ultima Selection | ↓ |
| zip | Thread Binding | ,⍥⊂ |
| chunk | Essence Grouping | ⊂∘↑ |

### File Naming

Files should be named: `{id}.json`

Examples:
- `reverse.json`
- `transpose.json`
- `spiral.json`

## Creating New Operations

1. Choose appropriate category directory
2. Create JSON file following the schema
3. Implement the operation in ArrayOperations.js using Ramda
4. Add visual effects in SpellEffects.js
5. Test with various array configurations

## APL Symbol Reference

Common APL symbols and their meanings:

- ⌽ (reverse/rotate)
- ⍉ (transpose)
- ⍴ (reshape)
- ↑ (take/first)
- ↓ (drop/last)
- ⊂ (enclose/partition)
- ⊃ (disclose/first)
- , (ravel/flatten)
- ⌿ (replicate)
- ⍀ (expand)
- ⊖ (rotate first axis)
- ⊕ (rotate last axis)
- ∪ (unique)
- ∩ (intersection)
- ⍋ (grade up/sort indices)
- ⍒ (grade down)

## Example Operations

See individual category directories for complete examples:
- basic/reverse.json - The foundational reflection spell
- selection/first.json - Extract the prime element
- weaving/zip.json - Interleave two arrays
- pattern/spiral.json - Create spiral traversal