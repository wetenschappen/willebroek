# Completed Work — Make-over Sessions 1-4

## Overview

**Total activities:** 118 Vue 3 files  
**Current average score:** 6.3 / 8  
**Files at 8/8 (complete):** 53 (44.9%)  
**Files below 4/8:** 0 ✅

---

## Session 1-2: Foundation Work

### Full Rewrites (5 files)
These files were heavily compressed/minified (<200 lines) and required complete reconstruction with all 8 pedagogical elements:

- **LPD22_2_SlopeLinear.vue** — Richtingscoëfficiënt en lineaire functies
- **LPD08_2_SimilarityScale.vue** — Gelijkvormigheid en schaalfactor
- **LPD33_2_Discriminant.vue** — Discriminant en nulpunten
- **LPD12_AbsoluteValue.vue** — Absolute waarde
- **LPD31_SquareNumbers.vue** — Kwadraten en vierkantswortels

**Pattern:** Full rewrite from ~70-100 lines to ~600 lines with complete pedagogical structure.

### Systematic Color Sweep (118 files)
Applied consistent amber/slate palette across all activities:
- `amber-500` (#F97316) for primary actions
- `slate-*` for structure and borders
- `indigo-*` reserved for reflection sections
- `red-*` for error states
- `white` for canvas/visualization backgrounds

---

## Session 3: Targeted Upgrades

### Full Rewrites with Visual Preservation (5 files)
Files with unique visual elements (SVG animations, interactive canvases) that needed careful preservation:

- **LPD15_2_TrigCircle.vue** — Eenheidscirkel met animatie (70 → 554 lines)
- **LPD28_2_Hyperbola.vue** — Hyperbool met slider (188 → 550 lines)
- **LPD28_RadarTarget.vue** — Radar grid met dark theme (178 → 510 lines)
- **LPD28_TreasureMap.vue** — Schatkaart visueel (169 → 500 lines)
- **LPD27_UnfoldCube.vue** — Kubus uitvouwen animatie

**Pattern:** Preserved unique SVG/canvas visuals while adding all 8 pedagogical elements.

### Batch Script Repairs (8 files)
Python batch scripts damaged footer/sidebar structure in these files. Manually reconstructed:

- **LPD25_ParallelogramPuzzle.vue**
- **LPD25_TrapeziumClone.vue**
- **LPD26_OpticalIllusion.vue**
- **LPD27_FillPrism.vue**
- **LPD23_TranslationVector.vue**
- **LPD26_3DScanner.vue**
- **LPD24_CongruenceSwing.vue**
- **LPD24_TwinHunter.vue**

**Issue:** Missing `</div>` for sidebar wrapper caused build failures.

### Phase-Based File Upgrades (2 files)
Files with complex phase-based architecture were upgraded by adding pedagogical elements as aliases for existing phase flags:

- **LPD19_2_Inequalities.vue** — Ongelijkheden (preserved phase state machine)
- **LPD03_DataVisualization.vue** — Datavisualisatie (preserved phase state machine)

### Individual Upgrades (8 files)
Score 3/8 → 8/8 with targeted edits:

- **LPD_FunctionMachine.vue** — Functiemachine
- **LPD20_LineProperties.vue** — Lijn eigenschappen
- **LPD22_BisectorCompass.vue** — Deelhoek passer
- **LPD22_TriangleCompass.vue** — Driehoek passer
- **LPD23_PointSymmetry.vue** — Puntsymmetrie
- **LPD15_PowerOfPower.vue** — Machtsverheffen
- **LPD15_ProductRule.vue** — Productregel
- **LPD27_UnfoldCube.vue** — Kubus uitvouwen

---

## Session 4: Batch Element Addition

### checkReflection Batch (6 files)
Added keyword validation function for reflection answers:

```javascript
function checkReflection() {
  const ans = reflectionAnswer.value.toLowerCase()
  const conceptWords = ['concept', 'begrip', 'idee', 'principe']
  const reasonWords = ['omdat', 'want', 'doordat', 'aangezien']
  if ((conceptWords.some(w => ans.includes(w)) || ans.length > 15) && 
      reasonWords.some(w => ans.includes(w))) {
    reflectionDone.value = true
    showReflection.value = false
  } else {
    feedback.value = { type: 'info', text: 'Gebruik conceptwoorden en leg uit waarom.' }
  }
}
```

**Files:** LPD03_2_FunctionGrapher, LPD05_2_RealNumbers, LPD06_2_OrderingReals, LPD07_VennDragDrop, LPD08_NumberLine, LPD09_HundredGrid

### Bloom Labels Batch (5 files)
Added Bloom taxonomy level labels:

```javascript
const levelLabels = ['Toepassen', 'Analyseren', 'Evalueren']
const currentBloomLevel = computed(() => levelLabels[currentInternalLevel.value] || 'Toepassen')
```

**Files:** LPD25_TrapeziumClone, LPD27_UnfoldCube, LPD37_2_ChartSelection, LPD39_2_MisleadingStats, LPD40_2_ScatterCorrelation

### showWhy Batch (2 files)
Added "Waarom werkt dit?" explanation with transition to reflection:

```javascript
const showWhy = ref(false)
const whyText = ref('')
// On correct answer:
showWhy.value = true
whyText.value = 'Uitleg hier...'
// Button: "Naar reflectie" → showReflection = true; showWhy = false
```

**Files:** LPD25_2_GraphicalSolving, LPD27_2_SystemsAlgebraic

### Hint System Batch (2 files)
Added 3-level hint system with button:

```javascript
const hintLevel = ref(0)
const showHint = ref(false)
const hintCount = ref(0)
// Button: showHint ? (hintLevel < 2 ? hintLevel++ : null) : (showHint = true)
```

**Files:** LPD18_Diagonals, LPD26_2_SystemsGraphically

---

## Key Patterns Established

### 1. Props Pattern
```javascript
const props = defineProps({
  isOpen: Boolean,
  title: { type: String, default: 'Titel' },
  instruction: { type: String, default: 'Instructie' },
  currentStep: { type: Number, default: 1 },
  totalSteps: { type: Number, default: 1 },
  fullscreen: { type: Boolean, default: false }, // Always false!
  icon: { type: Object, default: () => PhIcon }
})
```

### 2. Emits Pattern
```javascript
const emit = defineEmits(['close', 'complete', 'update:currentStep'])
```

### 3. Reflection Flow
```
Correct answer → showWhy (explanation) → Button "Naar reflectie" → 
showReflection (question) → checkReflection (validation) → reflectionDone → 
Show next/complete button
```

### 4. Hint System
```javascript
// 3 levels, progressively more specific
const hints = [
  'Hint 1: Algemene aanwijzing',
  'Hint 2: Specifieker',
  'Hint 3: Laat laatste stap open (NOOIT exact antwoord geven)'
]
```

### 5. Error Analysis
```vue
<div v-if="!isCorrect && attemptCount > 0" class="mt-4 p-4 border border-red-200 bg-red-50 rounded-xl animate-fadeIn">
  <h4 class="flex items-center gap-2 text-sm font-bold text-red-800 mb-1">
    <PhWarningCircle weight="fill" class="w-4 h-4" />
    Let op!
  </h4>
  <p class="text-sm text-red-700">{{ errorDetected }}</p>
</div>
```

### 6. Bloom Labels in Template
```vue
<div class="text-xs text-slate-500 mb-2">
  Bloom-niveau: <span class="font-bold text-indigo-600">{{ currentBloomLevel }}</span>
</div>
```

---

## Critical Lessons Learned

### 1. Never Use Python Batch Scripts for Vue Template Edits
**Problem:** `end_idx2` logic matches wrong closing `</div>` and eats footer/sidebar sections.  
**Solution:** Manual targeted edits per file are safer.

### 2. Full Rewrites > Patching Compressed Code
**Problem:** Minified files (<200 lines) have poor structure for incremental edits.  
**Solution:** Complete rewrite to ~600 lines with proper formatting.

### 3. Div Balance is Critical
**Problem:** Missing `</div>` for sidebar wrapper breaks build.  
**Solution:** Always run `npm run build` after edits. Check div balance.

### 4. Phase-Based Files Need Alias Variables
**Problem:** Files with complex phase state machines can't be restructured easily.  
**Solution:** Add `showWhy`, `showReflection` as aliases for existing phase flags.

### 5. Hint 3 Must Leave Last Step Open
**Problem:** Giving exact answer defeats learning.  
**Solution:** Hint 3 provides structure but leaves final calculation blank.

### 6. Typography Consistency
**Problem:** Mixed font sizes and spacing across files.  
**Solution:** Standard sizes: `text-sm` for body, `text-xs` for hints/labels, `text-lg` for headings.

---

## Files Modified (Total: 67 unique files)

### Full Rewrites (10 files)
LPD22_2_SlopeLinear, LPD08_2_SimilarityScale, LPD33_2_Discriminant, LPD12_AbsoluteValue, LPD31_SquareNumbers, LPD15_2_TrigCircle, LPD28_2_Hyperbola, LPD28_RadarTarget, LPD28_TreasureMap, LPD27_UnfoldCube

### Batch Script Repairs (8 files)
LPD25_ParallelogramPuzzle, LPD25_TrapeziumClone, LPD26_OpticalIllusion, LPD27_FillPrism, LPD23_TranslationVector, LPD26_3DScanner, LPD24_CongruenceSwing, LPD24_TwinHunter

### Phase-Based Upgrades (2 files)
LPD19_2_Inequalities, LPD03_DataVisualization

### Individual Upgrades (8 files)
LPD_FunctionMachine, LPD20_LineProperties, LPD22_BisectorCompass, LPD22_TriangleCompass, LPD23_PointSymmetry, LPD15_PowerOfPower, LPD15_ProductRule, LPD27_UnfoldCube

### Session 4 Batches (15 files)
checkReflection: LPD03_2_FunctionGrapher, LPD05_2_RealNumbers, LPD06_2_OrderingReals, LPD07_VennDragDrop, LPD08_NumberLine, LPD09_HundredGrid  
Bloom: LPD25_TrapeziumClone, LPD27_UnfoldCube, LPD37_2_ChartSelection, LPD39_2_MisleadingStats, LPD40_2_ScatterCorrelation  
showWhy: LPD25_2_GraphicalSolving, LPD27_2_SystemsAlgebraic  
hint: LPD18_Diagonals, LPD26_2_SystemsGraphically

### Color Sweep (118 files)
All files received amber/slate palette updates.
