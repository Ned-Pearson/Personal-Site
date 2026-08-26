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
    date: 'Aug 2026',
    status: 'shipped',
    blurb:
      'A local-first desktop to-do app built with Tauri, React, and SQLite, with recurring tasks, tag inheritance, drag-and-drop, and a signed self-updater.',
    tags: ['Tauri', 'React', 'TypeScript', 'SQLite'],
    writeUp: [
      'A desktop to-do app I built for myself after one too many options were missing the features I wanted. It runs entirely on your machine: tasks, tags, recurring schedules, subtasks, and notes all live in a single SQLite file, with no account, no server, and no network calls required.',
      "Built with Tauri: a small Rust host process owns the window and the SQLite connection, while the interface itself is React and TypeScript rendered in the OS's native webview. That split keeps the binary a few MB and idle memory low next to an Electron app, at the cost of the frontend needing an explicit, capability-gated command for anything that touches the filesystem or database.",
      "A few pieces I'm proud of: tag inheritance for subtasks runs through a recursive SQL CTE rather than duplicated data, so untagging a parent instantly and correctly updates every descendant on the next read. Recurring tasks keep exactly one live row per series and project the rest on demand, and the app ships a self-updater with a signed release pipeline through GitHub Actions.",
      "There's no automated end-to-end test suite. Correctness instead leaned on a layered set of cheaper checks: TypeScript and Rust's own compiler catching whole classes of bugs at build time, a small Vitest suite for pure logic like date math and recurrence, and manual testing for everything UI-shaped. That held up fine solo, but wouldn't scale past one contributor.",
      "The biggest learning opportunity here was managing scope creep and planning more thoroughly up front. The app started as a simple day to day task list, and recurring schedules, subtasks, and tag inheritance were all added as I went rather than designed in from day one.",
      "A couple of sections needed a mid-project refactor once they had to support more than the original design allowed for. Recurrence outgrew its inline form fields and got extracted into its own module, and lists, originally just saved tag filters, had to be pulled apart from tags once they needed their own identity.",
      "Cloud sync and an iOS companion app are both deliberately deferred rather than built. They're genuinely interesting problems (conflict resolution across devices, Apple's provisioning and signing model), just not ones this particular project needed to answer to be worth shipping. I'd rather build a couple of different portfolio projects first than sink more months into this one alone.",
    ],
    media: [{ caption: 'Media' }, { caption: 'Media' }],
    sourceUrl: 'https://github.com/Ned-Pearson/todo-app',
  },
}
