import re

with open('bundle.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

# Let's find sections around line 245000 - 489000
# We can search for the main page sections
sections = [
    ('Navbar', 'navbar-container'),
    ('Hero Slider', 'hero-slider|hero-content|Forge Your Path'),
    ('Why Choose SODA / Features', 'why-us|features|why-choose'),
    ('Courses Section', 'courses-section|Coaching Programs'),
    ('Stats Section', 'stats|counter|Selections|Success Rate'),
    ('About Section', 'about-section|about-content|Guided by Experience'),
    ('Faculty / Mentors', 'faculty|mentor|team'),
    ('Facilities / Ground / Hostel', 'facility|hostel|obstacle|ground'),
    ('Testimonials', 'testimonials|testimonial-card'),
    ('CTA / Admission Grabber', 'grabber|admission|cta'),
    ('Footer', 'footer-content|footer-logo|footer-links'),
]

for name, pattern in sections:
    m = re.search(pattern, text, re.IGNORECASE)
    if m:
        idx = m.start()
        start = max(0, idx - 100)
        end = min(len(text), idx + 800)
        print(f"\n==================== {name} (around index {idx}) ====================")
        snippet = text[start:end]
        # Clean up some JSX clutter for readability
        snippet_clean = re.sub(r'\([0-9]+,[a-zA-Z0-9_\.]+\)\(`[a-zA-Z0-9]+`,', ' ', snippet)
        print(snippet[:600])
    else:
        print(f"\n==================== {name}: NOT FOUND ====================")
