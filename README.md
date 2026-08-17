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

- View menu dropdown (158px): checkmarked "as File list" / "as Icon grid", disabled Refresh
- Toolbar: disabled Back/Forward, divider, path field (mono, e.g. `C:\ned\projects\...`), list/icon view toggles
- File pane — List view: header row (Name/Type/Modified), row hover/selected states
- File pane — Icon view: grid layout, glyph + label
- Icon glyphs by type: folder, project (window glyph w/ category colour bar), document
- Category colours wired: Machine Learning `#8fd3c8`, General `#e0b13a`
- Status bar: "N object(s)" + modified date fields

### 6. Project windows (Overview / Write-up / Media)

- Tab bar (active/inactive states) + tab switching
- Overview tab: name, date/status line, screenshot placeholder, blurb, tag chips, Source/Live demo buttons
- Write-up tab: label + paragraphs
- Media tab: two-column striped placeholder grid
- Wire up real project content for todo-app, sentiment-classifier, digit-recogniser, rec-engine-notes

### 7. About Me window (General / Skills / Contact)

- General tab: portrait placeholder, name, role, bio, STACK chips, FACTS definition grid
- Skills tab: labelled progress bars (82/74/58/44%) + caveat paragraph
- Contact tab: definition grid (Email/GitHub/Location) + buttons
- OK / Cancel footer buttons (both close window)

### 8. Text viewer (readme.txt)

- White sheet layout, heading, paragraphs, "— end of file —" footer
- Opens from desktop icon and folder window's Help menu (Start menu entry wired in section 10)

### 9. Taskbar

- Static shell: 30px bar, bevel/shadow treatment
- Start button ("np" + 2×2 colour square) with pressed/open state (wired to actually open the menu in section 10)
- Per-window task buttons (icon chip + label), active = sunken + bold, driven by window focus/minimised state from section 4; clicking active minimises, clicking inactive/minimised restores + focuses
- Clock: sunken mono field, updates every 10s, 12h/24h

### 10. Start menu

- Panel shell: left rail gradient + vertical "ned pearson" label
- Search field (placeholder "find a project…") + separator
- Rows: Projects ▶, Recent ▶, About Me, Résumé.pdf, Contact…, Shut Down…
- Flyouts: Projects → categories → project list (hover-triggered, correct offsets)
- Recent → three most recently opened projects
- Search/filter: type-ahead filters by name/type/tag/status, "no matches" state
- Shut Down closes all open windows
- Wire Start button click to open/close this menu (updates the pressed/open state added in section 9)
- Wire readme.txt row to open the text viewer (built in section 8)

### 11. Desktop context menu

- Right-click panel (200px, clamped to viewport)
- Items: Open Projects, Open readme.txt, Cascade windows, Close all windows, Properties (→ About Me)
- Cascade/Close greyed out when nothing is open

### 12. Interactions & polish pass

- Global hover/pressed states match spec (beveled buttons, menu items, list rows)
- Menu-close behaviour: clicking desktop or outside closes start/context/View menus; menu surfaces stop mousedown propagation
- Keyboard accessibility pass (tab order, escape to close menus/windows) — decide scope beyond visual spec
- Cross-browser check (Chrome/Firefox/Safari) for bevel rendering, drag/resize smoothness

### 13. Responsive / mobile fallback

- Design and build a separate stacked/mobile presentation (spec explicitly calls out desktop-only design)
- Breakpoint detection to switch between desktop-window UI and mobile layout

### 14. Assets & content finalization

- Replace project screenshot placeholders (800×260) with real images
- Replace media grid placeholders (4× 640×420) with real images
- Replace portrait placeholder (420×510) with real photo
- Replace all placeholder bios, blurbs, write-ups, links, and dates with Ned's real content
- Real résumé PDF linked from Start menu

### 15. Deployment

- Choose hosting (Vercel/Netlify/GitHub Pages/etc.)
- Configure custom domain (nedpearson.dev)
- Production build check (fonts self-hosted, no dev-only warnings, bundle size sanity check)
- Basic SEO/meta tags, favicon, social preview image
