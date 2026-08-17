import styles from './FolderWindow.module.css'

// Layout shell only: menu bar, toolbar, file pane and status bar are all
// present and correctly structured, but empty. Menu bar/View dropdown,
// toolbar content, file pane content, and status bar text are separate,
// later points in section 5.
export function FolderWindow() {
  return (
    <>
      <div className={styles.menuBar}>
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        <span>Help</span>
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
