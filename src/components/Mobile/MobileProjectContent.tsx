import type { ProjectContent } from '../../data'
import { TabBar } from '../Desktop/TabBar'
import styles from './MobileProjectContent.module.css'

const TABS = ['Overview', 'Write-up', 'Media']

interface MobileProjectContentProps {
  tab: number
  name: string
  project: ProjectContent
  onSelectTab: (index: number) => void
}

// Mobile adaptation of the desktop ProjectWindow (README.md section 14):
// full-width tabs, tightened sheet padding, a single-column media grid, and
// Source/Live demo stacked full-width instead of side by side. Source links
// out when set, otherwise it's an inert "No source available" button; Live
// demo only renders when there's actually a URL for it — same as desktop's
// ProjectWindow.
export function MobileProjectContent({ tab, name, project, onSelectTab }: MobileProjectContentProps) {
  return (
    <>
      <TabBar labels={TABS} activeIndex={tab} onSelect={onSelectTab} fullWidth />
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
                <img className={styles.screenshot} src={project.screenshotSrc} alt={`${name} overview`} />
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
                  {item.caption}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
