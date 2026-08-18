import type { ProjectContent } from '../../data'
import { TabBar } from './TabBar'
import styles from './ProjectWindow.module.css'

const TABS = ['Overview', 'Write-up', 'Media']

interface ProjectWindowProps {
  tab: number
  name: string
  project: ProjectContent
  onSelectTab: (index: number) => void
}

// Tab bar + the shared sunken-panel/white-sheet body shell. Write-up and
// Media tab content are later points still; Source/Live demo are static
// per spec/prototype — neither is wired to actually open a URL anywhere.
export function ProjectWindow({ tab, name, project, onSelectTab }: ProjectWindowProps) {
  return (
    <>
      <TabBar labels={TABS} activeIndex={tab} onSelect={onSelectTab} />
      <div className={styles.bodyPanel}>
        <div className={styles.sheet}>
          {tab === 0 ? (
            <>
              <div className={styles.header}>
                <div className={styles.name}>{name}</div>
                <div className={styles.dateStatus}>
                  {project.date} · {project.status}
                </div>
              </div>
              <div className={styles.screenshot}>screenshot — 800×260</div>
              <p className={styles.blurb}>{project.blurb}</p>
              <div className={styles.tags}>
                {project.tags.map((tag) => (
                  <div key={tag} className={styles.tag}>
                    {tag}
                  </div>
                ))}
              </div>
              <div className={styles.footer}>
                <div className={styles.button}>Source</div>
                <div className={styles.button}>Live demo</div>
              </div>
            </>
          ) : (
            `${TABS[tab]} tab content — next points`
          )}
        </div>
      </div>
    </>
  )
}
