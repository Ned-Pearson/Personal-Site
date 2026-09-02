import { useEffect, useRef, type KeyboardEvent } from 'react'
import { focusAdjacentMenuItem, focusFirstMenuItem } from '../../utils/menuNavigation'
import styles from './ContextMenu.module.css'

export interface ContextMenuItem {
  label: string
  onClick: () => void
  disabled?: boolean
}

interface ContextMenuProps {
  x: number
  y: number
  items: ContextMenuItem[]
  onClose: () => void
}

export function ContextMenu({ x, y, items, onClose }: ContextMenuProps) {
  const ref = useRef<HTMLDivElement>(null)

  // Autofocus the first enabled item — there's no separate trigger button to
  // leave focus on (this opens from a bare right-click), so the menu itself
  // has to pick up keyboard focus the moment it appears.
  useEffect(() => {
    focusFirstMenuItem(ref.current)
  }, [])

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {
      e.preventDefault()
      focusAdjacentMenuItem(e.currentTarget, 1)
    } else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
      e.preventDefault()
      focusAdjacentMenuItem(e.currentTarget, -1)
    } else if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      const menuItems = [...e.currentTarget.querySelectorAll<HTMLElement>('[role="menuitem"]')]
      const index = menuItems.indexOf(document.activeElement as HTMLElement)
      if (index !== -1) items[index]?.onClick()
    }
  }

  return (
    <div
      ref={ref}
      className={styles.panel}
      style={{ left: x, top: y }}
      role="menu"
      onMouseDown={(e) => e.stopPropagation()}
      onKeyDown={handleKeyDown}
    >
      {items.map((item, i) => (
        <div
          key={i}
          role="menuitem"
          tabIndex={-1}
          aria-disabled={item.disabled}
          className={item.disabled ? `${styles.item} ${styles.itemDisabled}` : styles.item}
          onClick={(e) => {
            e.stopPropagation()
            item.onClick()
          }}
        >
          {item.label}
        </div>
      ))}
    </div>
  )
}
