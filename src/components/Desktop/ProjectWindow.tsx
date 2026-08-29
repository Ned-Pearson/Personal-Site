import type { ProjectContent } from '../../data'
import { TabBar } from './TabBar'
import styles from './ProjectWindow.module.css'

const BASE_TABS = ['Overview', 'Write-up']

interface ProjectWindowProps {
  tab: number
  name: string
  project: ProjectContent
  onSelectTab: (index: number) => void
}

// Tab bar + the shared sunken-panel/white-sheet body shell. Source links out
// when set; otherwise it's an inert "No source available" button. Live demo
// only renders at all when there's actually a URL for it. The screenshot
// renders at its own natural size with no border/box — Desktop.tsx gives
// project windows with a screenshot a large enough minWidth that it never
// needs to shrink (see windowMinWidth there). Media tab only shows up once
// there's actually media — until then there's nothing for tab index 2 to
// select into, so it can never be reached.
export function ProjectWindow({ tab, name, project, onSelectTab }: ProjectWindowProps) {
  const tabs = project.media.length > 0 ? [...BASE_TABS, 'Media'] : BASE_TABS
  return (
    <>
      <TabBar labels={tabs} activeIndex={tab} onSelect={onSelectTab} />
      <div className={styles.bodyPanel}>
        <div className={styles.sheet}>
          {tab === 0 && (
            <>
              <div className={styles.header}>
                <div className={styles.name}>{name}</div>
                <div className={styles.dateStatus}>
                  {project.date} · {project.status}
                </div>
              </div>
              {project.screenshotSrc ? (
                <img className={styles.screenshotImage} src={project.screenshotSrc} alt={`${name} overview`} />
              ) : (
                <div className={styles.screenshot}>screenshot — 800×260</div>
              )}
              <p className={styles.blurb}>{project.blurb}</p>
              <div className={styles.tags}>
                {project.tags.map((tag, i) => (
                  <div key={i} className={styles.tag}>
                    {tag}
                  </div>
                ))}
              </div>
              <div className={styles.footer}>
                {project.sourceUrl ? (
                  <a className={styles.button} href={project.sourceUrl} target="_blank" rel="noopener noreferrer">
                    Source
                  </a>
                ) : (
                  <div className={`${styles.button} ${styles.buttonDisabled}`}>No source available</div>
                )}
                {project.liveUrl && (
                  <a className={styles.button} href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    Live demo
                  </a>
                )}
              </div>
            </>
          )}
          {tab === 1 && (
            <div className={styles.writeup}>
              <div className={styles.writeupLabel}>WRITE-UP</div>
              {project.writeUp.map((paragraph, i) => (
                <p key={i} className={styles.writeupParagraph}>
                  {paragraph}
                </p>
              ))}
            </div>
          )}
          {tab === 2 && (
            <div className={styles.media}>
              {project.media.map((item, i) => (
                <div key={i} className={styles.mediaTile}>
                  <div className={styles.mediaImageBox}>
                    <img className={styles.mediaImage} src={item.src} alt={item.caption} />
                  </div>
                  <div className={styles.mediaCaption}>{item.caption}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
