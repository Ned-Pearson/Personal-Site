import styles from './Taskbar.module.css'

// Static shell only: Start button, per-window task buttons, and the clock
// are each their own later points.
export function Taskbar() {
  return <div className={styles.taskbar} onClick={(e) => e.stopPropagation()} />
}
