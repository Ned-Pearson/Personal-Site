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

- Mobile taskbar: 74×38 np button + flexible breadcrumb button (sunken+bold when a window is open, raised at the desktop root)
- Desktop (root) screen: three-column icon grid, scaled-up glyphs (folder 52×40, document 37×44), tap-to-open, `:active`-only pressed state (no hover, no selection)
- Window screen shell: single full-screen window (6px margin), title bar with only a close (✕) button — no minimise/maximise, `sheetUp` entrance animation
- Mobile toolbar: Back button, RTL path field, single view-toggle button (shows the glyph of the view you'd switch _to_); no View menu, no menu bar at all
- Folder contents — list view: metadata-line rows (`min-height:48px`), trailing chevron, pressed state; status bar drops the Modified column (moved into each row's metadata line)
- Folder contents — grid view: two-column layout, scaled-up glyphs
- Project/About window mobile adaptations: full-width tabs, tightened sheet padding, stacked full-width buttons, single-column media; About General/Skills/Contact layouts collapse to stacked/full-width (OK/Cancel footer dropped — the title-bar ✕ is the only dismiss)
- Text viewer mobile: adjusted padding/heading size
- Navigation model: tap (not double-tap) opens; Back walks up the tree then falls through to the desktop; breadcrumb button returns to the desktop
- Go-to tray: bottom-sheet replacement for the Start menu — flat list of every destination (no nested flyouts, since hover doesn't exist), `trayUp` entrance animation, opened via the np button
- Mobile animation: `sheetUp`/`trayUp` keyframes, no exit animations; desktop's window/menu keyframes (`winOpen`/`winClose`/`winMin`/`winRestore`/`menuOpen`) are not used on mobile
- Touch & accessibility: ≥44px hit targets throughout, `:active`-only feedback (no hover/focus outline), no custom cursor on touch, `user-select:none` on chrome (body copy stays selectable)
- Mobile state model (`{ node, view, tab, tray, clock }`) — confirm `NODES`/`PROJECTS`/`DOCS` are consumed from the existing shared data layer, not duplicated between presentations
- Mobile asset sizing: screenshot 132px tall, media 128px tall, portrait 86×104 (same source images, different display boxes)

### 15. Assets & content finalization

- Replace project screenshot placeholders (800×260) with real images
- Replace media grid placeholders (4× 640×420) with real images
- Replace portrait placeholder (420×510) with real photo
- Replace all placeholder bios, blurbs, write-ups, links, and dates with Ned's real content
- Real résumé PDF linked from Start menu

### 16. Keyboard accessibility

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

### 17. Deployment

- Choose hosting (Vercel/Netlify/GitHub Pages/etc.)
- Configure custom domain (nedpearson.dev)
- Production build check (fonts self-hosted, no dev-only warnings, bundle size sanity check)
- Basic SEO/meta tags, favicon, social preview image
