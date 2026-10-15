# Shukrullo Kurbonov — Portfolio

A credible, recruiter-friendly portfolio with a refined Ubuntu terminal look. Uses only the facts from the brief; nothing invented.

## Pages
- **Home (/)** — hero (name, title, one-line description, "Explore Projects" + GitHub buttons), compact static terminal panel (`whoami`, `cat focus.txt`), featured banking project card, short previews of the other projects, and the optional interactive terminal.
- **Projects (/projects)** — banking backend shown large; ApriSoil medium; Flask E-Commerce as a smaller supporting card.
- **Project detail (/projects/:slug)** — sections shown only when facts exist: Purpose, Technologies, Reported features, Architecture (simple diagram of confirmed components only, e.g. API -> PostgreSQL / Redis, Docker Compose), Source link. Contribution, trade-offs, and verification sections stay hidden until you provide that content. ApriSoil notes the ML model is integrated, not built by you.
- **Experience (/experience)** — Flutter Developer, Brain Solutions MMC, Baku, June–July 2026, framed as client-server integration experience.
- **About (/about)** — Bukhara-based, Bukhara State University (exp. 2027), exchange at Baku Higher Oil School (Feb–Jul 2026) as part of education, languages.
- **Contact (/contact)** — GitHub link and working email link. No phone, no LinkedIn.

Navigation: "SK" initials left; Projects, Experience, About, Contact. Resume link hidden (no file yet). No live demos shown.

## Interactive terminal (optional)
Small input accepting only: help, about, projects, experience, contact, clear. Commands print short text and offer a link/navigate to the page. Unknown input prints "command not found — try help". Nothing is executed. Fully keyboard usable; regular nav always available.

## Visual direction
- Palette from brief: bg #17121D, surface #24182B, elevated #302338, orange #E95420 (small accents), text #F4EFF6 / #BCB2C2, green #8AE234 for occasional output.
- Ubuntu Sans for body, Ubuntu Mono for commands and labels.
- Generous spacing, thin borders, subtle fade-ins disabled under reduced motion. No typing animations or loading effects.

## Technical details
- All content in one central data file (profile, projects, experience, education); components read from it, optional fields omitted when empty.
- Separate route files per page, each with its own title/description/og tags.
- Colors as oklch tokens in styles.css; fonts via Google Fonts link in root head.
- Accessibility: semantic landmarks, visible focus rings, skip link, aria-live terminal output, mobile-friendly type.
- Small test for terminal command allowlist (only the six commands resolve).
