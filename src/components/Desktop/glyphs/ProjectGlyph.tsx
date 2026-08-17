import styles from './ProjectGlyph.module.css'

interface ProjectGlyphProps {
  /** Category accent colour (CSS value) for the top bar. */
  colour: string
  size: 'row' | 'grid'
}

export function ProjectGlyph({ colour, size }: ProjectGlyphProps) {
  return (
    <div className={size === 'grid' ? `${styles.project} ${styles.grid}` : styles.project}>
      <div className={styles.topBar} style={{ background: colour }} />
      <div className={styles.stripes} />
    </div>
  )
}
