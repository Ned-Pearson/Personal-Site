import type { DocContent } from '../../data'
import styles from './MobileTextViewer.module.css'

interface MobileTextViewerProps {
  doc: DocContent
}

// Mobile adaptation of the desktop TextViewer (README.md section 14):
// tightened padding (14px vs desktop's 24/28) and a smaller heading size —
// desktop's smallest heading token (--text-content-2xl, 20px) is still too
// large for a 390px-wide screen, hence the literal 17px here rather than
// reaching for a token that doesn't exist yet.
export function MobileTextViewer({ doc }: MobileTextViewerProps) {
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
