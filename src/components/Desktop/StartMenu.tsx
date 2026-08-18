import styles from './StartMenu.module.css'

// Left rail + panel shell only. Search field, rows, flyouts are later points.
// Stops its own click from bubbling to the desktop's close-everything handler,
// matching Taskbar/menu surfaces elsewhere.
export function StartMenu() {
  return (
    <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
      <div className={styles.rail}>
        <div className={styles.railLabel}>ned pearson</div>
      </div>
      <div className={styles.content} />
    </div>
  )
}
