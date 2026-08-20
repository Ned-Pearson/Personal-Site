import { SystemTray } from './SystemTray'
import styles from './Mobile.module.css'

// Root of the mobile presentation (README.md section 14) — a separate
// presentation from Desktop, not a scaled-down window manager. Three fixed
// bands: system tray, scrolling content, taskbar. Content-band screens and
// the taskbar's own content land as their own follow-up passes.
export function Mobile() {
  return (
    <div className={styles.mobile}>
      <SystemTray />
      <div className={styles.content} />
      <div className={styles.taskbar} />
    </div>
  )
}
