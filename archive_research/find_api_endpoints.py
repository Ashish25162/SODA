import re

with open('bundle.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

d_matches = re.findall(r'[A-Za-z0-9_]+\s*=\s*[`"\']https?://[^`"\']+[`"\']', text)
for m in d_matches:
    print("Found endpoint/URL:", m)

# Also check for forms or backend in all js files
import glob
for fpath in glob.glob('site_raw_assets/*.js'):
    with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
        t = f.read()
    sub_matches = re.findall(r'https?://(?:script\.google|api\.|firestore|firebase|formspree|web3forms)[^\s`"\']+', t)
    for sm in sub_matches:
        print(f"In {fpath}: {sm}")
