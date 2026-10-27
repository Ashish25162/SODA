import os
import re
import json

def decompile_text_from_file(path):
    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
        text = f.read()

    # Extract all JSX text children and string literals
    # Look for JSX string children: children:`...` or children:"..."
    children_matches = re.findall(r'children:\s*[`"\']([^`"\']+)[\'"`]', text)
    # Look for title, heading, desc, label, subtitle
    field_matches = re.findall(r'(?:title|heading|subtitle|desc|description|role|name|label|badge|duration|eligibility|timing|batch|fee|answer|question):\s*[`"\']([^`"\']+)[\'"`]', text)
    
    # Look for arrays of objects
    # Often structured as [{...}, {...}]
    arrays = re.findall(r'\[\s*\{[^{}]+\}(?:\s*,\s*\{[^{}]+\})*\s*\]', text)

    return {
        'children_texts': [t for t in children_matches if len(t.strip()) > 1],
        'field_texts': [f for f in field_matches if len(f.strip()) > 1],
        'raw_arrays': arrays
    }

files = {
    'Home & General': 'bundle.js',
    'Contact': 'site_raw_assets/ContactPage-BGCbhP5b.js',
    'Calculator': 'site_raw_assets/CalculatorPage-B5e54LHc.js',
    'NDA': 'site_raw_assets/NDAPage-BSXyjXri.js',
    'CDS': 'site_raw_assets/CDSPage-CWyDbInZ.js',
    'AFCAT': 'site_raw_assets/AFCATPage-QG7fB6mY.js',
    'SSB': 'site_raw_assets/SSBPage-B4UAM2ns.js',
    'CAPF': 'site_raw_assets/CAPFPage-83cORDqA.js',
    'Foundation': 'site_raw_assets/FoundationPage-_gCsYQrX.js',
    'Current Affairs': 'site_raw_assets/CurrentAffairs-Uspvyo4y.js',
    'Blog List': 'site_raw_assets/BlogList-Dw7xZYq-.js',
    'Blog Post': 'site_raw_assets/BlogPost-DuKpRt8-.js',
    'Admin Blog': 'site_raw_assets/AdminBlog-dqI601PV.js',
    'Privacy Policy': 'site_raw_assets/PrivacyPolicy-Dt8kkaO1.js',
    'Terms & Conditions': 'site_raw_assets/TermsAndConditions-D5Az5JUy.js',
    'Refund Policy': 'site_raw_assets/RefundPolicy-CcBXx8Zh.js',
    'Disclaimer': 'site_raw_assets/Disclaimer-CpQtSePm.js'
}

all_pages_data = {}
for name, p in files.items():
    if os.path.exists(p):
        all_pages_data[name] = decompile_text_from_file(p)

with open('all_pages_raw_extracted.json', 'w', encoding='utf-8') as f:
    json.dump(all_pages_data, f, indent=2)

print("Saved all_pages_raw_extracted.json")
