# Roadmap — Remaining Work for Complete Make-over

## Goal: All 118 activities at 8/8

**Current state:** 53 files at 8/8, 65 files need work  
**Estimated total elements to add:** 143 elements across 65 files

---

## Priority 1: Quick Wins (8 files → 8/8)

**Effort:** Low (1 element per file)  
**Files:** 8 files at 7/8  
**Missing element:** All need **error** ("Let op!" foutanalyse)

### Batch Strategy
All 8 files have `attemptCount` and error feedback logic already. Just need to add the template section:

```vue
<div v-if="!isCorrect && attemptCount > 0" class="mt-4 p-4 border border-red-200 bg-red-50 rounded-xl animate-fadeIn">
  <h4 class="flex items-center gap-2 text-sm font-bold text-red-800 mb-1">
    <PhWarningCircle weight="fill" class="w-4 h-4" />
    Let op!
  </h4>
  <p class="text-sm text-red-700">{{ errorDetected }}</p>
</div>
```

**Files to update:**
1. LPD04_2_LogicCounterexample.vue
2. LPD06_Counterexample.vue
3. LPD06_LogicRain.vue
4. LPD22_2_SlopeLinear.vue
5. LPD32_PerfectSquare.vue
6. LPD36_2_TruthTables.vue
7. LPD_B1_Contradiction.vue
8. LPD_FunctionMachine.vue

**After completion:** 61 files at 8/8 (51.7%)

---

## Priority 2: Two-Element Upgrades (24 files → 8/8)

**Effort:** Medium (2 elements per file)  
**Files:** 24 files at 6/8

### Pattern A: showReflection + checkReflection (6 files)
These files have basic reflection but need keyword validation.

**Files:**
- LPD04_DigitalRuler.vue
- LPD04_Protractor.vue
- LPD05_AreaConversion.vue
- LPD09_MatchingFractions.vue
- LPD18_ParallelAngles.vue (also needs error)
- LPD19_QuadHierarchy.vue (also needs error)
- LPD19_TriangleGrid.vue (also needs error)

**Action:**
1. Add `reflectionDone` ref
2. Replace simple toggle with `checkReflection()` function
3. Update template to show reflection only after why-explanation

### Pattern B: showWhy + hint (5 files)
These files need why-explanation and 3-level hint system.

**Files:**
- LPD08_BalanceSymbols.vue
- LPD18_2_LinearEqBalance.vue
- LPD33_EquationBalance.vue
- LPD33_ReverseMachine.vue

**Action:**
1. Add `showWhy`, `whyText` refs
2. Add `hintLevel`, `showHint`, `hintCount` refs
3. Add hint button to footer
4. Add why-explanation div with "Naar reflectie" button

### Pattern C: showWorkedExample + checkReflection (7 files)
These files need worked example before interaction and reflection validation.

**Files:**
- LPD09_2_SimilarityCriteria.vue
- LPD15_PowerOfPower.vue
- LPD29_2_QuadraticGraph.vue
- LPD30_2_QuadraticFormula.vue
- LPD31_2_QuadInequalitiesGraph.vue
- LPD32_2_QuadInequalitiesAlg.vue

**Action:**
1. Add `showWorkedExample` ref (set to true initially)
2. Add worked example div in template (before interaction)
3. Add `checkReflection()` function
4. Update reflection flow

### Pattern D: Bloom + checkReflection (5 files)
These files need Bloom labels and reflection validation.

**Files:**
- LPD10_2_PythagorasVisual.vue
- LPD11_BalloonMath.vue
- LPD12_2_SpatialGeometry.vue
- LPD21_2_FunctionMachine.vue
- LPD21_CityMap.vue

**Action:**
1. Add `levelLabels` array and `currentBloomLevel` computed
2. Add Bloom label in template
3. Add `checkReflection()` function

### Pattern E: error + checkReflection (1 file)
- LPD07_SetSymbols.vue

**Action:** Add error section + checkReflection

### Pattern F: hint + error (1 file)
- LPD20_2_FormulaManipulation.vue

**Action:** Add hint system + error section

**After completion:** 85 files at 8/8 (72.0%)

---

## Priority 3: Three-Element Upgrades (25 files → 8/8)

**Effort:** High (3 elements per file)  
**Files:** 25 files at 5/8

### Pattern A: showWorkedExample + Bloom + checkReflection (12 files)
Most common pattern. Files need all three foundational elements.

**Files:**
- LPD01_2_ParabolaThrow.vue
- LPD02_2_FarmerFence.vue
- LPD07_2_CalculatingReals.vue
- LPD12_Distributive.vue
- LPD13_ReversePercentage.vue
- LPD14_NegativeExponent.vue
- LPD17_EstimationCheck.vue
- LPD17_RoundingHill.vue
- LPD29_VariableBox.vue
- LPD30_FormulaMachine.vue
- LPD30_PlugAndPlay.vue
- LPD31_TablePattern.vue

**Action:**
1. Add `showWorkedExample` ref and worked example div
2. Add `levelLabels` and Bloom computed
3. Add `checkReflection()` function

### Pattern B: hint + Bloom + checkReflection (8 files)
Files need hint system, Bloom labels, and reflection validation.

**Files:**
- LPD13_2_VectorDrawing.vue
- LPD14_2_VectorCalculation.vue
- LPD17_2_SineCosineRule.vue
- LPD35_2_CountingVenn.vue
- LPD37_RobotDebug.vue
- LPD37_SieveAlgorithm.vue
- LPD_B6_PolynomialDivision.vue
- LPD_K2_GraphModel.vue
- LPD_K3_EulerPath.vue

