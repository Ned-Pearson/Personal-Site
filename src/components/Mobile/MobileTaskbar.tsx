import styles from './MobileTaskbar.module.css'

interface MobileTaskbarProps {
  atRoot: boolean
  label: string
}

// Opening the go-to tray from the np button, and navigating via the
// breadcrumb, are both later passes (README section 14's "Go-to tray" and
// "Navigation model" bullets) — this is just the taskbar's own presentation.
export function MobileTaskbar({ atRoot, label }: MobileTaskbarProps) {
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
      <div className={atRoot ? styles.breadcrumb : `${styles.breadcrumb} ${styles.breadcrumbOpen}`}>{label}</div>
    </div>
  )
}
