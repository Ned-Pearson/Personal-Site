import styles from './FolderWindow.module.css'

interface FolderWindowProps {
  onOpenReadme: () => void
}

// File and Edit are permanently inert (no dropdown, ever) — they still get
// hover feedback, matching a genuine retro menu bar. View's dropdown and
// checkmarked items are the next point; toolbar/file-pane/status-bar content
// are later points still.
export function FolderWindow({ onOpenReadme }: FolderWindowProps) {
  return (
    <>
      <div className={styles.menuBar}>
        <span className={styles.menuItem}>
          <u>F</u>ile
        </span>
        <span className={styles.menuItem}>
          <u>E</u>dit
        </span>
        <span className={styles.menuItem}>
          <u>V</u>iew
        </span>
        <span className={styles.menuItem} onClick={onOpenReadme}>
          <u>H</u>elp
        </span>
      </div>
      <div className={styles.toolbar} />
      <div className={styles.filePane} />
      <div className={styles.statusBar}>
        <div className={styles.statusField} />
        <div className={`${styles.statusField} ${styles.statusFieldRight}`} />
      </div>
    </>
  )
}