**Action:**
1. Add hint system (hintLevel, showHint, hintCount)
2. Add Bloom labels
3. Add checkReflection

### Pattern C: showWhy + hint + checkReflection (1 file)
- LPD15_ProductRule.vue

**Action:** Add why-explanation, hint system, checkReflection

### Pattern D: showWorkedExample + hint + checkReflection (2 files)
- LPD_B3_LineEquations.vue
- LPD_B4_RelativePositions.vue

**Action:** Add worked example, hint system, checkReflection

### Pattern E: prediction + showWhy + hint (1 file)
- LPD34_2_QuadInequalitiesAlg.vue

**Action:** Add prediction gate, why-explanation, hint system

**After completion:** 110 files at 8/8 (93.2%)

---

## Priority 4: Four-Element Upgrades (8 files → 8/8)

**Effort:** Very High (4 elements per file)  
**Files:** 8 files at 4/8

### Pattern A: showWorkedExample + showWhy + hint + checkReflection (3 files)
- LPD16_2_TrigFormulas.vue
- LPD_B2_DotProduct.vue
- LPD_K1_CircleProperties.vue

**Action:**
1. Add worked example
2. Add why-explanation
3. Add hint system
4. Add checkReflection

### Pattern B: showWorkedExample + error + Bloom + checkReflection (2 files)
- LPD03_DynamicGeometry.vue
- LPD29_UnknownBalance.vue

**Action:**
1. Add worked example
2. Add error section
3. Add Bloom labels
4. Add checkReflection

### Pattern C: showWorkedExample + showReflection + hint + checkReflection (1 file)
- LPD16_EqualSign.vue

**Action:**
1. Add worked example
2. Add reflection section
3. Add hint system
4. Add checkReflection

### Pattern D: showWhy + hint + Bloom + checkReflection (1 file)
- LPD20_BalanceTriangle.vue

**Action:**
1. Add why-explanation
2. Add hint system
3. Add Bloom labels
4. Add checkReflection

### Pattern E: showWhy + showReflection + Bloom + checkReflection (1 file)
- LPD21_SymmetryScanner.vue

**Action:**
1. Add why-explanation
2. Add reflection section
3. Add Bloom labels
4. Add checkReflection

**After completion:** 118 files at 8/8 (100%) ✅

---

## Recommended Execution Order

### Session 5: Priority 1 (8 files)
**Goal:** 61 files at 8/8  
**Time:** ~1-2 hours  
**Method:** Manual targeted edits per file (batch script too risky)

### Session 6: Priority 2 Patterns A-C (18 files)
**Goal:** 79 files at 8/8  
**Time:** ~3-4 hours  
**Method:** Batch by pattern, manual edits

### Session 7: Priority 2 Patterns D-F + Priority 3 Pattern A (19 files)
**Goal:** 98 files at 8/8  
**Time:** ~4-5 hours  
**Method:** Batch by pattern, manual edits

### Session 8: Priority 3 Patterns B-E + Priority 4 (16 files)
**Goal:** 118 files at 8/8  
**Time:** ~4-5 hours  
**Method:** Manual targeted edits (complex files)

**Total estimated sessions:** 4 more sessions  
**Total estimated time:** 12-16 hours

---

## Batch Opportunities

### Most Common Missing Elements (across all 65 incomplete files)

| Element | Count | Files |
|---------|-------|-------|
| checkReflection | 57 | Most 5/8 and 6/8 files |
| Bloom | 41 | Most 5/8 files |
| showWorkedExample | 33 | Most 5/8 files |
| hint | 28 | Most 5/8 files |
| error | 16 | All 7/8 + some 6/8 files |
| showWhy | 12 | Some 6/8 files |
| showReflection | 8 | Some 6/8 files |
| prediction | 1 | LPD34_2_QuadInequalitiesAlg |

### Best Batch Strategies

1. **checkReflection batch** (57 files) — Add keyword validation function to all files with basic reflection
2. **Bloom batch** (41 files) — Add levelLabels and computed to all files
3. **showWorkedExample batch** (33 files) — Add worked example div to all files
4. **hint batch** (28 files) — Add 3-level hint system to all files
5. **error batch** (16 files) — Add "Let op!" section to all files
6. **showWhy batch** (12 files) — Add why-explanation to all files
7. **showReflection batch** (8 files) — Add reflection section to all files
8. **prediction batch** (1 file) — Add prediction gate to LPD34_2_QuadInequalitiesAlg

**Note:** Batches should be done manually per file to avoid template corruption.

---

## Critical Reminders

### DO:
- ✅ Run `npm run build` after every edit
- ✅ Use manual targeted edits (not batch scripts)
- ✅ Follow established patterns from COMPLETED_WORK.md
- ✅ Test reflection flow: why → reflection → checkReflection → done
- ✅ Ensure Hint 3 leaves last step open (never give exact answer)

### DON'T:
- ❌ Use Python batch scripts for Vue template edits
- ❌ Patch compressed/minified files (rewrite instead)
- ❌ Forget to add `reflectionDone` ref when using checkReflection
- ❌ Give exact answer in Hint 3
- ❌ Skip div balance check after edits

---

## Success Criteria

**Make-over complete when:**
- ✅ All 118 files at 8/8
- ✅ All files have consistent amber/slate palette
- ✅ All files have proper typography (text-sm, text-xs, text-lg)
- ✅ All files pass `npm run build` without errors
- ✅ All files follow established patterns
- ✅ Average score = 8.0 / 8
