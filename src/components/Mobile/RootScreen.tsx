import { getNode } from '../../data'
import { FolderGlyph } from '../Desktop/glyphs/FolderGlyph'
import { DocumentGlyph } from '../Desktop/glyphs/DocumentGlyph'
import styles from './RootScreen.module.css'

const projectsNode = getNode('projects')!
const readmeNode = getNode('readme')!

interface RootScreenProps {
  onOpen: (node: string) => void
}

// Mobile's desktop-root screen (README.md section 14) — same three
// destinations as the desktop icon column, sourced from the same shared data
// layer rather than a duplicated list. Tap opens directly (no double-tap, no
// select-then-open); :active is the only feedback — no hover, no selection,
// per spec.
export function RootScreen({ onOpen }: RootScreenProps) {
  const items = [
    { id: projectsNode.id, label: projectsNode.name, glyph: <FolderGlyph size="mobile" /> },
    { id: 'about', label: 'About Me', glyph: <DocumentGlyph size="mobile" /> },
    { id: readmeNode.id, label: readmeNode.name, glyph: <DocumentGlyph size="mobile" /> },
  ]

  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <div key={item.id} className={styles.cell} onClick={() => onOpen(item.id)}>
          {item.glyph}
          <span className={styles.label}>{item.label}</span>
        </div>
      ))}
    </div>
  )
}
