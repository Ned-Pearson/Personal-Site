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

// Header matches WindowScreen's real chrome (gradient, icon chip, title
// truncation). Image area is the same sunken recessed panel window bodies
// use (chrome + inset bevel) with an 8px teal-wallpaper margin, not a
// blacked-out photo-viewer look. Dismiss is ✕ only by design — no Esc (no
// keyboard on mobile), no backdrop-tap (there's no backdrop, this is a
// full-screen surface), no swipe. The open animation is still the plain
// placeholder from the first pass — a later checklist point.
export function MobileLightbox({ title, iconColor, project, index, onIndexChange, onClose }: MobileLightboxProps) {
  const isOverview = index === -1
  const total = project.media.length
  const src = isOverview ? project.screenshotSrc : project.media[index].src
  const caption = isOverview ? undefined : project.media[index].caption
  // Nothing to page through with a single item either — same reasoning as
  // the Overview shot not having nav.
  const showNav = !isOverview && total > 1

  return (
    <div className={styles.overlay}>
      <div className={styles.header}>
        <div className={styles.iconChip} style={{ background: iconColor }} />
        <span className={styles.title}>
          {title} — {isOverview ? 'Overview shot' : 'Media'}
        </span>
        <button className={styles.closeButton} aria-label="Close" onClick={onClose}>
          ✕
        </button>
      </div>
      <div className={styles.imageArea}>
        <div className={styles.panel}>
          <img className={styles.image} src={src} alt={caption ?? title} />
        </div>
      </div>
      {showNav && (
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
