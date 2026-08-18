import styles from './StartMenu.module.css'

interface StartMenuProps {
  query: string
  onQueryChange: (value: string) => void
  hoveredRow: string | null
  onHoverRow: (key: string | null) => void
  onOpenAbout: () => void
}

// Projects/Recent have no click target of their own in the prototype either —
// they're purely hover-triggered flyouts, which are the next point. Filtering
// the rows by query and Shut Down's actual click behaviour are later points too.
const ROWS = [
  { key: 'projects', label: 'Projects', iconColor: 'var(--color-folder)', arrow: '▶' },
  { key: 'recent', label: 'Recent', iconColor: 'var(--color-category-ml)', arrow: '▶' },
  { key: 'about', label: 'About Me', iconColor: 'var(--color-doc)', arrow: '' },
  { key: 'resume', label: 'Résumé.pdf', iconColor: '#e8e4dc', arrow: '' },
  { key: 'contact', label: 'Contact…', iconColor: 'var(--color-accent-red)', arrow: '' },
]

// Stops its own click from bubbling to the desktop's close-everything handler,
// matching Taskbar/menu surfaces elsewhere.
export function StartMenu({ query, onQueryChange, hoveredRow, onHoverRow, onOpenAbout }: StartMenuProps) {
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
              if (row.key === 'about' || row.key === 'contact') onOpenAbout()
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
    </div>
  )
}
