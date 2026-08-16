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

// Placeholder open position — the cascading formula (132/40 + 30/28 per open
// window, clamped to viewport) lands in a later point.
const DEFAULT_X = 132
const DEFAULT_Y = 40

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

      const [w, h] = DEFAULT_SIZE[kind]
      const z = s.z + 1
      const win: WindowState = {
        id: s.nextId,
        node,
        kind,
        x: DEFAULT_X,
        y: DEFAULT_Y,
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

  return { windows: state.windows, focused: state.focused, recent: state.recent, openWindow, focus, close }
}
