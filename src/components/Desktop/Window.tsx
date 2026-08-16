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
  onClose: () => void
  children?: ReactNode
}

// Minimise/maximise buttons render with the right bevel/pressed states but
// aren't wired up yet — that lands with maximise/restore and minimise.
export function Window({ title, iconColor, focused, x, y, w, h, z, onClose, children }: WindowProps) {
  return (
    <div
      className={focused ? `${styles.window} ${styles.focused}` : styles.window}
      style={{ left: x, top: y, width: w, height: h, zIndex: z }}
    >
      <div className={styles.titleBar}>
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
