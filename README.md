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

### 12. Animation

- Global keyframes (declared once): `winOpen`, `winClose`, `winMin`, `winRestore`, `menuOpen`
- Window `phase` field (`'opening' | 'closing' | 'minimizing' | 'restoring' | null`) added to window state, mapped to animation/duration/easing/transform-origin per phase (`animation-fill-mode: both`)
- Open/close sequencing: open plays immediately on push to state; close sets `phase:'closing'` then removes the window after 140ms (don't unmount immediately, or there's nothing to animate)
- Minimise/restore sequencing: minimise clears `focused` immediately and flies out over 180ms before setting `min:true`; restore clears `min` immediately and flies in over 190ms
- Genie origin: minimise/restore scale toward the window's own taskbar button position (computed from button index/position, or measured via `getBoundingClientRect()`) rather than screen centre
- Drag/resize interrupt: starting a drag or resize clears any active `phase` first, so a half-finished animation can't fight the pointer transform
- Menu/popover open animation (`menuOpen`, no exit animation): View dropdown + desktop context menu (90ms, `top left`), Start menu (110ms, `bottom left`), Projects/Recent and category flyouts (90ms, `bottom left`)
- Confirm NOT animated (instant, plain CSS state changes): maximise/restore-down, focus changes, view switching, tab changes, hover/press
- `animations` toggle (default true) disables all motion — animation resolves to `none` and close/minimise timers are skipped so state changes apply synchronously; wire to `prefers-reduced-motion: reduce` too

### 13. Interactions & polish pass

- Global hover/pressed states match spec (beveled buttons, menu items, list rows)
- Menu-close behaviour: clicking desktop or outside closes start/context/View menus; menu surfaces stop mousedown propagation
- Keyboard accessibility pass (tab order, escape to close menus/windows) — decide scope beyond visual spec
- Cross-browser check (Chrome/Firefox/Safari) for bevel rendering, drag/resize smoothness

### 14. Responsive / mobile fallback

- Design and build a separate stacked/mobile presentation 
- Breakpoint detection to switch between desktop-window UI and mobile layout

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
