import { useState } from 'react'
import { getNode, getChildren, getProject, getAbout, getShippedProjectCount, getDoc } from '../../data'
import { folderPath } from '../../utils/folderPath'
import type { WindowView } from '../Desktop/useWindows'
import { SystemTray } from './SystemTray'
import { MobileTaskbar } from './MobileTaskbar'
import { RootScreen } from './RootScreen'
import { WindowScreen } from './WindowScreen'
import { MobileToolbar } from './MobileToolbar'
import { FolderContents } from './FolderContents'
import { MobileProjectContent } from './MobileProjectContent'
import { MobileAboutContent } from './MobileAboutContent'
import { MobileTextViewer } from './MobileTextViewer'
import { GoToTray } from './GoToTray'
import { MobileLightbox } from './MobileLightbox'
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
// view/tab/tray/clock); null means the desktop root. Navigation model: tap
// (not double-tap) opens everywhere; the folder toolbar's Back walks up one
// level and falls through to the desktop once there's no parent left; the
// taskbar breadcrumb always returns straight to the desktop root.
export function Mobile() {
  const [node, setNode] = useState<string | null>(null)
  const [view, setView] = useState<WindowView>('list')
  const [tab, setTab] = useState(0)
  const [trayOpen, setTrayOpen] = useState(false)
  // -1 = the Overview screenshot; otherwise an index into project.media. No
  // projId needed here — only one node can be open at a time, so `project`
  // (derived from `node` below) already identifies which one.
  const [lightbox, setLightbox] = useState<{ index: number } | null>(null)
  const atRoot = node === null
  const label = atRoot ? 'Desktop' : nodeLabel(node)
  const kind = !atRoot ? getNode(node)?.kind : undefined
  const isFolder = kind === 'folder'
  const isAbout = node === 'about'
  const project = !atRoot && kind === 'project' ? getProject(node) : undefined
  const doc = !atRoot && kind === 'document' ? getDoc(node) : undefined
  const parent = !atRoot ? getNode(node)?.parent : undefined
  const iconColor = !atRoot ? nodeIconColor(node) : undefined

  // Opening/closing/going back all reset the tab index — switching to a
  // different node shouldn't carry over e.g. "Skills" being selected.
  // Also closes the go-to tray, since selecting a destination there is
  // itself a navigation.
  function openNode(id: string | null) {
    setNode(id)
    setTab(0)
    setTrayOpen(false)
    setLightbox(null)
  }

  return (
    <div className={styles.mobile}>
      <SystemTray />
      <div className={styles.content}>
        {atRoot ? (
          <RootScreen onOpen={openNode} />
        ) : (
          <WindowScreen title={label} iconColor={nodeIconColor(node)} onClose={() => openNode(null)}>
            {isFolder && (
              <>
                <MobileToolbar
                  onBack={() => openNode(parent ?? null)}
                  path={folderPath(node)}
                  view={view}
                  onToggleView={() => setView((v) => (v === 'list' ? 'grid' : 'list'))}
                />
                <FolderContents view={view} items={getChildren(node)} onOpenRow={openNode} />
              </>
            )}
            {project && (
              <MobileProjectContent
                tab={tab}
                name={label}
                project={project}
                onSelectTab={setTab}
                onOpenLightbox={(index) => setLightbox({ index })}
              />
            )}
            {isAbout && (
              <MobileAboutContent
                tab={tab}
                about={getAbout()}
                shippedCount={getShippedProjectCount()}
                onSelectTab={setTab}
              />
            )}
            {doc && <MobileTextViewer doc={doc} />}
          </WindowScreen>
        )}
      </div>
      <MobileTaskbar
        atRoot={atRoot}
        label={label}
        onNpClick={() => setTrayOpen((open) => !open)}
        onBreadcrumbClick={() => openNode(null)}
      />
      {trayOpen && <GoToTray onSelect={openNode} onDismiss={() => setTrayOpen(false)} />}
      {project && lightbox && (
        <MobileLightbox
          title={label}
          iconColor={iconColor ?? 'var(--color-doc)'}
          project={project}
          index={lightbox.index}
          onIndexChange={(index) => setLightbox({ index })}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  )
}
