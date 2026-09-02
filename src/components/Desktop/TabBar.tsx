import type { KeyboardEvent } from 'react'
import styles from './TabBar.module.css'

interface TabBarProps {
  labels: string[]
  activeIndex: number
  onSelect: (index: number) => void
  /** Mobile's Project/About windows stretch tabs to fill the bar equally; desktop tabs fit their content. */
  fullWidth?: boolean
  /** False while a different desktop window is focused, pulling the active
   * tab out of the Tab order too (README.md section 17's window-level tab
   * order). Defaults to true since mobile has no background-window concept
   * — only one screen is ever visible there. */
  windowFocused?: boolean
}

// Shared by project windows (Overview/Write-up/Media) and the About Me
// window (General/Skills/Contact) — same mechanics, different labels — plus
// mobile's equivalents, via `fullWidth`. WAI-ARIA tablist pattern: roving
// tabindex (only the active tab is Tab-reachable; the rest are -1) and
// automatic activation — ←/→/Home/End both move focus and select in one
// step, so there's no separate Enter needed to confirm a tab reached via
// arrow keys.
export function TabBar({ labels, activeIndex, onSelect, fullWidth, windowFocused = true }: TabBarProps) {
  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    let next = activeIndex
    if (e.key === 'ArrowRight') next = (activeIndex + 1) % labels.length
    else if (e.key === 'ArrowLeft') next = (activeIndex - 1 + labels.length) % labels.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = labels.length - 1
    else return
    e.preventDefault()
    onSelect(next)
    // Roving tabindex means DOM focus has to follow the newly active tab
    // too, not just the visual selection — otherwise a later Tab press
    // leaves focus stranded on a tab that's no longer in the tab order.
    ;(e.currentTarget.children[next] as HTMLElement | undefined)?.focus()
  }

  return (
    <div
      className={fullWidth ? `${styles.tabBar} ${styles.tabBarFull}` : styles.tabBar}
      role="tablist"
      onKeyDown={handleKeyDown}
    >
      {labels.map((label, i) => {
        const active = i === activeIndex
        const className = [styles.tab, active && styles.tabActive, fullWidth && styles.tabFull]
          .filter(Boolean)
          .join(' ')
        return (
          <div
            key={label}
            role="tab"
            aria-selected={active}
            tabIndex={windowFocused && active ? 0 : -1}
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
