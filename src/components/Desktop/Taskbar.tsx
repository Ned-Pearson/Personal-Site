import styles from './Taskbar.module.css'

export interface TaskButtonInfo {
  id: number
  label: string
  iconColor: string
  active: boolean
}

interface TaskbarProps {
  taskButtons: TaskButtonInfo[]
  onTaskButtonClick: (id: number, active: boolean) => void
}

// Start button's sticky "open" look needs a real startOpen boolean, which
// belongs to the Start menu itself — that's section 10. For now this button
// only has hover/press feedback, no click behaviour. The clock is its own
// later point.
export function Taskbar({ taskButtons, onTaskButtonClick }: TaskbarProps) {
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
      {taskButtons.map((tb) => (
        <div
          key={tb.id}
          className={tb.active ? `${styles.taskButton} ${styles.taskButtonActive}` : styles.taskButton}
          onClick={(e) => {
            e.stopPropagation()
            onTaskButtonClick(tb.id, tb.active)
          }}
        >
          <div className={styles.taskIconChip} style={{ background: tb.iconColor }} />
          <div className={styles.taskLabel}>{tb.label}</div>
        </div>
      ))}
    </div>
  )
}
