import os
import re
import json

files = ['bundle.js'] + [os.path.join('site_raw_assets', f) for f in os.listdir('site_raw_assets') if f.endswith('.js')]

def extract_jsx_components(code):
    # Find readable blocks of text or data arrays
    return {
        'headers': re.findall(r'children:\s*[`"\']([^`"\']{3,60})[`"\']', code),
        'paragraphs': re.findall(r'children:\s*[`"\']([^`"\']{61,500})[`"\']', code),
    }

results = {}

for fpath in files:
    name = os.path.basename(fpath)
    with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    # Extract links
    links = re.findall(r'to:\s*[`"\']([^`"\']+)[\'"`]|href:\s*[`"\']([^`"\']+)[\'"`]', content)
    clean_links = set([l[0] or l[1] for l in links if (l[0] or l[1]) and not (l[0] or l[1]).startswith('#')])

    # Extract all text objects/arrays in page
    # E.g., courses, features, syllabus, testimonials
    objects = re.findall(r'\{[^{}]*(?:title|heading|name|role|desc|description|text|price|duration|eligibility|features|syllabus)[^{}]*\}', content)

    results[name] = {
        'length': len(content),
        'links': list(clean_links),
        'sample_objects': objects[:15],
    }

print("Scan complete. Writing summary...")
with open('structure_summary.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, indent=2)

print("Saved structure_summary.json")
