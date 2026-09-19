import os, glob

elements = ['showWorkedExample', 'showPrediction', 'showWhy', 'showReflection', 'hint', 'error', 'Bloom', 'checkReflection']

res = []
for f in glob.glob('w-activities/*.vue'):
    filename = os.path.basename(f)
    if filename in ["MathText.vue", "SuccessCelebration.vue"]:
        continue

    with open(f, 'r') as file:
        txt = file.read()
    score = 0
    missing = []
    
    # Check elements
    if 'showWorkedExample' in txt: score += 1
    else: missing.append('showWorkedExample')
        
    if 'showPrediction' in txt: score += 1
    else: missing.append('showPrediction')
        
    if 'showWhy' in txt: score += 1
    else: missing.append('showWhy')
        
    if 'showReflection' in txt: score += 1
    else: missing.append('showReflection')
        
    if 'hint' in txt.lower(): score += 1
    else: missing.append('hint')
        
    if 'error' in txt.lower() or 'Let op' in txt: score += 1
    else: missing.append('error')
        
    if 'Analyseren' in txt or 'Toepassen' in txt or 'Evalueren' in txt: score += 1
    else: missing.append('Bloom')
        
    if 'checkReflection' in txt: score += 1
    else: missing.append('checkReflection')
        
    res.append((score, os.path.basename(f), missing))

res.sort(key=lambda x: (x[0], x[1]))
for score, name, missing in res:
    if score < 8:
        print(f"{name} missing: {missing}")

print(f"Total 8/8: {sum(1 for x in res if x[0] == 8)} / {len(res)}")
