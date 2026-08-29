import type { AboutContent } from '../../data'
import { TabBar } from '../Desktop/TabBar'
import styles from './MobileAboutContent.module.css'

const TABS = ['General', 'Skills', 'Contact']

interface MobileAboutContentProps {
  tab: number
  about: AboutContent
  shippedCount: number
  onSelectTab: (index: number) => void
}

// Mobile adaptation of the desktop AboutWindow (README.md section 14):
// full-width tabs, tightened sheet padding, portrait+info and the
// STACK/FACTS and Contact definition grids all collapse from side-by-side to
// stacked/full-width. No OK/Cancel footer — the window screen's own
// title-bar ✕ is the only dismiss.
export function MobileAboutContent({ tab, about, shippedCount, onSelectTab }: MobileAboutContentProps) {
  return (
    <>
      <TabBar labels={TABS} activeIndex={tab} onSelect={onSelectTab} fullWidth />
      <div className={styles.bodyPanel}>
        <div className={styles.sheet}>
          {tab === 0 && (
            <>
              <div className={styles.top}>
                <div className={styles.portrait}>portrait 420×510</div>
                <div className={styles.info}>
                  <div className={styles.name}>Ned Pearson</div>
                  <div className={styles.role}>{about.role}</div>
                  <p className={styles.bio}>{about.bio}</p>
                </div>
              </div>
              <div className={styles.rule} />
              <div className={styles.columns}>
                <div className={styles.column}>
                  <div className={styles.label}>STACK</div>
                  <div className={styles.chips}>
                    {about.stack.map((item, i) => (
                      <div key={i} className={styles.chip}>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.column}>
                  <div className={styles.label}>FACTS</div>
                  <div className={styles.facts}>
                    <div className={styles.fact}>
                      <div className={styles.factLabel}>Projects</div>
                      <div>{shippedCount} shipped</div>
                    </div>
                    <div className={styles.fact}>
                      <div className={styles.factLabel}>Since</div>
                      <div>{about.since}</div>
                    </div>
                    <div className={styles.fact}>
                      <div className={styles.factLabel}>Status</div>
                      <div>{about.status}</div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          {tab === 1 && (
            <div className={styles.skills}>
              <div className={styles.label}>SKILLS</div>
              <p className={styles.skillsPlaceholder}>Placeholder</p>
            </div>
          )}
          {tab === 2 && (
            <div className={styles.contact}>
              <div className={styles.label}>GET IN TOUCH</div>
              <div className={styles.contactGrid}>
                <div className={styles.fact}>
                  <div className={styles.factLabel}>Email</div>
                  <div>{about.email}</div>
                </div>
                <div className={styles.fact}>
                  <div className={styles.factLabel}>GitHub</div>
                  <a className={styles.link} href={about.githubUrl} target="_blank" rel="noopener noreferrer">
                    {about.github}
                  </a>
                </div>
                <div className={styles.fact}>
                  <div className={styles.factLabel}>Location</div>
                  <div>{about.location}</div>
                </div>
              </div>
              <div className={styles.footer}>
                <a className={styles.button} href={`mailto:${about.email}`}>
                  Send email
                </a>
                <a className={styles.button} href={about.resumeUrl} download="Edward Pearson CV.pdf">
                  Resume.pdf
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
