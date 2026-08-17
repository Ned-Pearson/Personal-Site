// Window-system state model. See Plan.md "State Management" and README.md
// section 4 (Window system — core engine).

import { useState } from 'react'
import type { NodeKind } from '../../data'

export type WindowKind = NodeKind | 'about'
export type WindowView = 'list' | 'grid'

/**
 * One open window. `node` is a NODES id, except for the About window ('about'),
 * which has no NODES entry. Geometry is absolute desktop coordinates;
 * px/py/pw/ph cache the pre-maximise geometry so restoring can undo it.
 */
export interface WindowState {
  id: number
  node: string
  kind: WindowKind
  x: number
  y: number
  w: number
  h: number
  z: number
  min: boolean
  max: boolean
  menu: boolean
  view: WindowView
  tab: number
  px?: number
  py?: number
  pw?: number
  ph?: number
}

/** Default width/height per window kind. See Plan.md's per-screen "Default size". */
const DEFAULT_SIZE: Record<WindowKind, [number, number]> = {
  folder: [560, 340],
  project: [600, 520],
  about: [560, 470],
  document: [500, 360],
}

// Cascading default open position: 132/40 base, +30/+28 per already-open
// window, cycling every 5 so it doesn't walk off-screen; clamped to viewport.
const CASCADE_BASE_X = 132
const CASCADE_BASE_Y = 40
const CASCADE_STEP_X = 30
const CASCADE_STEP_Y = 28
const CASCADE_CYCLE = 5

// Cap on stored recency history — the Start menu's Recent flyout (section 10)
// only ever shows the top 3, this just bounds how far back we remember.
const RECENT_LIMIT = 8

interface EngineState {
  windows: WindowState[]
  nextId: number
  z: number
  focused: number | null
  /** Project node ids, most-recently-opened first. Feeds the Start menu's Recent list. */
  recent: string[]
}

const initialState: EngineState = { windows: [], nextId: 1, z: 10, focused: null, recent: [] }

function pushRecent(recent: string[], node: string): string[] {
  return [node, ...recent.filter((n) => n !== node)].slice(0, RECENT_LIMIT)
}

/** Raises window `id` to the top of `z` and, if requested, un-minimises it. */
function focusInState(s: EngineState, id: number, unminimize: boolean): EngineState {
  const z = s.z + 1
  return {
    ...s,
    z,
    focused: id,
    windows: s.windows.map((w) => (w.id === id ? { ...w, z, min: unminimize ? false : w.min } : w)),
  }
}

export function useWindows() {
  const [state, setState] = useState<EngineState>(initialState)

  /** Opens `node`'s window, or focuses + un-minimises its existing window instead of duplicating it. */
  function openWindow(node: string, kind: WindowKind) {
    setState((s) => {
      const recent = kind === 'project' ? pushRecent(s.recent, node) : s.recent

      const existing = s.windows.find((w) => w.node === node)
      if (existing) return { ...focusInState(s, existing.id, true), recent }

      const vw = window.innerWidth
      const vh = window.innerHeight - 30
      const [sizeW, sizeH] = DEFAULT_SIZE[kind]
      const w = Math.min(sizeW, vw - 16)
      const h = Math.min(sizeH, vh - 16)
      const n = s.windows.length
      const x = Math.max(8, Math.min(CASCADE_BASE_X + (n % CASCADE_CYCLE) * CASCADE_STEP_X, vw - w - 8))
      const y = Math.max(8, Math.min(CASCADE_BASE_Y + (n % CASCADE_CYCLE) * CASCADE_STEP_Y, vh - h - 8))
      const z = s.z + 1
      const win: WindowState = {
        id: s.nextId,
        node,
        kind,
        x,
        y,
        w,
        h,
        z,
        min: false,
        max: false,
        menu: false,
        view: 'list',
        tab: 0,
      }
      return { windows: s.windows.concat([win]), nextId: s.nextId + 1, z, focused: s.nextId, recent }
    })
  }

  function focus(id: number, unminimize = false) {
    setState((s) => focusInState(s, id, unminimize))
  }

  function close(id: number) {
    setState((s) => ({
      ...s,
      windows: s.windows.filter((w) => w.id !== id),
      focused: s.focused === id ? null : s.focused,
    }))
  }

  /** Hides a window and clears focus if it was the focused one. Restoring happens via openWindow's dedup path (un-minimises on reopen) or the taskbar (section 9). */
  function minimize(id: number) {
    setState((s) => ({
      ...s,
      windows: s.windows.map((w) => (w.id === id ? { ...w, min: true } : w)),
      focused: s.focused === id ? null : s.focused,
    }))
  }

  /** Merges arbitrary field updates into one window — used by drag, resize, maximise. */
  function patch(id: number, updates: Partial<WindowState>) {
    setState((s) => ({ ...s, windows: s.windows.map((w) => (w.id === id ? { ...w, ...updates } : w)) }))
  }

  /** Maximises to fill the viewport minus the taskbar, storing prior geometry to restore on toggle back. */
  function toggleMaximize(id: number) {
    setState((s) => ({
      ...s,
      windows: s.windows.map((w) => {
        if (w.id !== id) return w
        if (w.max) return { ...w, max: false, x: w.px ?? w.x, y: w.py ?? w.y, w: w.pw ?? w.w, h: w.ph ?? w.h }
        return {
          ...w,
          max: true,
          px: w.x,
          py: w.y,
          pw: w.w,
          ph: w.h,
          x: 0,
          y: 0,
          w: window.innerWidth,
          h: window.innerHeight - 30,
        }
      }),
    }))
  }

  return {
    windows: state.windows,
    focused: state.focused,
    recent: state.recent,
    openWindow,
    focus,
    close,
    minimize,
    patch,
    toggleMaximize,
  }
}
