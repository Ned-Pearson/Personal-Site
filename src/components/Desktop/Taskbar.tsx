import styles from './Taskbar.module.css'

// Start button's sticky "open" look needs a real startOpen boolean, which
// belongs to the Start menu itself — that's section 10. For now this button
// only has hover/press feedback, no click behaviour. Task buttons and the
// clock are their own later points.
export function Taskbar() {
  return (
    <div className={styles.taskbar} onClick={(e) => e.stopPropagation()}>
      <div className={styles.startButton}>
        <div className={styles.colourGrid}>
          <div className={styles.cell} style={{ background: '#c1443c' }} />
          <div className={styles.cell} style={{ background: '#2f7a35' }} />
          <div className={styles.cell} style={{ background: '#1f4fa8' }} />
          <div className={styles.cell} style={{ background: '#e0b13a' }} />
        </div>
        np
      </div>
      <div className={styles.divider} />
    </div>
  )
}
