// Static directory-tree data for folder windows (Projects, General, Machine Learning).
// See Plan.md "State Management" — window components should not care where this comes from.

export type NodeKind = 'folder' | 'project' | 'document'

export interface Node {
  id: string
  name: string
  kind: NodeKind
  type: string
  modified: string
  /** Category accent colour (CSS var), project nodes only */
  colour?: string
  parent: string | null
  children: string[]
}

export const NODES: Record<string, Node> = {
  projects: {
    id: 'projects',
    name: 'Projects',
    kind: 'folder',
    type: 'File folder',
    modified: '2026-08-01',
    parent: null,
    children: ['general', 'machine-learning', 'readme'],
  },
  general: {
    id: 'general',
    name: 'General',
    kind: 'folder',
    type: 'File folder',
    modified: '2026-07-18',
    parent: 'projects',
    children: ['todo-app'],
  },
  'machine-learning': {
    id: 'machine-learning',
    name: 'Machine Learning',
    kind: 'folder',
    type: 'File folder',
    modified: '2026-07-22',
    parent: 'projects',
    children: [],
  },
  readme: {
    id: 'readme',
    name: 'readme.txt',
    kind: 'document',
    type: 'Text Document',
    modified: '2026-08-01',
    parent: 'projects',
    children: [],
  },
  'todo-app': {
    id: 'todo-app',
    name: 'todo-app',
    kind: 'project',
    type: 'Project',
    modified: '2026-07-18',
    colour: 'var(--color-category-general)',
    parent: 'general',
    children: [],
  },
}
