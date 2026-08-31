import type { AboutContent } from '../../data'
import { TabBar } from './TabBar'
import { activateOnKey } from '../../utils/activateOnKey'
import styles from './AboutWindow.module.css'

const TABS = ['General', 'Skills', 'Contact']

interface AboutWindowProps {
  tab: number
  about: AboutContent
  shippedCount: number
  onSelectTab: (index: number) => void
  onClose: () => void
}

// Tab bar + body shell (About's own padding/gap — distinct from ProjectWindow's).
export function AboutWindow({ tab, about, shippedCount, onSelectTab, onClose }: AboutWindowProps) {
  return (
    <>
      <TabBar labels={TABS} activeIndex={tab} onSelect={onSelectTab} />
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
                    <div className={styles.factLabel}>Projects</div>
                    <div>{shippedCount} shipped</div>
                    <div className={styles.factLabel}>Since</div>
                    <div>{about.since}</div>
                    <div className={styles.factLabel}>Status</div>
                    <div>{about.status}</div>
                  </div>
                </div>
              </div>
            </>
          )}
          {tab === 1 && (
            <div className={styles.skills}>
              <div className={styles.label}>SKILLS</div>
              {about.skills.map((group) => (
                <div key={group.label} className={styles.column}>
                  <div className={styles.label}>{group.label}</div>
                  <div className={styles.chips}>
                    {group.items.map((item, i) => (
                      <div key={i} className={styles.chip}>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          {tab === 2 && (
            <div className={styles.contact}>
              <div className={styles.label}>GET IN TOUCH</div>
              <div className={styles.contactGrid}>
                <div className={styles.factLabel}>Email</div>
                <div>{about.email}</div>
                <div className={styles.factLabel}>GitHub</div>
                <a className={styles.link} href={about.githubUrl} target="_blank" rel="noopener noreferrer">
                  {about.github}
                </a>
                <div className={styles.factLabel}>Location</div>
                <div>{about.location}</div>
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
      <div className={styles.windowFooter}>
        <div className={styles.button} role="button" tabIndex={0} onClick={onClose} onKeyDown={activateOnKey(onClose)}>
          OK
        </div>
        <div className={styles.button} role="button" tabIndex={0} onClick={onClose} onKeyDown={activateOnKey(onClose)}>
          Cancel
        </div>
      </div>
    </>
  )
}
