import type { DocContent } from '../../data'
import styles from './TextViewer.module.css'

interface TextViewerProps {
  doc: DocContent
}

export function TextViewer({ doc }: TextViewerProps) {
  return (
    <div className={styles.sheet}>
      <div className={styles.heading}>{doc.heading}</div>
      {doc.paragraphs.map((paragraph, i) => (
        <p key={i} className={styles.paragraph}>
          {paragraph}
        </p>
      ))}
      <div className={styles.endOfFile}>— end of file —</div>
    </div>
  )
}
