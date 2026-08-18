import styles from './StartMenu.module.css'

interface StartMenuProps {
  query: string
  onQueryChange: (value: string) => void
}

// Rows, flyouts, and filtering are later points. Stops its own click from
// bubbling to the desktop's close-everything handler, matching Taskbar/menu
// surfaces elsewhere.
export function StartMenu({ query, onQueryChange }: StartMenuProps) {
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
      </div>
    </div>
  )
}
