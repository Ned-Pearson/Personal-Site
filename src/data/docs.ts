// Static content for text-viewer windows (readme.txt).
// Keyed by the same id as the matching 'document' node in NODES.

export interface DocContent {
  id: string
  heading: string
  paragraphs: string[]
}

export const DOCS: Record<string, DocContent> = {
  readme: {
    id: 'readme',
    heading: 'readme',
    paragraphs: [
      "Welcome. I'm Ned Pearson and this is my personal site, dressed up as a fictional desktop operating system from the mid-90s. Every window, icon, and bit of chrome you see was built from scratch with React and CSS; no real Windows code was harmed in the making of this.",
      "Getting around: double-click Projects to see what I've built, or About Me for more on who I am and how to reach me. Windows drag, resize, and minimise just like the real thing, except this one won't blue-screen on you.",
      'Thanks for stopping by. If something here catches your eye, or you just want to talk shop, my details are in About Me.',
    ],
  },
}
