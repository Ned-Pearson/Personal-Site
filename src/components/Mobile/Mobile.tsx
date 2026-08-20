import styles from './Mobile.module.css'

// Root of the mobile presentation (README.md section 14) — a separate
// presentation from Desktop, not a scaled-down window manager. Three fixed
// bands: system tray, scrolling content, taskbar. Each band's actual content
// (tray glyphs, taskbar buttons, screens within the content band) lands as
// its own follow-up pass; this is just the layout shell.
export function Mobile() {
  return (
    <div className={styles.mobile}>
      <div className={styles.systemTray} />
      <div className={styles.content} />
      <div className={styles.taskbar} />
    </div>
  )
}
