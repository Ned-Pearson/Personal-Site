import styles from './MobileTaskbar.module.css'

interface MobileTaskbarProps {
  atRoot: boolean
  label: string
  onBreadcrumbClick: () => void
}

// Opening the go-to tray from the np button is a later pass (README section
// 14's "Go-to tray" bullet) — this is just the taskbar's own presentation.
// The breadcrumb itself returns to the desktop root, per the navigation
// model, regardless of how deep `label` currently is.
export function MobileTaskbar({ atRoot, label, onBreadcrumbClick }: MobileTaskbarProps) {
  return (
    <div className={styles.taskbar}>
      <div className={styles.npButton}>
        <div className={styles.colourGrid}>
          <div style={{ background: '#c1443c' }} />
          <div style={{ background: '#2f7a35' }} />
          <div style={{ background: '#1f4fa8' }} />
          <div style={{ background: '#e0b13a' }} />
        </div>
        np
      </div>
      <div
        className={atRoot ? styles.breadcrumb : `${styles.breadcrumb} ${styles.breadcrumbOpen}`}
        onClick={onBreadcrumbClick}
      >
        {label}
      </div>
    </div>
  )
}
