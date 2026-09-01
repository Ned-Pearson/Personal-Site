import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { PHASE_ANIMATION, type WindowPhase } from './useWindows'
import { activateOnKey } from '../../utils/activateOnKey'
import styles from './Window.module.css'

interface WindowProps {
  id: number
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
  /** Per-instance overrides for the global MIN_W/MIN_H — e.g. a project window with a screenshot needs more width than the default so the image never has to shrink. */
  minWidth?: number
  minHeight?: number
  onFocus: () => void
  onMove: (x: number, y: number) => void
  onResize: (w: number, h: number) => void
  onToggleMax: () => void
  onMinimize: () => void
  onClose: () => void
  /** Clears any active animation phase — called when a drag or resize starts, so a half-finished animation can't fight the pointer transform. */
  onInterrupt: () => void
  children?: ReactNode
}

const MIN_W = 320
const MIN_H = 180

export function Window({
  id,
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
  minWidth = MIN_W,
  minHeight = MIN_H,
  onFocus,
  onMove,
  onResize,
  onToggleMax,
  onMinimize,
  onClose,
  onInterrupt,
  children,
}: WindowProps) {
  const ref = useRef<HTMLDivElement>(null)

  // Genie origin: for the minimise/restore fly-out/fly-in, point the scale
  // toward this window's own taskbar button rather than screen centre.
  // Measured directly (not via state) and applied straight to the DOM node
  // in a layout effect so it's in place before the browser paints the first
  // animation frame. Falls back to PHASE_ANIMATION's 'center' below if the
  // button can't be found (e.g. taskbar not yet mounted).
  //
  // Deliberately uses the `x`/`y` props rather than the window's own
  // getBoundingClientRect(): with `animation-fill-mode: both`, the moment
  // the animation style is applied the element is already sitting in its
  // 'from' keyframe — for 'restoring' that's `scale(0.05)` — so measuring
  // the window element here would read its shrunk transformed box, not its
  // real position. `x`/`y` are the untransformed CSS left/top and aren't
  // affected. Only the taskbar button (never transformed) needs measuring.
  useLayoutEffect(() => {
    if (phase !== 'minimizing' && phase !== 'restoring') return
    const el = ref.current
    const button = document.querySelector<HTMLElement>(`[data-task-id="${id}"]`)
    if (!el || !button) return
    const buttonRect = button.getBoundingClientRect()
    const originX = buttonRect.left + buttonRect.width / 2 - x
    const originY = buttonRect.top + buttonRect.height / 2 - y
    el.style.transformOrigin = `${originX}px ${originY}px`
  }, [id, phase, x, y])

  function startDrag(e: React.MouseEvent) {
    if (e.button !== 0 || maximized) return
    e.preventDefault()
    onInterrupt()
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
    onInterrupt()
    const startX = e.clientX
    const startY = e.clientY
    const startW = w
    const startH = h

    function move(ev: MouseEvent) {
      onResize(
        Math.max(minWidth, Math.min(window.innerWidth - x - 4, startW + (ev.clientX - startX))),
        Math.max(minHeight, Math.min(window.innerHeight - 30 - y - 4, startH + (ev.clientY - startY)))
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
      ref={ref}
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
          <div
            className={styles.button}
            role="button"
            tabIndex={focused ? 0 : -1}
            aria-label="Minimise"
            onClick={onMinimize}
            onKeyDown={activateOnKey(onMinimize)}
          >
            <span className={styles.minGlyph} />
          </div>
          <div
            className={styles.button}
            role="button"
            tabIndex={focused ? 0 : -1}
            aria-label={maximized ? 'Restore' : 'Maximise'}
            onClick={onToggleMax}
            onKeyDown={activateOnKey(onToggleMax)}
          >
            <span className={styles.maxGlyph} />
          </div>
          <div
            className={styles.button}
            role="button"
            tabIndex={focused ? 0 : -1}
            aria-label="Close"
            onClick={onClose}
            onKeyDown={activateOnKey(onClose)}
          >
            ✕
          </div>
        </div>
      </div>
      <div className={styles.body}>{children}</div>
      {!maximized && <div className={styles.resizeGrip} onMouseDown={startResize} />}
    </div>
  )
}
