import type { ProjectContent } from '../../data'
import styles from './MobileLightbox.module.css'

interface MobileLightboxProps {
  title: string
  iconColor: string
  project: ProjectContent
  /** -1 = the Overview screenshot; otherwise an index into project.media. */
  index: number
  onIndexChange: (index: number) => void
  onClose: () => void
}

// Header now matches Plan.md's spec (README.md section 16): navy gradient,
// the project's own category-colour icon chip (reusing WindowScreen's exact
// chip styling), a truncating title, and the 34×30 beveled ✕. Image
// area/nav bar/dismiss/animation are still the plain placeholders from the
// first pass — later checklist points.
export function MobileLightbox({ title, iconColor, project, index, onIndexChange, onClose }: MobileLightboxProps) {
  const isOverview = index === -1
  const total = project.media.length
  const src = isOverview ? project.screenshotSrc : project.media[index].src
  const caption = isOverview ? undefined : project.media[index].caption

  return (
    <div className={styles.overlay}>
      <div className={styles.header}>
        <div className={styles.iconChip} style={{ background: iconColor }} />
        <span className={styles.title}>
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
