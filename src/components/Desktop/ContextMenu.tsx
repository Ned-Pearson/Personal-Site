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
}

export function ContextMenu({ x, y, items }: ContextMenuProps) {
  return (
    <div className={styles.panel} style={{ left: x, top: y }} onMouseDown={(e) => e.stopPropagation()}>
      {items.map((item, i) => (
        <div
          key={i}
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
