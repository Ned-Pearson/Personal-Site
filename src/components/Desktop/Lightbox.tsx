import { useEffect } from 'react'
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

// Backdrop, window shell, title bar, nav buttons, image area, footer, and
// dismiss all match Plan.md's "Media Viewer" spec (README.md section 16),
// reusing Window.module.css's own chrome values (border, bevels, drop-shadow,
// navy title-bar gradient) rather than inventing new ones. Prev/Next and the
// counter only render for Media items — the Overview shot isn't part of the
// media[] array, so there's nothing to page through — but the dismiss hint
// applies either way.
export function Lightbox({ title, project, index, onIndexChange, onClose }: LightboxProps) {
  const isOverview = index === -1
  const total = project.media.length
  const src = isOverview ? project.screenshotSrc : project.media[index].src
  const caption = isOverview ? undefined : project.media[index].caption
  // Nothing to page through with a single item either — same reasoning as
  // the Overview shot not having nav.
  const showNav = !isOverview && total > 1

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.box} onClick={(e) => e.stopPropagation()}>
        <div className={styles.titleBar}>
          <span className={styles.title}>
            {title} — {isOverview ? 'Overview shot' : 'Media'}
          </span>
          <button className={styles.closeButton} aria-label="Close" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className={styles.body}>
          {showNav && (
            <button
              className={styles.navButton}
              aria-label="Previous"
              onClick={() => onIndexChange((index - 1 + total) % total)}
            >
              ‹
            </button>
          )}
          <div className={styles.imageArea}>
            <img className={styles.image} src={src} alt={caption ?? title} />
          </div>
          {showNav && (
            <button
              className={styles.navButton}
              aria-label="Next"
              onClick={() => onIndexChange((index + 1) % total)}
            >
              ›
            </button>
          )}
        </div>
        <div className={styles.footer}>
          <span>{showNav && `${index + 1} / ${total}`}</span>
          <span>Esc or click outside to close</span>
        </div>
      </div>
    </div>
  )
}
