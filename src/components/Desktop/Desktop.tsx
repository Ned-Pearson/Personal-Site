import { useState } from 'react'
import { getNode } from '../../data'
import { DesktopIcon } from './DesktopIcon'
import { useWindows } from './useWindows'
import styles from './Desktop.module.css'

const projectsNode = getNode('projects')!
const readmeNode = getNode('readme')!

export function Desktop() {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
  const { openWindow } = useWindows()

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
    </div>
  )
}
