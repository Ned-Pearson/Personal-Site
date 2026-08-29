import type { ProjectContent } from '../../data'
import styles from './MobileLightbox.module.css'

interface MobileLightboxProps {
  title: string
  project: ProjectContent
  /** -1 = the Overview screenshot; otherwise an index into project.media. */
  index: number
  onIndexChange: (index: number) => void
  onClose: () => void
}

// First pass (README.md section 16, points 1-2): state and tap-to-open
// triggers wired end to end with a plain full-screen overlay. The mobile
// chrome specified in Plan.md's "Media Viewer" section (header icon chip,
// sunken image panel, bevelled Prev/Next bar, sheetUp animation) lands in
// later commits — this is deliberately not styled to spec yet.
export function MobileLightbox({ title, project, index, onIndexChange, onClose }: MobileLightboxProps) {
  const isOverview = index === -1
  const total = project.media.length
  const src = isOverview ? project.screenshotSrc : project.media[index].src
  const caption = isOverview ? undefined : project.media[index].caption

  return (
    <div className={styles.overlay}>
      <div className={styles.header}>
        <span>
          {title} — {isOverview ? 'Overview shot' : 'Media'}
        </span>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
      </div>
      <div className={styles.imageArea}>
        <img className={styles.image} src={src} alt={caption ?? title} />
      </div>
      {!isOverview && (
        <div className={styles.navBar}>
          <button className={styles.navButton} onClick={() => onIndexChange((index - 1 + total) % total)}>
            ‹ Prev
          </button>
          <div className={styles.counter}>
            {index + 1} / {total}
          </div>
          <button className={styles.navButton} onClick={() => onIndexChange((index + 1) % total)}>
            Next ›
          </button>
        </div>
      )}
    </div>
  )
}
