import styles from './FolderGlyph.module.css'

interface FolderGlyphProps {
  /** 'desktop' also covers the file-pane icon grid — same dimensions there. */
  size?: 'desktop' | 'row'
}

export function FolderGlyph({ size = 'desktop' }: FolderGlyphProps) {
  return (
    <div className={size === 'row' ? `${styles.folder} ${styles.row}` : styles.folder}>
      <div className={styles.tab} />
    </div>
  )
}
