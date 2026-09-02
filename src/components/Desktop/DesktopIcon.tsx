import { FolderGlyph } from './glyphs/FolderGlyph'
import { DocumentGlyph } from './glyphs/DocumentGlyph'
import styles from './DesktopIcon.module.css'

export type DesktopIconGlyph = 'folder' | 'document'

interface DesktopIconProps {
  label: string
  glyph: DesktopIconGlyph
  selected: boolean
  onSelect: () => void
  onOpen: () => void
}

export function DesktopIcon({ label, glyph, selected, onSelect, onOpen }: DesktopIconProps) {
  return (
    <div
      className={styles.icon}
      role="button"
      tabIndex={0}
      onClick={(e) => {
        e.stopPropagation()
        onSelect()
      }}
      onDoubleClick={(e) => {
        e.stopPropagation()
        onOpen()
      }}
      onKeyDown={(e) => {
        // Enter opens (matches double-click); Space selects (matches
        // single-click) — deliberately different keys for different actions,
        // unlike the plain single-action buttons elsewhere.
        if (e.key === 'Enter') {
          e.preventDefault()
          onOpen()
        } else if (e.key === ' ') {
          e.preventDefault()
          onSelect()
        }
      }}
    >
      {glyph === 'folder' ? <FolderGlyph /> : <DocumentGlyph />}
      <span className={selected ? `${styles.label} ${styles.selected}` : styles.label}>
        {label}
      </span>
    </div>
  )
}
