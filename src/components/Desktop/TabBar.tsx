import styles from './TabBar.module.css'

interface TabBarProps {
  labels: string[]
  activeIndex: number
  onSelect: (index: number) => void
  /** Mobile's Project/About windows stretch tabs to fill the bar equally; desktop tabs fit their content. */
  fullWidth?: boolean
}

// Shared by project windows (Overview/Write-up/Media) and the About Me
// window (General/Skills/Contact) — same mechanics, different labels — plus
// mobile's equivalents, via `fullWidth`.
export function TabBar({ labels, activeIndex, onSelect, fullWidth }: TabBarProps) {
  return (
    <div className={fullWidth ? `${styles.tabBar} ${styles.tabBarFull}` : styles.tabBar}>
      {labels.map((label, i) => {
        const active = i === activeIndex
        const className = [styles.tab, active && styles.tabActive, fullWidth && styles.tabFull]
          .filter(Boolean)
          .join(' ')
        return (
          <div
            key={label}
            className={className}
            onClick={(e) => {
              e.stopPropagation()
              onSelect(i)
            }}
          >
            {label}
          </div>
        )
      })}
    </div>
  )
}
