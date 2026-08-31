import { useEffect, useRef, type KeyboardEvent } from 'react'
import type { WindowKind } from './useWindows'
import { focusAdjacentMenuItem, focusFirstMenuItem } from '../../utils/menuNavigation'
import styles from './StartMenu.module.css'

export interface FlyoutItem {
  key: string
  label: string
  iconColor: string
  arrow: string
  kind: WindowKind
}

interface StartMenuProps {
  query: string
  onQueryChange: (value: string) => void
  hoveredRow: string | null
  onHoverRow: (key: string | null) => void
  hoverCat: string | null
  onHoverCat: (key: string | null) => void
  projectFlyoutItems: FlyoutItem[]
  subFlyoutItems: FlyoutItem[]
  recentFlyoutItems: FlyoutItem[]
  searchRows: FlyoutItem[]
  resumeUrl: string
  onOpenNode: (id: string, kind: WindowKind) => void
  onShutDown: () => void
  /** Escape-driven dismissal only — selecting an item or Shut Down closes via
   * their own handlers below, since focus naturally moves on with the
   * action there rather than needing to return to the Start button. */
  onClose: () => void
}

const ROWS = [
  { key: 'projects', label: 'Projects', iconColor: 'var(--color-folder)', arrow: '▶' },
  { key: 'recent', label: 'Recent', iconColor: 'var(--color-category-ml)', arrow: '▶' },
  { key: 'about', label: 'About Me', iconColor: 'var(--color-doc)', arrow: '' },
  { key: 'resume', label: 'Résumé.pdf', iconColor: '#e8e4dc', arrow: '' },
  { key: 'contact', label: 'Contact…', iconColor: 'var(--color-accent-red)', arrow: '' },
]

// Hand-tuned to align each flyout with the row it opens from, matching the
// prototype exactly rather than deriving it from row heights.
const PROJECTS_FLYOUT_BOTTOM = 118
const RECENT_FLYOUT_BOTTOM = 92
const SUB_FLYOUT_BOTTOM_GENERAL = 118
const SUB_FLYOUT_BOTTOM_OTHER = 92

