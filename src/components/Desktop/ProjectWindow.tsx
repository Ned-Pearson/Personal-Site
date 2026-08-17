import { TabBar } from './TabBar'
import styles from './ProjectWindow.module.css'

const TABS = ['Overview', 'Write-up', 'Media']

interface ProjectWindowProps {
  tab: number
  onSelectTab: (index: number) => void
}

// Tab bar + the shared sunken-panel/white-sheet body shell. Each tab's real
// content (Overview/Write-up/Media) is its own later point.
export function ProjectWindow({ tab, onSelectTab }: ProjectWindowProps) {
  return (
    <>
      <TabBar labels={TABS} activeIndex={tab} onSelect={onSelectTab} />
      <div className={styles.bodyPanel}>
        <div className={styles.sheet}>{TABS[tab]} tab content — next points</div>
      </div>
    </>
  )
}
