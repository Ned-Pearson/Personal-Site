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
      onClick={(e) => {
        e.stopPropagation()
        onSelect()
      }}
      onDoubleClick={(e) => {
        e.stopPropagation()
        onOpen()
      }}
    >
      {glyph === 'folder' ? <FolderGlyph /> : <DocumentGlyph />}
      <span className={selected ? `${styles.label} ${styles.selected}` : styles.label}>
        {label}
      </span>
    </div>
  )
}
