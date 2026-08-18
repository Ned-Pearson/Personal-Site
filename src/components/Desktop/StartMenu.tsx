import type { WindowKind } from './useWindows'
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
  onOpenNode: (id: string, kind: WindowKind) => void
}

// Recent's flyout content, filtering the rows by query, and Shut Down's
// actual click behaviour are later points still.
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
const SUB_FLYOUT_BOTTOM_GENERAL = 118
const SUB_FLYOUT_BOTTOM_OTHER = 92

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
  onOpenNode,
}: StartMenuProps) {
  function openRow(key: string) {
    if (key === 'about' || key === 'contact') onOpenNode('about', 'about')
  }

  return (
    <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
      <div className={styles.rail}>
        <div className={styles.railLabel}>ned pearson</div>
      </div>
      <div className={styles.content}>
        <div className={styles.searchField}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            className={styles.searchInput}
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="find a project…"
          />
        </div>
        <div className={styles.separator} />
        {ROWS.map((row) => (
          <div
            key={row.key}
            className={hoveredRow === row.key ? `${styles.row} ${styles.rowHover}` : styles.row}
            onMouseEnter={() => onHoverRow(row.key)}
            onClick={(e) => {
              e.stopPropagation()
              openRow(row.key)
            }}
          >
            <div className={styles.rowIcon} style={{ background: row.iconColor }} />
            <div className={styles.rowLabel}>{row.label}</div>
            <div className={styles.rowArrow}>{row.arrow}</div>
          </div>
        ))}
        <div className={styles.separator} />
        <div
          className={hoveredRow === 'shutdown' ? `${styles.row} ${styles.rowHover}` : styles.row}
          onMouseEnter={() => onHoverRow('shutdown')}
        >
          <div className={styles.shutdownIcon} />
          <div className={styles.rowLabel}>
            Sh<u>u</u>t Down…
          </div>
        </div>
      </div>

      {hoveredRow === 'projects' && (
        // Category items highlight via hoverCat, not CSS :hover — matching the
        // prototype exactly, which means readme.txt (no arrow, so hoverCat
        // always clears to null on hover) never actually highlights here.
        <div className={styles.flyout} style={{ bottom: PROJECTS_FLYOUT_BOTTOM }}>
          {projectFlyoutItems.map((item) => (
            <div
              key={item.key}
              className={hoverCat === item.key ? `${styles.flyoutItem} ${styles.rowHover}` : styles.flyoutItem}
              onMouseEnter={() => onHoverCat(item.arrow ? item.key : null)}
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

      {hoverCat && subFlyoutItems.length > 0 && (
        <div
          className={styles.subFlyout}
          style={{ bottom: hoverCat === 'general' ? SUB_FLYOUT_BOTTOM_GENERAL : SUB_FLYOUT_BOTTOM_OTHER }}
        >
          {subFlyoutItems.map((item) => (
            <div
              key={item.key}
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
