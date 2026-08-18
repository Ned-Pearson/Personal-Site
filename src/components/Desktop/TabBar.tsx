import styles from './TabBar.module.css'

interface TabBarProps {
  labels: string[]
  activeIndex: number
  onSelect: (index: number) => void
}

// Shared by project windows (Overview/Write-up/Media) and, later, the About
// Me window (General/Skills/Contact) — same mechanics, different labels.
export function TabBar({ labels, activeIndex, onSelect }: TabBarProps) {
  return (
    <div className={styles.tabBar}>
      {labels.map((label, i) => (
        <div
          key={label}
          className={i === activeIndex ? `${styles.tab} ${styles.tabActive}` : styles.tab}
          onClick={(e) => {
            e.stopPropagation()
            onSelect(i)
          }}
        >
          {label}
        </div>
      ))}
    </div>
  )
}
