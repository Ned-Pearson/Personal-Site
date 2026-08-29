import type { ProjectContent } from '../../data'
import styles from './Lightbox.module.css'

interface LightboxProps {
  title: string
  project: ProjectContent
  /** -1 = the Overview screenshot; otherwise an index into project.media. */
  index: number
  onIndexChange: (index: number) => void
  onClose: () => void
}

// Backdrop, window shell, and title bar match Plan.md's "Media Viewer" spec
// (README.md section 16) exactly, reusing Window.module.css's own chrome
// values (border, bevels, drop-shadow, navy title-bar gradient) rather than
// inventing new ones. Nav buttons/footer/dismiss-on-Esc/animation are still
// the plain placeholders from the first pass — later checklist points.
export function Lightbox({ title, project, index, onIndexChange, onClose }: LightboxProps) {
  const isOverview = index === -1
  const total = project.media.length
  const src = isOverview ? project.screenshotSrc : project.media[index].src
  const caption = isOverview ? undefined : project.media[index].caption

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.box} onClick={(e) => e.stopPropagation()}>
        <div className={styles.titleBar}>
          <span className={styles.title}>
            {title} — {isOverview ? 'Overview shot' : 'Media'}
          </span>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>
        <div className={styles.body}>
          {!isOverview && (
            <button className={styles.navButton} onClick={() => onIndexChange((index - 1 + total) % total)}>
              ‹
            </button>
          )}
          <img className={styles.image} src={src} alt={caption ?? title} />
          {!isOverview && (
            <button className={styles.navButton} onClick={() => onIndexChange((index + 1) % total)}>
              ›
            </button>
          )}
        </div>
        {!isOverview && (
          <div className={styles.footer}>
            {index + 1} / {total}
          </div>
        )}
      </div>
    </div>
  )
}
