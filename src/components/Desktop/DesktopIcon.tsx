import { FolderGlyph } from './glyphs/FolderGlyph'
import { DocumentGlyph } from './glyphs/DocumentGlyph'
import styles from './DesktopIcon.module.css'

export type DesktopIconGlyph = 'folder' | 'document'

interface DesktopIconProps {
  label: string
  glyph: DesktopIconGlyph
}

export function DesktopIcon({ label, glyph }: DesktopIconProps) {
  return (
    <div className={styles.icon}>
      {glyph === 'folder' ? <FolderGlyph /> : <DocumentGlyph />}
      <span className={styles.label}>{label}</span>
    </div>
  )
}