// A plain click/window.open can't rename the downloaded file — the `download`
// attribute only takes effect on an actual anchor click, so a real (if
// invisible) anchor is synthesized here to get "Edward Pearson CV.pdf"
// instead of the hashed build filename in the recruiter's downloads folder.
function downloadResume(url: string) {
  const link = document.createElement('a')
  link.href = url
  link.download = 'Edward Pearson CV.pdf'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Stops its own click from bubbling to the desktop's close-everything handler,
// matching Taskbar/menu surfaces elsewhere.
export function StartMenu({
  query,
  onQueryChange,
  hoveredRow,
  onHoverRow,
  hoverCat,
  onHoverCat,
  projectFlyoutItems,
  subFlyoutItems,
  recentFlyoutItems,
  searchRows,
  resumeUrl,
  onOpenNode,
  onShutDown,
  onClose,
}: StartMenuProps) {
  const isSearching = query.trim().length > 0
  const searchInputRef = useRef<HTMLInputElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Matches a real Start menu/Spotlight-style search: opening the menu drops
  // you straight into the search field rather than requiring an extra Tab.
  useEffect(() => {
    searchInputRef.current?.focus()
  }, [])

  function openRow(key: string) {
    if (key === 'about' || key === 'contact') onOpenNode('about', 'about')
    if (key === 'resume') downloadResume(resumeUrl)
  }

  // Shared Up/Down/Tab traversal + Escape + Enter/Space, scoped to whichever
  // container this is attached to via e.currentTarget — one listener per
  // level (main rows, a flyout, the sub-flyout), never per item, so a key
  // press is only ever handled once. ArrowRight only acts when the currently
  // focused item actually has a further level (aria-haspopup); ArrowLeft is
  // level-specific so each caller supplies where "back" goes.
  function handleListKeyDown(
    e: KeyboardEvent<HTMLDivElement>,
    opts?: { nextLevelSelector?: string; onArrowLeft?: () => void }
  ) {
    if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {
      e.preventDefault()
      focusAdjacentMenuItem(e.currentTarget, 1)
    } else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
      e.preventDefault()
      focusAdjacentMenuItem(e.currentTarget, -1)
    } else if (e.key === 'ArrowRight' && opts?.nextLevelSelector) {
      if (document.activeElement?.getAttribute('aria-haspopup') === 'menu') {
        e.preventDefault()
        focusFirstMenuItem(document.querySelector<HTMLElement>(opts.nextLevelSelector!))
      }
    } else if (e.key === 'ArrowLeft' && opts?.onArrowLeft) {
      e.preventDefault()
      opts.onArrowLeft()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      ;(document.activeElement as HTMLElement)?.click()
    }
  }

  return (
    <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
      <div className={styles.rail}>
        <div className={styles.railLabel}>ned pearson</div>
      </div>
      <div
        ref={contentRef}
        className={styles.content}
        role="menu"
        onKeyDown={(e) => handleListKeyDown(e, { nextLevelSelector: '[data-startmenu-flyout]' })}
      >
        <div className={styles.searchField}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            ref={searchInputRef}
            type="text"
            className={styles.searchInput}
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onKeyDown={(e) => {
              // Both branches stop propagation — otherwise the same
              // keydown bubbles to .content's own handler right after and
              // gets handled a second time (e.g. ArrowDown would move focus
              // twice: once here to row 0, then again there to row 1).
              if (e.key === 'ArrowDown') {
                e.preventDefault()
                e.stopPropagation()
                focusFirstMenuItem(contentRef.current)
              } else if (e.key === 'Escape') {
                e.preventDefault()
                e.stopPropagation()
                onClose()
              }
            }}
            placeholder="find a project…"
          />
        </div>
        <div className={styles.separator} />
        {isSearching ? (
          searchRows.length > 0 ? (
            searchRows.map((item) => (
              <div
                key={item.key}
                role="menuitem"
                tabIndex={-1}
                className={hoveredRow === item.key ? `${styles.row} ${styles.rowHover}` : styles.row}
                onMouseEnter={() => onHoverRow(item.key)}
                onFocus={() => onHoverRow(item.key)}
                onClick={(e) => {
                  e.stopPropagation()
                  onOpenNode(item.key, item.kind)
                }}
              >
                <div className={styles.rowIcon} style={{ background: item.iconColor }} />
                <div className={styles.rowLabel}>{item.label}</div>
              </div>
            ))
          ) : (
            <div className={styles.noMatches}>no matches</div>
          )
        ) : (
          ROWS.map((row) => (
            <div
              key={row.key}
              data-startmenu-row={row.key}
              role="menuitem"
              tabIndex={-1}
              aria-haspopup={row.arrow ? 'menu' : undefined}
              aria-expanded={row.arrow ? hoveredRow === row.key : undefined}
              className={hoveredRow === row.key ? `${styles.row} ${styles.rowHover}` : styles.row}
              onMouseEnter={() => onHoverRow(row.key)}
              onFocus={() => onHoverRow(row.key)}
              onClick={(e) => {
                e.stopPropagation()
                openRow(row.key)
              }}
            >
              <div className={styles.rowIcon} style={{ background: row.iconColor }} />
              <div className={styles.rowLabel}>{row.label}</div>
              <div className={styles.rowArrow}>{row.arrow}</div>
            </div>
          ))
        )}
        <div className={styles.separator} />
        <div
          role="menuitem"
          tabIndex={-1}
          className={hoveredRow === 'shutdown' ? `${styles.row} ${styles.rowHover}` : styles.row}
          onMouseEnter={() => onHoverRow('shutdown')}
          onFocus={() => onHoverRow('shutdown')}
          onClick={(e) => {
            e.stopPropagation()
            onShutDown()
          }}
        >
          <div className={styles.shutdownIcon} />
          <div className={styles.rowLabel}>
            Sh<u>u</u>t Down…
          </div>
        </div>
      </div>

      {!isSearching && hoveredRow === 'projects' && (
        // Category items highlight via hoverCat, not CSS :hover — matching the
        // prototype exactly, which means readme.txt (no arrow, so hoverCat
        // always clears to null on hover) never actually highlights here.
        <div
          data-startmenu-flyout
          className={styles.flyout}
          style={{ bottom: PROJECTS_FLYOUT_BOTTOM }}
          role="menu"
          onKeyDown={(e) =>
            handleListKeyDown(e, {
              nextLevelSelector: '[data-startmenu-subflyout]',
              onArrowLeft: () => document.querySelector<HTMLElement>('[data-startmenu-row="projects"]')?.focus(),
            })
          }
        >
          {projectFlyoutItems.map((item) => (
            <div
              key={item.key}
              data-startmenu-flyout-item={item.key}
              role="menuitem"
              tabIndex={-1}
              aria-haspopup={item.arrow ? 'menu' : undefined}
              aria-expanded={item.arrow ? hoverCat === item.key : undefined}
              className={hoverCat === item.key ? `${styles.flyoutItem} ${styles.rowHover}` : styles.flyoutItem}
              onMouseEnter={() => onHoverCat(item.arrow ? item.key : null)}
              onFocus={() => onHoverCat(item.arrow ? item.key : null)}
              onClick={(e) => {
                e.stopPropagation()
                onOpenNode(item.key, item.kind)
              }}
            >
              <div className={styles.flyoutIcon} style={{ background: item.iconColor }} />
              <div className={styles.flyoutLabel}>{item.label}</div>
              <div className={styles.rowArrow}>{item.arrow}</div>
            </div>
          ))}
        </div>
      )}

      {!isSearching && hoveredRow === 'recent' && recentFlyoutItems.length > 0 && (
        // No hover feedback at all here, state-driven or CSS — matching the
        // prototype, which hardcodes bg/fg to transparent/black for every item.
        <div
          data-startmenu-flyout
          className={styles.flyout}
          style={{ bottom: RECENT_FLYOUT_BOTTOM }}
          role="menu"
          onKeyDown={(e) =>
            handleListKeyDown(e, {
              onArrowLeft: () => document.querySelector<HTMLElement>('[data-startmenu-row="recent"]')?.focus(),
            })
          }
        >
          {recentFlyoutItems.map((item) => (
            <div
              key={item.key}
              role="menuitem"
              tabIndex={-1}
              className={styles.flyoutItem}
              onClick={(e) => {
                e.stopPropagation()
                onOpenNode(item.key, item.kind)
              }}
            >
              <div className={styles.flyoutIcon} style={{ background: item.iconColor }} />
              <div className={styles.flyoutLabel}>{item.label}</div>
            </div>
          ))}
        </div>
      )}

      {!isSearching && hoverCat && subFlyoutItems.length > 0 && (
        <div
          data-startmenu-subflyout
          className={styles.subFlyout}
          style={{ bottom: hoverCat === 'general' ? SUB_FLYOUT_BOTTOM_GENERAL : SUB_FLYOUT_BOTTOM_OTHER }}
          role="menu"
          onKeyDown={(e) =>
            handleListKeyDown(e, {
              onArrowLeft: () => document.querySelector<HTMLElement>(`[data-startmenu-flyout-item="${hoverCat}"]`)?.focus(),
            })
          }
        >
          {subFlyoutItems.map((item) => (
            <div
              key={item.key}
              role="menuitem"
              tabIndex={-1}
              className={styles.subFlyoutItem}
              onClick={(e) => {
                e.stopPropagation()
                onOpenNode(item.key, item.kind)
              }}
            >
              <div className={styles.subFlyoutIcon} style={{ background: item.iconColor }} />
              <div className={styles.flyoutLabel}>{item.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
