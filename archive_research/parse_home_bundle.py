import re
import json

with open('home_and_core_bundle.txt', 'r', encoding='utf-8') as f:
    text = f.read()

# Find all text strings
strings = re.findall(r'`([^`]{3,})`|"([^"]{3,})"', text)
clean_strings = []
for s1, s2 in strings:
    s = s1 or s2
    s = s.strip()
    if len(s) > 3 and not any(k in s for k in ['div', 'span', 'class', 'style', 'color', 'http', 'px', 'calc']):
        clean_strings.append(s)

print("Unique strings count:", len(set(clean_strings)))
for s in clean_strings:
    if len(s.split()) >= 2:
        print(">>", s)
