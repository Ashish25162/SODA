import re
import json

with open('bundle.js', 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

print('Length of bundle:', len(content))

# Look for routes or path definitions
routes = set(re.findall(r'path:\s*["\']([^"\']+)["\']', content))
print('Routes (path:):', routes)

# Look for react router Link or Route elements or strings like "/about", "/courses", etc.
url_paths = set(re.findall(r'["\'](/[\w\-/]+)["\']', content))
relevant_paths = {p for p in url_paths if any(k in p for k in ['course', 'about', 'contact', 'gallery', 'blog', 'facility', 'ssb', 'nda', 'cds', 'afcat', 'team', 'admission', 'fee'])}
print('Relevant paths:', relevant_paths)

# Look for phone numbers / emails / links
emails = set(re.findall(r'[\w\.-]+@[\w\.-]+\.\w+', content))
print('Emails:', emails)

phones = set(re.findall(r'(?:\+91[\s-]?)?[6789]\d{9}', content))
print('Phones:', phones)

# Look for image/asset references
assets = set(re.findall(r'["\'](/assets/[^"\']+\.(?:png|jpe?g|webp|svg|ico))["\']', content))
print('Image assets:', len(assets), list(assets)[:15])

# Find strings or objects with titles, headings, courses, testimonials
with open('bundle_strings.txt', 'w', encoding='utf-8') as out:
    # Extract long readable strings (likely UI copy)
    matches = re.findall(r'["\']([A-Z0-9][^"\']{20,})["\']', content)
    for m in matches:
        if not re.search(r'[{}<>\$]|function|export|import|webpack|node_modules', m):
            out.write(m + '\n')

print('Wrote extracted UI strings to bundle_strings.txt')
