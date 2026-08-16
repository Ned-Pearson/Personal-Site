import type { ReactNode } from 'react'
import styles from './Window.module.css'

interface WindowProps {
  title: string
  iconColor: string
  focused: boolean
  x: number
  y: number
  w: number
  h: number
  z: number
  maximized: boolean
  onFocus: () => void
  onMove: (x: number, y: number) => void
  onClose: () => void
  children?: ReactNode
}

// Minimise/maximise buttons render with the right bevel/pressed states but
// aren't wired up yet — that lands with maximise/restore and minimise.
export function Window({
  title,
  iconColor,
  focused,
  x,
  y,
  w,
  h,
  z,
  maximized,
  onFocus,
  onMove,
  onClose,
  children,
}: WindowProps) {
  function startDrag(e: React.MouseEvent) {
    if (e.button !== 0 || maximized) return
    e.preventDefault()
    const offsetX = e.clientX - x
    const offsetY = e.clientY - y

    function move(ev: MouseEvent) {
      onMove(
        Math.max(0, Math.min(window.innerWidth - 80, ev.clientX - offsetX)),
        Math.max(0, Math.min(window.innerHeight - 60, ev.clientY - offsetY))
      )
    }
    function up() {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
    }
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
  }

  return (
    <div
      className={focused ? `${styles.window} ${styles.focused}` : styles.window}
      style={{ left: x, top: y, width: w, height: h, zIndex: z }}
      onMouseDown={onFocus}
    >
      <div className={styles.titleBar} onMouseDown={startDrag}>
        <div className={styles.iconChip} style={{ background: iconColor }} />
        <div className={styles.title}>{title}</div>
        <div className={styles.buttons}>
          <div className={styles.button}>
            <span className={styles.minGlyph} />
          </div>
          <div className={styles.button}>
            <span className={styles.maxGlyph} />
          </div>
          <div className={styles.button} onClick={onClose}>
            ✕
          </div>
        </div>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  )
}
