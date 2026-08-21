import { useState } from 'react'
import { getNode, getChildren } from '../../data'
import { folderPath } from '../../utils/folderPath'
import type { WindowView } from '../Desktop/useWindows'
import { SystemTray } from './SystemTray'
import { MobileTaskbar } from './MobileTaskbar'
import { RootScreen } from './RootScreen'
import { WindowScreen } from './WindowScreen'
import { MobileToolbar } from './MobileToolbar'
import { FolderContents } from './FolderContents'
import styles from './Mobile.module.css'

// 'about' isn't a NODES entry (see Desktop.tsx's windowLabel), so it needs
// its own case here too.
function nodeLabel(node: string): string {
  if (node === 'about') return 'About Me'
  return getNode(node)?.name ?? node
}

function nodeIconColor(node: string): string {
  if (node === 'about') return 'var(--color-doc)'
  const n = getNode(node)
  if (n?.kind === 'folder') return 'var(--color-folder)'
  return n?.colour ?? 'var(--color-doc)'
}

// Root of the mobile presentation (README.md section 14) — a separate
// presentation from Desktop, not a scaled-down window manager. Three fixed
// bands: system tray, scrolling content, taskbar. `node` is the minimal seed
// of the eventual mobile state model (a later bullet formalises the rest —
// view/tab/tray/clock); null means the desktop root. The window screen's own
// close button is the only way back to root for now — walking back via Back
// or the breadcrumb tap is the navigation model bullet, still to come.
export function Mobile() {
  const [node, setNode] = useState<string | null>(null)
  const [view, setView] = useState<WindowView>('list')
  const atRoot = node === null
  const label = atRoot ? 'Desktop' : nodeLabel(node)
  const isFolder = !atRoot && getNode(node)?.kind === 'folder'
  const parent = !atRoot ? getNode(node)?.parent : undefined

  return (
    <div className={styles.mobile}>
      <SystemTray />
      <div className={styles.content}>
        {atRoot ? (
          <RootScreen onOpen={setNode} />
        ) : (
          <WindowScreen title={label} iconColor={nodeIconColor(node)} onClose={() => setNode(null)}>
            {isFolder && (
              <>
                <MobileToolbar
                  canGoBack={!!parent}
                  onBack={() => parent && setNode(parent)}
                  path={folderPath(node)}
                  view={view}
                  onToggleView={() => setView((v) => (v === 'list' ? 'grid' : 'list'))}
                />
                <FolderContents view={view} items={getChildren(node)} onOpenRow={setNode} />
              </>
            )}
          </WindowScreen>
        )}
      </div>
      <MobileTaskbar atRoot={atRoot} label={label} />
    </div>
  )
}
