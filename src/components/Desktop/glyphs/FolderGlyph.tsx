import styles from './FolderGlyph.module.css'

interface FolderGlyphProps {
  /** 'desktop' also covers the file-pane icon grid — same dimensions there. 'mobile' is the scaled-up size for the mobile root screen. */
  size?: 'desktop' | 'row' | 'mobile'
}

export function FolderGlyph({ size = 'desktop' }: FolderGlyphProps) {
  const sizeClass = size === 'row' ? styles.row : size === 'mobile' ? styles.mobile : ''
  return (
    <div className={sizeClass ? `${styles.folder} ${sizeClass}` : styles.folder}>
      <div className={styles.tab} />
    </div>
  )
}
