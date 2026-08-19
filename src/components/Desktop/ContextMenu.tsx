import styles from './ContextMenu.module.css'

interface ContextMenuProps {
  x: number
  y: number
}

// Items land in the next to-do point — this is just the positioned panel shell.
export function ContextMenu({ x, y }: ContextMenuProps) {
  return <div className={styles.panel} style={{ left: x, top: y }} onMouseDown={(e) => e.stopPropagation()} />
}
