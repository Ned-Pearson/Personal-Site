import type { ReactNode } from 'react'
import styles from './WindowScreen.module.css'

interface WindowScreenProps {
  title: string
  iconColor: string
  onClose: () => void
  children?: ReactNode
}

// Mobile's window screen shell (README.md section 14) — single full-screen
// window, no minimise/maximise, only close. The `sheetUp` entrance animation
// is a later bullet in this section, same as how Desktop's window chrome
// existed well before its own Animation section landed. Body content
// (toolbar, folder contents, project/about adaptations, text viewer) is
// likewise later passes — this is just the shell each of those fills in.
export function WindowScreen({ title, iconColor, onClose, children }: WindowScreenProps) {
  return (
    <div className={styles.window}>
      <div className={styles.titleBar}>
        <div className={styles.iconChip} style={{ background: iconColor }} />
        <div className={styles.title}>{title}</div>
        <div className={styles.closeButton} onClick={onClose}>
          ✕
        </div>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  )
}
