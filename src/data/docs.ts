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
    paragraphs: ['Will enter later'],
  },
}
