import type { WindowView } from './useWindows'
import styles from './FolderWindow.module.css'

interface FolderWindowProps {
  view: WindowView
  menuOpen: boolean
  path: string
  canGoBack: boolean
  onOpenReadme: () => void
  onToggleMenu: () => void
  onSetView: (view: WindowView) => void
  onBack: () => void
}

// File and Edit are permanently inert (no dropdown, ever) — they still get
// hover feedback, matching a genuine retro menu bar. File-pane/status-bar
// content are later points still. Forward is permanently inert too — no
// forward-history stack exists in this build.
export function FolderWindow({
  view,
  menuOpen,
  path,
  canGoBack,
  onOpenReadme,
  onToggleMenu,
  onSetView,
  onBack,
}: FolderWindowProps) {
  return (
    <>
      <div className={styles.menuBar}>
        <span className={styles.menuItem}>
          <u>F</u>ile
        </span>
        <span className={styles.menuItem}>
          <u>E</u>dit
        </span>
        <span
          className={menuOpen ? `${styles.menuItem} ${styles.menuItemOpen}` : styles.menuItem}
          onClick={(e) => {
            e.stopPropagation()
            onToggleMenu()
          }}
        >
          <u>V</u>iew
        </span>
        <span className={styles.menuItem} onClick={onOpenReadme}>
          <u>H</u>elp
        </span>
        {menuOpen && (
          <div className={styles.viewDropdown}>
            <div
              className={styles.dropdownItem}
              onClick={(e) => {
                e.stopPropagation()
                onSetView('list')
              }}
            >
              <span className={styles.check}>{view === 'list' ? '✓' : ''}</span>
              <span className={styles.dropdownLabel}>as File list</span>
              <span>≣</span>
            </div>
            <div
              className={styles.dropdownItem}
              onClick={(e) => {
                e.stopPropagation()
                onSetView('grid')
              }}
            >
              <span className={styles.check}>{view === 'grid' ? '✓' : ''}</span>
              <span className={styles.dropdownLabel}>as Icon grid</span>
              <span>▦</span>
            </div>
            <div className={styles.dropdownDivider} />
            <div className={`${styles.dropdownItem} ${styles.dropdownItemDisabled}`}>
              <span className={styles.check} />
              <span className={styles.dropdownLabel}>Refresh</span>
            </div>
          </div>
        )}
      </div>
      <div className={styles.toolbar}>
        <div
          className={`${styles.toolbarButton} ${canGoBack ? styles.toolbarButtonActive : styles.toolbarButtonDisabled}`}
          onClick={canGoBack ? onBack : undefined}
        >
          ← Back
        </div>
        <div className={`${styles.toolbarButton} ${styles.toolbarButtonDisabled}`}>Forward →</div>
        <div className={styles.toolbarDivider} />
        <div className={styles.pathField}>{path}</div>
        <div
          className={view === 'list' ? `${styles.viewToggle} ${styles.viewToggleActive}` : styles.viewToggle}
          onClick={() => onSetView('list')}
        >
          ≣
        </div>
        <div
          className={view === 'grid' ? `${styles.viewToggle} ${styles.viewToggleActive}` : styles.viewToggle}
          onClick={() => onSetView('grid')}
        >
          ▦
        </div>
      </div>
      <div className={styles.filePane} />
      <div className={styles.statusBar}>
        <div className={styles.statusField} />
        <div className={`${styles.statusField} ${styles.statusFieldRight}`} />
      </div>
    </>
  )
}
