# nedpearson.dev

A personal portfolio site presented as a fictional mid-90s desktop operating system — icons on a desktop, draggable/resizable windows, a taskbar with a start menu, and a folder-based project browser.

Built with React + Vite + TypeScript.

## Development

```bash
npm install
npm run dev
```

## To-do

### 1. Foundations

- Done

### 2. Data layer

- Done

### 3. Desktop (base page)

- Done

### 4. Window system (core engine)

- Done

### 5. Folder windows (Projects / General / Machine Learning)

- Done

### 6. Project windows (Overview / Write-up / Media)

- Done

### 7. About Me window (General / Skills / Contact)

- Done

### 8. Text viewer (readme.txt)

- Done

### 9. Taskbar

- Done

### 10. Start menu

- Done

### 11. Desktop context menu

- Done

### 12. Animation

- Done

### 13. Interactions & polish pass

- Done

### 14. Responsive / mobile fallback

- Done

### 15. Assets & content finalization

- Replace portrait placeholder (420×510) with real photo

### 16. Media viewer

- Mobile: nav bar (Media only, hidden for the single Overview shot) — full 3D-bevelled "‹ Prev" / "Next ›" buttons (64×44) flanking a flexible sunken mono counter field
- Mobile: dismiss via ✕ only — no Esc, no swipe-to-dismiss, no backdrop-tap
- Mobile: reuse the existing 140ms `sheetUp` animation for opening; no exit animation
- Derive the displayed label/title/counter from `PROJECTS` at render time rather than storing them — only the index needs to live in state
- Real screenshots already used for thumbnails double as the lightbox image (no separate hi-res asset needed) unless sharper detail is wanted at the larger display size (~400px tall on desktop, remaining screen height on mobile)

### 17. Keyboard accessibility

- No control currently has any keyboard support (every interactive element is a plain `<div onClick>`, no `tabIndex` anywhere) — this section is a full retrofit, not a light pass, and is deliberately sequenced after everything else
- Focus-visible style foundation: a theme-consistent focus ring (new design token) — Plan.md doesn't spec one, so this needs inventing
- Buttons: `tabIndex` + Enter/Space activation + focus-visible on window title-bar buttons, toolbar buttons, taskbar buttons, and dialog buttons (OK/Cancel, Source/Live demo, view toggles)
- Desktop icons: `tabIndex`, Enter opens, Space selects, focus-visible outline distinct from the existing hover dotted-outline
- Menus (Start menu + flyouts, desktop context menu, View dropdown): arrow-key navigation between items, focus trapped while open, focus returns to the trigger element on close
- Tabs (Project/About window `TabBar`): WAI-ARIA tablist pattern — roving tabindex, ←/→ to move+activate, Home/End
- Folder window rows/grid cells: arrow-key selection (2D navigation in grid view), Enter to open
- Window-level tab order: Tab stays within the focused window; background windows excluded via `inert` or manual tabIndex management — the trickiest part, since the current z-order model doesn't use native DOM focus at all
- Escape closes the focused window (Escape-closes-menus is already covered by section 13's menu-close behaviour)
- Accessible names (`aria-label`) for icon-only controls — minimise/maximise glyphs currently have no text alternative; close's "✕" is borderline

### 18. Deployment

- Choose hosting (Vercel/Netlify/GitHub Pages/etc.)
- Configure custom domain (nedpearson.dev)
- Production build check (fonts self-hosted, no dev-only warnings, bundle size sanity check)
- Basic SEO/meta tags, favicon, social preview image
