import { getAllNodes, type Node } from '../../data'
import { FolderGlyph } from '../Desktop/glyphs/FolderGlyph'
import { ProjectGlyph } from '../Desktop/glyphs/ProjectGlyph'
import { DocumentGlyph } from '../Desktop/glyphs/DocumentGlyph'
import styles from './GoToTray.module.css'

function itemGlyph(node: Node) {
  if (node.kind === 'folder') return <FolderGlyph size="row" />
  if (node.kind === 'project') return <ProjectGlyph colour={node.colour ?? 'var(--color-bevel-mid)'} size="row" />
  return <DocumentGlyph size="row" />
}

interface GoToTrayProps {
  onSelect: (id: string) => void
  onDismiss: () => void
}

// Mobile's Go-to tray (README.md section 14) — bottom-sheet replacement for
// the Start menu: every destination as one flat list, since there's no hover
// to drive desktop's nested category flyouts on touch. Opened/closed via the
// np button; tapping the (invisible) backdrop also dismisses it, since
// mobile has no equivalent of Desktop's global click-closes-menus handler.
// The `trayUp` entrance animation is a later bullet, same as `sheetUp` was
// for the window screen shell.
export function GoToTray({ onSelect, onDismiss }: GoToTrayProps) {
  return (
    <div className={styles.backdrop} onClick={onDismiss}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        {getAllNodes().map((item) => (
          <div key={item.id} className={styles.row} onClick={() => onSelect(item.id)}>
            <div className={styles.rowGlyph}>{itemGlyph(item)}</div>
            <div className={styles.rowLabel}>{item.name}</div>
          </div>
        ))}
        <div className={styles.row} onClick={() => onSelect('about')}>
          <div className={styles.rowGlyph}>
            <DocumentGlyph size="row" />
          </div>
          <div className={styles.rowLabel}>About Me</div>
        </div>
      </div>
    </div>
  )
}
