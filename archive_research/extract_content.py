import re
import json
import glob
import os

all_files = ['bundle.js'] + glob.glob('site_raw_assets/*.js')

extracted = {}

for filepath in all_files:
    fname = os.path.basename(filepath)
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        text = f.read()
    
    # Extract backtick strings, single quote strings, double quote strings
    # Match strings of reasonable length (>= 15 chars) that look like English text
    strings = re.findall(r'[`"\']([A-Za-z0-9][^`"\']{14,})[`"\']', text)
    # Filter out code-like strings
    clean_strings = []
    for s in strings:
        if any(c in s for c in ['{', '}', ';', '()', '=>', 'function', 'export ', 'import ']):
            continue
        if re.search(r'\b(Academy|SSB|NDA|CDS|AFCAT|CAPF|Gwalior|Officer|Defence|Interview|Training|Course|Batch|Faculty|Contact|About|Student|Physical|Medical|Hostel|Fee|Guidance|Selection|Director|Bharadwaj|Join|Registration|Syllabus|Eligibility|Exam)\b', s, re.IGNORECASE):
            clean_strings.append(s)
        elif len(s.split()) >= 3: # at least 3 words
            clean_strings.append(s)
            
    extracted[fname] = list(dict.fromkeys(clean_strings))

with open('extracted_website_content.json', 'w', encoding='utf-8') as f:
    json.dump(extracted, f, indent=2, ensure_ascii=False)

print("Extracted strings from all files. Stats:")
for k, v in extracted.items():
    if len(v) > 0:
        print(f"  {k}: {len(v)} strings")
