// Static content for project windows (Overview / Write-up / Media tabs).
// Keyed by the same id as the matching 'project' node in NODES.
// Placeholder copy — see Plan.md "Content status": replace before launch.

import todoAppOverview from '../assets/projects/todo-app/main-view.jpg'
import todoAppMyDay from '../assets/projects/todo-app/my-day.jpg'
import todoAppCustomList from '../assets/projects/todo-app/custom-list.jpg'
import todoAppCalendar from '../assets/projects/todo-app/calendar.jpg'
import todoAppTaskDetails from '../assets/projects/todo-app/task-details.jpg'
import todoAppAddTask from '../assets/projects/todo-app/add-task.jpg'
import todoAppHistory from '../assets/projects/todo-app/history.jpg'
import todoAppNotes from '../assets/projects/todo-app/notes.jpg'
import todoAppStats from '../assets/projects/todo-app/stats.jpg'

export type ProjectStatus = 'shipped' | 'in progress' | 'archived'

export interface ProjectContent {
  id: string
  date: string
  status: ProjectStatus
  blurb: string
  tags: string[]
  writeUp: string[]
  /** Overview tab screenshot. Falls back to the striped placeholder when absent. */
  screenshotSrc?: string
  /** Natural width/height ratio of screenshotSrc — lets the window enforce a
   * minimum width so the image always renders at its natural size instead
   * of needing to shrink. Required whenever screenshotSrc is set. */
  screenshotAspect?: number
  media: { caption: string; src: string }[]
  sourceUrl?: string
  liveUrl?: string
}

export const PROJECTS: Record<string, ProjectContent> = {
  'todo-app': {
    id: 'todo-app',
    date: 'Aug 2026',
    status: 'shipped',
    screenshotSrc: todoAppOverview,
    screenshotAspect: 16 / 9,
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
    media: [
      { caption: 'My day', src: todoAppMyDay },
      { caption: 'Custom list', src: todoAppCustomList },
      { caption: 'Calendar', src: todoAppCalendar },
      { caption: 'Task details', src: todoAppTaskDetails },
      { caption: 'Add task', src: todoAppAddTask },
      { caption: 'History', src: todoAppHistory },
      { caption: 'Notes', src: todoAppNotes },
      { caption: 'Stats', src: todoAppStats },
    ],
    sourceUrl: 'https://github.com/Ned-Pearson/todo-app',
  },
  'colorectal-cancer-classification': {
    id: 'colorectal-cancer-classification',
    date: 'Sem 1 2026',
    status: 'archived',
    blurb:
      'A histopathology image classifier comparing five approaches, from logistic regression to a CNN with transfer learning, built for an RMIT machine learning course.',
    tags: ['Python', 'scikit-learn', 'PyTorch'],
    writeUp: [
      'For this project I extracted and analysed a histopathology image dataset, then built and compared five approaches (logistic regression, SVM, CNN, CIFAR-10 transfer learning, and a majority-vote ensemble) across binary and four-class classification tasks.',
      "To keep evaluation honest I used a patient-level split to prevent data leakage, tuned hyperparameters systematically, and applied data augmentation that cut overfitting by 93%, which got the augmented CNN over the project's target. I also weighed each model's errors against real clinical cost and reported results that fell short of target rather than only the best-case numbers.",
      "This was completed as an individual assignment for a university machine learning course. As coursework, I'm not able to share the code or report publicly, so the write-up and media here cover what I built.",
    ],
    media: [],
  },
  'wildfire-intensity-prediction': {
    id: 'wildfire-intensity-prediction',
    date: 'Sem 1 2026',
    status: 'archived',
    blurb:
      'A comparison of Decision Tree, SVM, and neural network classifiers for predicting wildfire intensity from historical data, built for an RMIT course.',
    tags: ['Python', 'scikit-learn'],
    writeUp: [
      'Built and compared Decision Tree, SVM, and neural network classifiers to predict wildfire intensity from historical data, with feature engineering, stratified evaluation, and per-class performance analysis to see where each model actually struggled rather than just an overall accuracy number.',
      "This was an individual assignment for a university course, so the code and report aren't something I can share publicly. The write-up and media here cover the approach and results.",
    ],
    media: [],
  },
  'airbnb-price-prediction': {
    id: 'airbnb-price-prediction',
    date: 'Sem 1 2026',
    status: 'archived',
    blurb: 'A price-prediction model for Airbnb listings, covering the full pipeline from data cleaning through to model evaluation.',
    tags: ['Python', 'scikit-learn'],
    writeUp: [
      'Developed a price-prediction model for Airbnb listings, covering the full pipeline: cleaning and preparing the raw data, engineering features, training models, and evaluating their performance.',
      "This was also an individual assignment for a university course, so I'm not able to share the code or report publicly. The write-up and media below cover what I built.",
    ],
    media: [],
  },
}
