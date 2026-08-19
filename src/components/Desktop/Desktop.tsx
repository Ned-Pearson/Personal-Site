import { useState } from 'react'
import {
  getNode,
  getPath,
  getChildren,
  getProject,
  getAbout,
  getShippedProjectCount,
  getDoc,
  getAllNodes,
  type Node,
} from '../../data'
import { DesktopIcon } from './DesktopIcon'
import { useWindows, type WindowKind, type WindowState } from './useWindows'
import { Window } from './Window'
import { FolderWindow } from './FolderWindow'
import { ProjectWindow } from './ProjectWindow'
import { AboutWindow } from './AboutWindow'
import { TextViewer } from './TextViewer'
import { Taskbar } from './Taskbar'
import { StartMenu, type FlyoutItem } from './StartMenu'
import { ContextMenu } from './ContextMenu'
import styles from './Desktop.module.css'

const projectsNode = getNode('projects')!
const readmeNode = getNode('readme')!

const PROJECT_FLYOUT_ITEMS: FlyoutItem[] = [
  { key: 'general', label: getNode('general')!.name, iconColor: 'var(--color-folder)', arrow: '▶', kind: 'folder' },
  {
    key: 'machine-learning',
    label: getNode('machine-learning')!.name,
    iconColor: 'var(--color-folder)',
    arrow: '▶',
    kind: 'folder',
  },
  { key: 'readme', label: readmeNode.name, iconColor: 'var(--color-doc)', arrow: '', kind: 'document' },
]

interface SearchItem {
  id: string
  kind: WindowKind
  label: string
  type: string
}

// 'about' isn't a NODES entry (see windowLabel/windowIconColor), so it's
// added in separately here to stay searchable, matching the prototype.
const SEARCH_ITEMS: SearchItem[] = [
  ...getAllNodes().map((n) => ({ id: n.id, kind: n.kind as WindowKind, label: n.name, type: n.type })),
  { id: 'about', kind: 'about', label: 'About Me', type: 'Profile' },
]

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

// Short label for the taskbar button — unlike windowTitle, no " — Properties"/
// "— Text Viewer" suffix.
function windowLabel(node: string, kind: WindowKind): string {
  if (kind === 'about') return 'About Me'
  return getNode(node)?.name ?? node
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
  const [startOpen, setStartOpen] = useState(false)
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null)
  const [query, setQuery] = useState('')
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)
  const [hoverCat, setHoverCat] = useState<string | null>(null)
  const {
    windows,
    focused,
    recent,
    openWindow,
    focus,
    close,
    closeAll,
    cascade,
    minimize,
    patch,
    toggleMaximize,
    toggleMenu,
    closeMenus,
  } = useWindows()

  const q = query.trim().toLowerCase()
  const searchRows: FlyoutItem[] = q
    ? SEARCH_ITEMS.filter((item) => {
        const project = getProject(item.id)
        const haystack = [item.label, item.type, project?.tags.join(' ') ?? '', project?.status ?? '']
          .join(' ')
          .toLowerCase()
        return haystack.includes(q)
      }).map((item) => ({
        key: item.id,
        label: item.label,
        iconColor: windowIconColor(item.id, item.kind),
        arrow: '',
        kind: item.kind,
      }))
    : []

  const anyOpen = windows.length > 0
  const contextMenuItems = [
    { label: 'Open Projects', onClick: () => openWindow(projectsNode.id, 'folder') },
    { label: 'Open readme.txt', onClick: () => openWindow(readmeNode.id, 'document') },
    { label: 'Cascade windows', onClick: cascade, disabled: !anyOpen },
    { label: 'Close all windows', onClick: closeAll, disabled: !anyOpen },
    { label: 'Properties', onClick: () => openWindow('about', 'about') },
  ].map((item) => ({
    label: item.label,
    disabled: item.disabled,
    onClick: () => {
      item.onClick()
      setContextMenu(null)
    },
  }))

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
        setStartOpen(false)
        setContextMenu(null)
      }}
      onContextMenu={(e) => {
        e.preventDefault()
        setContextMenu({
          x: Math.min(e.clientX, window.innerWidth - 200),
          y: Math.min(e.clientY, window.innerHeight - 190),
        })
        setStartOpen(false)
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
            id={win.id}
            title={windowTitle(win.node, win.kind)}
            iconColor={windowIconColor(win.node, win.kind)}
            focused={focused === win.id}
            x={win.x}
            y={win.y}
            w={win.w}
            h={win.h}
            z={win.z}
            maximized={win.max}
            phase={win.phase}
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

      <Taskbar
        taskButtons={windows.map((win) => ({
          id: win.id,
          label: windowLabel(win.node, win.kind),
          iconColor: windowIconColor(win.node, win.kind),
          active: focused === win.id && !win.min,
        }))}
        onTaskButtonClick={(id, active) => {
          if (active) minimize(id)
          else focus(id, true)
        }}
        startOpen={startOpen}
        onStartClick={() => {
          setStartOpen((open) => !open)
          setContextMenu(null)
        }}
      />
      {startOpen && (
        <StartMenu
          query={query}
          onQueryChange={setQuery}
          hoveredRow={hoveredRow}
          onHoverRow={(key) => {
            setHoveredRow(key)
            setHoverCat(null)
          }}
          hoverCat={hoverCat}
          onHoverCat={setHoverCat}
          searchRows={searchRows}
          projectFlyoutItems={PROJECT_FLYOUT_ITEMS}
          recentFlyoutItems={recent.slice(0, 3).map((id) => ({
            key: id,
            label: getNode(id)?.name ?? id,
            iconColor: windowIconColor(id, 'project'),
            arrow: '',
            kind: 'project' as WindowKind,
          }))}
          subFlyoutItems={
            hoverCat
              ? getChildren(hoverCat).map((child) => ({
                  key: child.id,
                  label: child.name,
                  iconColor: windowIconColor(child.id, child.kind),
                  arrow: '',
                  kind: child.kind,
                }))
              : []
          }
          onOpenNode={(id, kind) => {
            openWindow(id, kind)
            setStartOpen(false)
          }}
          onShutDown={() => {
            closeAll()
            setStartOpen(false)
          }}
        />
      )}
      {contextMenu && <ContextMenu x={contextMenu.x} y={contextMenu.y} items={contextMenuItems} />}
    </div>
  )
}
