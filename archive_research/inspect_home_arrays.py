import re

with open('home_and_core_bundle.txt', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

# Let's extract any array of objects or text lists
print("=== ALL ARRAYS IN HOME BUNDLE ===")
# Find constructs like [...], or arrays with objects
arrays = re.findall(r'\[\{.*?\}\]', text, re.DOTALL)
for i, arr in enumerate(arrays):
    print(f"\n--- Array {i} ---")
    print(arr[:500])

print("\n=== FETCH URLS ===")
urls = re.findall(r'fetch\(([^)]+)\)', text)
print(urls)
