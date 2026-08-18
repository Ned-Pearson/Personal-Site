import type { AboutContent } from '../../data'
import { TabBar } from './TabBar'
import styles from './AboutWindow.module.css'

const TABS = ['General', 'Skills', 'Contact']

interface AboutWindowProps {
  tab: number
  about: AboutContent
  shippedCount: number
  onSelectTab: (index: number) => void
}

// Tab bar + body shell (About's own padding/gap — distinct from ProjectWindow's).
// Skills and Contact tab content are later points still.
export function AboutWindow({ tab, about, shippedCount, onSelectTab }: AboutWindowProps) {
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
                    {about.stack.map((item) => (
                      <div key={item} className={styles.chip}>
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
          {tab === 1 && 'Skills tab content — next point'}
          {tab === 2 && 'Contact tab content — next point'}
        </div>
      </div>
    </>
  )
}
