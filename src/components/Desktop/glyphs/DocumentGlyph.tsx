import styles from './DocumentGlyph.module.css'

export function DocumentGlyph() {
  return (
    <div className={styles.document}>
      <span className={styles.rule} />
      <span className={styles.rule} />
      <span className={styles.rule} />
    </div>
  )
}
