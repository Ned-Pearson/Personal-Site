import type { Node } from '../../data'
import type { WindowView } from '../Desktop/useWindows'
import { FolderGlyph } from '../Desktop/glyphs/FolderGlyph'
import { ProjectGlyph } from '../Desktop/glyphs/ProjectGlyph'
import { DocumentGlyph } from '../Desktop/glyphs/DocumentGlyph'
import styles from './FolderContents.module.css'

function rowGlyph(item: Node) {
  if (item.kind === 'folder') return <FolderGlyph size="row" />
  if (item.kind === 'project') return <ProjectGlyph colour={item.colour ?? 'var(--color-bevel-mid)'} size="row" />
  return <DocumentGlyph size="row" />
}

function gridGlyph(item: Node) {
  if (item.kind === 'folder') return <FolderGlyph size="mobile" />
  if (item.kind === 'project') return <ProjectGlyph colour={item.colour ?? 'var(--color-bevel-mid)'} size="mobile" />
  return <DocumentGlyph size="mobile" />
}

interface FolderContentsProps {
  view: WindowView
  items: Node[]
  onOpenRow: (id: string) => void
}

// Mobile's folder contents (README.md section 14). List view: touch-height
// rows (min-height 48px) with a trailing chevron and a single metadata line
// (type · modified) in place of desktop's separate Type/Modified columns —
// the status bar drops its own Modified field since it's now on every row.
// Grid view: two columns, the same scaled-up glyphs as the root screen.
export function FolderContents({ view, items, onOpenRow }: FolderContentsProps) {
  return (
    <div className={styles.pane}>
      {view === 'list' ? (
        <div className={styles.list}>
          {items.map((item) => (
            <div key={item.id} className={styles.row} onClick={() => onOpenRow(item.id)}>
              <div className={styles.rowGlyph}>{rowGlyph(item)}</div>
              <div className={styles.rowText}>
                <div className={styles.rowName}>{item.name}</div>
                <div className={styles.rowMeta}>
                  {item.type} · {item.modified}
                </div>
              </div>
              <div className={styles.chevron}>›</div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.grid}>
          {items.map((item) => (
            <div key={item.id} className={styles.gridCell} onClick={() => onOpenRow(item.id)}>
              {gridGlyph(item)}
              <span className={styles.gridLabel}>{item.name}</span>
            </div>
          ))}
        </div>
      )}
      <div className={styles.statusBar}>
        <div className={styles.statusField}>{items.length} object(s)</div>
      </div>
    </div>
  )
}
