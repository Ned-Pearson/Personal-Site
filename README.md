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

- Menu-close behaviour: clicking desktop or outside closes start/context/View menus; menu surfaces stop mousedown propagation
- Keyboard accessibility pass (tab order, escape to close menus/windows) — decide scope beyond visual spec
- Cross-browser check (Chrome/Firefox/Safari) for bevel rendering, drag/resize smoothness

### 14. Responsive / mobile fallback

- Breakpoint: below 768px, render the mobile presentation instead of the desktop one entirely — a separate presentation, not a scaled-down window manager (reference frame 390×800; no drag/resize/stacking/multi-window)
- Mobile layout shell: three fixed bands — system tray (30px), scrolling content, taskbar (52px)
- System tray: "np" mark + 2×2 colour square (5px cells); clock (10.5px mono), 4-bar signal glyph, 17×9 battery outline at 70% fill
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

### 16. Deployment

- Choose hosting (Vercel/Netlify/GitHub Pages/etc.)
- Configure custom domain (nedpearson.dev)
- Production build check (fonts self-hosted, no dev-only warnings, bundle size sanity check)
- Basic SEO/meta tags, favicon, social preview image
