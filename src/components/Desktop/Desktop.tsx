import { useState } from 'react'
import { getNode, getPath, getChildren, getProject, getAbout, getShippedProjectCount, getDoc, type Node } from '../../data'
import { DesktopIcon } from './DesktopIcon'
import { useWindows, type WindowKind, type WindowState } from './useWindows'
import { Window } from './Window'
import { FolderWindow } from './FolderWindow'
import { ProjectWindow } from './ProjectWindow'
import { AboutWindow } from './AboutWindow'
import { TextViewer } from './TextViewer'
import styles from './Desktop.module.css'

const projectsNode = getNode('projects')!
const readmeNode = getNode('readme')!

// Content per window kind is built out in sections 5-8; Window itself is
// just the reusable chrome, so callers resolve title/icon from the data layer.
function windowTitle(node: string, kind: WindowKind): string {
  if (kind === 'about') return 'Ned Pearson — Properties'
  const name = getNode(node)?.name ?? node
  if (kind === 'project') return `${name} — Properties`
  if (kind === 'document') return `${name} — Text Viewer`
  return name
}

function windowIconColor(node: string, kind: WindowKind): string {
  if (kind === 'folder') return 'var(--color-folder)'
  if (kind === 'about' || kind === 'document') return 'var(--color-doc)'
  return getNode(node)?.colour ?? 'var(--color-doc)'
}

// e.g. getPath('machine-learning') -> "C:\ned\projects\machine-learning"
function folderPath(node: string): string {
  const segments = getPath(node).map((n) => n.name.toLowerCase().replace(/ /g, '-'))
  return 'C:\\ned\\' + segments.join('\\')
}

function windowBody(
  win: WindowState,
  openWindow: (node: string, kind: WindowKind) => void,
  toggleMenu: (id: number) => void,
  patch: (id: number, updates: Partial<WindowState>) => void,
  selectedIcon: string | null,
  setSelectedIcon: (id: string) => void,
  close: (id: number) => void
) {
  if (win.kind === 'folder') {
    const parentId = getNode(win.node)?.parent ?? null
    const rowPrefix = `${win.id}:`
    const selectedRow = selectedIcon?.startsWith(rowPrefix) ? selectedIcon.slice(rowPrefix.length) : null
    return (
      <FolderWindow
        view={win.view}
        menuOpen={win.menu}
        path={folderPath(win.node)}
        canGoBack={!!parentId}
        items={getChildren(win.node)}
        selectedRow={selectedRow}
        modified={getNode(win.node)?.modified ?? ''}
        onOpenReadme={() => openWindow('readme', 'document')}
        onToggleMenu={() => toggleMenu(win.id)}
        onSetView={(view) => patch(win.id, { view, menu: false })}
        onBack={() => {
          if (parentId) openWindow(parentId, 'folder')
        }}
        onSelectRow={(nodeId) => setSelectedIcon(rowPrefix + nodeId)}
        onOpenRow={(node: Node) => openWindow(node.id, node.kind)}
      />
    )
  }
  if (win.kind === 'project') {
    const project = getProject(win.node)
    if (project) {
      return (
        <ProjectWindow
          tab={win.tab}
          name={getNode(win.node)?.name ?? win.node}
          project={project}
          onSelectTab={(tab) => patch(win.id, { tab })}
        />
      )
    }
  }
  if (win.kind === 'about') {
    return (
      <AboutWindow
        tab={win.tab}
        about={getAbout()}
        shippedCount={getShippedProjectCount()}
        onSelectTab={(tab) => patch(win.id, { tab })}
        onClose={() => close(win.id)}
      />
    )
  }
  if (win.kind === 'document') {
    const doc = getDoc(win.node)
    if (doc) return <TextViewer doc={doc} />
  }
  return <div style={{ padding: 8 }}>{win.kind} window</div>
}

export function Desktop() {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
  const { windows, focused, openWindow, focus, close, minimize, patch, toggleMaximize, toggleMenu, closeMenus } =
    useWindows()

  function openIcon(id: string) {
    if (id === 'about') {
      openWindow('about', 'about')
      return
    }
    const node = getNode(id)
    if (node) openWindow(node.id, node.kind)
  }

  return (
    <div
      className={styles.desktop}
      onClick={() => {
        setSelectedIcon(null)
        closeMenus()
      }}
    >
      <div className={styles.iconColumn}>
        <DesktopIcon
          label={projectsNode.name}
          glyph="folder"
          selected={selectedIcon === projectsNode.id}
          onSelect={() => setSelectedIcon(projectsNode.id)}
          onOpen={() => openIcon(projectsNode.id)}
        />
        <DesktopIcon
          label="About Me"
          glyph="document"
          selected={selectedIcon === 'about'}
          onSelect={() => setSelectedIcon('about')}
          onOpen={() => openIcon('about')}
        />
        <DesktopIcon
          label={readmeNode.name}
          glyph="document"
          selected={selectedIcon === readmeNode.id}
          onSelect={() => setSelectedIcon(readmeNode.id)}
          onOpen={() => openIcon(readmeNode.id)}
        />
      </div>

      {windows
        .filter((win) => !win.min)
        .map((win) => (
          <Window
            key={win.id}
            title={windowTitle(win.node, win.kind)}
            iconColor={windowIconColor(win.node, win.kind)}
            focused={focused === win.id}
            x={win.x}
            y={win.y}
            w={win.w}
            h={win.h}
            z={win.z}
            maximized={win.max}
            onFocus={() => {
              if (focused !== win.id) focus(win.id)
            }}
            onMove={(x, y) => patch(win.id, { x, y })}
            onResize={(w, h) => patch(win.id, { w, h, max: false })}
            onToggleMax={() => toggleMaximize(win.id)}
            onMinimize={() => minimize(win.id)}
            onClose={() => close(win.id)}
          >
            {windowBody(win, openWindow, toggleMenu, patch, selectedIcon, setSelectedIcon, close)}
          </Window>
        ))}
    </div>
  )
}
