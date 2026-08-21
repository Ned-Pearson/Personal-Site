import { useState } from 'react'
import { getNode } from '../../data'
import { SystemTray } from './SystemTray'
import { MobileTaskbar } from './MobileTaskbar'
import { RootScreen } from './RootScreen'
import styles from './Mobile.module.css'

// 'about' isn't a NODES entry (see Desktop.tsx's windowLabel), so it needs
// its own case here too.
function nodeLabel(node: string): string {
  if (node === 'about') return 'About Me'
  return getNode(node)?.name ?? node
}

// Root of the mobile presentation (README.md section 14) — a separate
// presentation from Desktop, not a scaled-down window manager. Three fixed
// bands: system tray, scrolling content, taskbar. `node` is the minimal seed
// of the eventual mobile state model (a later bullet formalises the rest —
// view/tab/tray/clock); null means the desktop root. Nothing walks it back
// to null yet — that's the breadcrumb's job once the navigation model lands.
export function Mobile() {
  const [node, setNode] = useState<string | null>(null)
  const atRoot = node === null
  const label = atRoot ? 'Desktop' : nodeLabel(node)

  return (
    <div className={styles.mobile}>
      <SystemTray />
      <div className={styles.content}>{atRoot && <RootScreen onOpen={setNode} />}</div>
      <MobileTaskbar atRoot={atRoot} label={label} />
    </div>
  )
}
