import styles from './ProjectGlyph.module.css'

interface ProjectGlyphProps {
  /** Category accent colour (CSS value) for the top bar. */
  colour: string
  /** 'mobile' is the scaled-up size for the mobile folder grid view. */
  size: 'row' | 'grid' | 'mobile'
}

export function ProjectGlyph({ colour, size }: ProjectGlyphProps) {
  const sizeClass = size === 'grid' ? styles.grid : size === 'mobile' ? styles.mobile : ''
  return (
    <div className={sizeClass ? `${styles.project} ${sizeClass}` : styles.project}>
      <div className={styles.topBar} style={{ background: colour }} />
      <div className={styles.stripes} />
    </div>
  )
}
