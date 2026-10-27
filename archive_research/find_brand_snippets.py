import json
import re

with open('bundle.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

# Let's inspect where actual application data starts in bundle.js
# Look for keywords like "Sabre", "Defence", "Gwalior", "Director", "Officers", "batch", "training", "SSB"
matches = [m.start() for m in re.finditer(r'Sabre|Officers Defence Academy|Gwalior|sodaedu', text, re.IGNORECASE)]
print(f"Found {len(matches)} occurrences of brand keywords in bundle.js")

for idx in matches[:10]:
    start = max(0, idx - 150)
    end = min(len(text), idx + 250)
    snippet = text[start:end]
    print(f"\n--- MATCH AT {idx} ---")
    print(snippet)
