import type { WindowView } from '../Desktop/useWindows'
import styles from './MobileToolbar.module.css'

interface MobileToolbarProps {
  onBack: () => void
  path: string
  view: WindowView
  onToggleView: () => void
}

// Mobile's folder toolbar (README.md section 14) — a single Back button (no
// Forward, unlike desktop), an RTL path field so a long path's tail (the
// current folder, not the C:\ned\ prefix) stays visible when it doesn't fit,
// and one view-toggle button showing the glyph of the view it switches *to*
// rather than desktop's two always-visible toggles. No View menu, no menu
// bar at all on mobile. Back is never disabled, unlike desktop's — the
// navigation model has it walk up the tree and then fall through to the
// desktop once there's no parent left, so there's always somewhere to go.
export function MobileToolbar({ onBack, path, view, onToggleView }: MobileToolbarProps) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.back} onClick={onBack}>
        ← Back
      </div>
      <div className={styles.pathField}>{path}</div>
      <div className={styles.viewToggle} onClick={onToggleView}>
        {view === 'list' ? '▦' : '≣'}
      </div>
    </div>
  )
}
