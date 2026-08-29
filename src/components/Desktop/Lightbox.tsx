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

// First pass (README.md section 16, points 1-2): state and click-to-open
// triggers wired end to end with a plain functional overlay. The retro
// window chrome specified in Plan.md's "Media Viewer" section (backdrop,
// title-bar copy, bevelled nav sizing, dismiss-on-Esc, animation) lands in
// later commits — this is deliberately not styled to spec yet.
export function Lightbox({ title, project, index, onIndexChange, onClose }: LightboxProps) {
  const isOverview = index === -1
  const total = project.media.length
  const src = isOverview ? project.screenshotSrc : project.media[index].src
  const caption = isOverview ? undefined : project.media[index].caption

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.box} onClick={(e) => e.stopPropagation()}>
        <div className={styles.titleBar}>
          <span>
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
