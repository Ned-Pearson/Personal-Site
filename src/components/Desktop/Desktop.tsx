import { useState } from 'react'
import { getNode } from '../../data'
import { DesktopIcon } from './DesktopIcon'
import { useWindows, type WindowKind } from './useWindows'
import { Window } from './Window'
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

export function Desktop() {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
  const { windows, focused, openWindow, close } = useWindows()

  function openIcon(id: string) {
    if (id === 'about') {
      openWindow('about', 'about')
      return
    }
    const node = getNode(id)
    if (node) openWindow(node.id, node.kind)
  }

  return (
    <div className={styles.desktop} onClick={() => setSelectedIcon(null)}>
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
            onClose={() => close(win.id)}
          >
            {win.kind} window — content lands in sections 5-8
          </Window>
        ))}
    </div>
  )
}
