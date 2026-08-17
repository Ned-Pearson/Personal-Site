import styles from './DocumentGlyph.module.css'

interface DocumentGlyphProps {
  size?: 'desktop' | 'grid' | 'row'
}

export function DocumentGlyph({ size = 'desktop' }: DocumentGlyphProps) {
  const sizeClass = size === 'grid' ? styles.grid : size === 'row' ? styles.row : ''
  return (
    <div className={sizeClass ? `${styles.document} ${sizeClass}` : styles.document}>
      <span className={styles.rule} />
      <span className={styles.rule} />
      <span className={styles.rule} />
    </div>
  )
}
