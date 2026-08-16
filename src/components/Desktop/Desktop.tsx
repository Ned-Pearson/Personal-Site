import { useState } from 'react'
import { getNode } from '../../data'
import { DesktopIcon } from './DesktopIcon'
import styles from './Desktop.module.css'

const projectsNode = getNode('projects')!
const readmeNode = getNode('readme')!

export function Desktop() {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)

  return (
    <div className={styles.desktop} onClick={() => setSelectedIcon(null)}>
      <div className={styles.iconColumn}>
        <DesktopIcon
          label={projectsNode.name}
          glyph="folder"
          selected={selectedIcon === projectsNode.id}
          onSelect={() => setSelectedIcon(projectsNode.id)}
        />
        <DesktopIcon
          label="About Me"
          glyph="document"
          selected={selectedIcon === 'about'}
          onSelect={() => setSelectedIcon('about')}
        />
        <DesktopIcon
          label={readmeNode.name}
          glyph="document"
          selected={selectedIcon === readmeNode.id}
          onSelect={() => setSelectedIcon(readmeNode.id)}
        />
      </div>
    </div>
  )
}
