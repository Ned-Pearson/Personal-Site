import type { ReactNode } from 'react'
import type { WindowPhase } from './useWindows'
import styles from './Window.module.css'

interface WindowProps {
  title: string
  iconColor: string
  focused: boolean
  x: number
  y: number
  w: number
  h: number
  z: number
  maximized: boolean
  phase: WindowPhase
  onFocus: () => void
  onMove: (x: number, y: number) => void
  onResize: (w: number, h: number) => void
  onToggleMax: () => void
  onMinimize: () => void
  onClose: () => void
  children?: ReactNode
}

const MIN_W = 320
const MIN_H = 180

/**
 * Per-phase animation/duration/easing/transform-origin (README section 12).
 * minimizing/restoring's transform-origin is a placeholder here — flying
 * toward the window's own taskbar button ("genie origin") is a later pass.
 */
const PHASE_ANIMATION: Record<
  NonNullable<WindowPhase>,
  { name: string; duration: number; easing: string; transformOrigin: string }
> = {
  opening: { name: 'winOpen', duration: 140, easing: 'ease-out', transformOrigin: 'center' },
  closing: { name: 'winClose', duration: 140, easing: 'ease-in', transformOrigin: 'center' },
  minimizing: { name: 'winMin', duration: 180, easing: 'ease-in', transformOrigin: 'center' },
  restoring: { name: 'winRestore', duration: 190, easing: 'ease-out', transformOrigin: 'center' },
}

export function Window({
  title,
  iconColor,
  focused,
  x,
  y,
  w,
  h,
  z,
  maximized,
  phase,
  onFocus,
  onMove,
  onResize,
  onToggleMax,
  onMinimize,
  onClose,
  children,
}: WindowProps) {
  function startDrag(e: React.MouseEvent) {
    if (e.button !== 0 || maximized) return
    e.preventDefault()
    const offsetX = e.clientX - x
    const offsetY = e.clientY - y

    function move(ev: MouseEvent) {
      onMove(
        Math.max(0, Math.min(window.innerWidth - 80, ev.clientX - offsetX)),
        Math.max(0, Math.min(window.innerHeight - 60, ev.clientY - offsetY))
      )
    }
    function up() {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
    }
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
  }

  // Grip is only rendered while !maximized, so no maximized guard needed here.
  function startResize(e: React.MouseEvent) {
    if (e.button !== 0) return
    e.preventDefault()
    e.stopPropagation()
    onFocus()
    const startX = e.clientX
    const startY = e.clientY
    const startW = w
    const startH = h

    function move(ev: MouseEvent) {
      onResize(
        Math.max(MIN_W, Math.min(window.innerWidth - x - 4, startW + (ev.clientX - startX))),
        Math.max(MIN_H, Math.min(window.innerHeight - 30 - y - 4, startH + (ev.clientY - startY)))
      )
    }
    function up() {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
    }
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
  }

  const anim = phase ? PHASE_ANIMATION[phase] : null

  return (
    <div
      className={focused ? `${styles.window} ${styles.focused}` : styles.window}
      style={{
        left: x,
        top: y,
        width: w,
        height: h,
        zIndex: z,
        ...(anim && {
          animationName: anim.name,
          animationDuration: `${anim.duration}ms`,
          animationTimingFunction: anim.easing,
          animationFillMode: 'both',
          transformOrigin: anim.transformOrigin,
        }),
      }}
      onMouseDown={onFocus}
    >
      <div className={styles.titleBar} onMouseDown={startDrag} onDoubleClick={onToggleMax}>
        <div className={styles.iconChip} style={{ background: iconColor }} />
        <div className={styles.title}>{title}</div>
        <div className={styles.buttons}>
          <div className={styles.button} onClick={onMinimize}>
            <span className={styles.minGlyph} />
          </div>
          <div className={styles.button} onClick={onToggleMax}>
            <span className={styles.maxGlyph} />
          </div>
          <div className={styles.button} onClick={onClose}>
            ✕
          </div>
        </div>
      </div>
      <div className={styles.body}>{children}</div>
      {!maximized && <div className={styles.resizeGrip} onMouseDown={startResize} />}
    </div>
  )
}
