import { useState } from 'react'
import { getNode } from '../../data'
import { SystemTray } from './SystemTray'
import { MobileTaskbar } from './MobileTaskbar'
import styles from './Mobile.module.css'

// Root of the mobile presentation (README.md section 14) — a separate
// presentation from Desktop, not a scaled-down window manager. Three fixed
// bands: system tray, scrolling content, taskbar. `node` is the minimal seed
// of the eventual mobile state model (a later bullet formalises the rest —
// view/tab/tray/clock); null means the desktop root. Nothing sets it yet —
// tap-to-open lands with the desktop-root screen and navigation model.
export function Mobile() {
  const [node] = useState<string | null>(null)
  const atRoot = node === null
  const label = atRoot ? 'Desktop' : (getNode(node)?.name ?? node)

  return (
    <div className={styles.mobile}>
      <SystemTray />
      <div className={styles.content} />
      <MobileTaskbar atRoot={atRoot} label={label} />
    </div>
  )
}
