import styles from './DocumentGlyph.module.css'

interface DocumentGlyphProps {
  /** 'mobile' is the scaled-up size for the mobile root screen. */
  size?: 'desktop' | 'grid' | 'row' | 'mobile'
}

export function DocumentGlyph({ size = 'desktop' }: DocumentGlyphProps) {
  const sizeClass = size === 'grid' ? styles.grid : size === 'row' ? styles.row : size === 'mobile' ? styles.mobile : ''
  return (
    <div className={sizeClass ? `${styles.document} ${sizeClass}` : styles.document}>
      <span className={styles.rule} />
      <span className={styles.rule} />
      <span className={styles.rule} />
    </div>
  )
}
