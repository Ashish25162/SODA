import re

with open('bundle.css', 'r', encoding='utf-8', errors='ignore') as f:
    css = f.read()

# Extract CSS root variables
root_vars = re.findall(r'(--[\w-]+)\s*:\s*([^;]+);', css)
print("CSS Variables:")
for var, val in root_vars:
    print(f"  {var}: {val}")

# Extract font-family
fonts = re.findall(r'font-family:\s*([^;]+);', css)
print("\nFonts:", set(fonts))

# Extract media queries / breakpoints
breakpoints = set(re.findall(r'@media[^{]+', css))
print("\nMedia queries count:", len(breakpoints))
for b in list(breakpoints)[:5]:
    print(" ", b.strip())
