// Static content for project windows (Overview / Write-up / Media tabs).
// Keyed by the same id as the matching 'project' node in NODES.
// Placeholder copy — see Plan.md "Content status": replace before launch.

export type ProjectStatus = 'shipped' | 'in progress' | 'archived'

export interface ProjectContent {
  id: string
  date: string
  status: ProjectStatus
  blurb: string
  tags: string[]
  writeUp: string[]
  media: { caption: string }[]
  sourceUrl?: string
  liveUrl?: string
}

export const PROJECTS: Record<string, ProjectContent> = {
  'todo-app': {
    id: 'todo-app',
    date: 'Jul 2026',
    status: 'shipped',
    blurb: 'Will enter later',
    tags: ['React', 'TypeScript', 'Vite', 'Local Storage'],
    writeUp: ['Will enter later'],
    media: [{ caption: 'Media' }, { caption: 'Media' }],
    sourceUrl: 'https://github.com/Ned-Pearson/todo-app',
  },
}
