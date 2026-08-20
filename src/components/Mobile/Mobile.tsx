import styles from './Mobile.module.css'

// Root of the mobile presentation (README.md section 14) — a separate
// presentation from Desktop, not a scaled-down window manager. The three-band
// layout (system tray / content / taskbar), navigation model, and every other
// mobile screen land as their own follow-up passes; this is just the shell
// that the breakpoint in App.tsx mounts instead of Desktop.
export function Mobile() {
  return <div className={styles.mobile} />
}
