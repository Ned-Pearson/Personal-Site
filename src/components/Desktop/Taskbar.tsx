import { useEffect, useState } from 'react'
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
  startOpen: boolean
  onStartClick: () => void
}

// No UI anywhere toggles this — Plan.md doesn't spec a control for it — so
// it's a fixed constant rather than user-facing state.
const CLOCK_24H = false

function formatClock(date: Date): string {
  const minutes = String(date.getMinutes()).padStart(2, '0')
  if (CLOCK_24H) return `${String(date.getHours()).padStart(2, '0')}:${minutes}`
  const suffix = date.getHours() < 12 ? ' AM' : ' PM'
  const hours = date.getHours() % 12 || 12
  return `${hours}:${minutes}${suffix}`
}

export function Taskbar({ taskButtons, onTaskButtonClick, startOpen, onStartClick }: TaskbarProps) {
  const [clock, setClock] = useState(() => formatClock(new Date()))

  useEffect(() => {
    const id = setInterval(() => setClock(formatClock(new Date())), 10000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className={styles.taskbar} onClick={(e) => e.stopPropagation()}>
      <div
        className={startOpen ? `${styles.startButton} ${styles.startButtonOpen}` : styles.startButton}
        onClick={(e) => {
          e.stopPropagation()
          onStartClick()
        }}
      >
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
      <div className={styles.spacer} />
      <div className={styles.clock}>{clock}</div>
    </div>
  )
}
