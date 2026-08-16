// Public data-access layer for the window system. Components should import
// from here, not from ./nodes, ./projects or ./docs directly — that keeps
// the static maps swappable for MDX/a CMS later without touching consumers.

import { NODES, type Node } from './nodes'
import { PROJECTS, type ProjectContent } from './projects'
import { DOCS, type DocContent } from './docs'

export type { Node, NodeKind } from './nodes'
export type { ProjectContent, ProjectStatus } from './projects'
export type { DocContent } from './docs'

export function getNode(id: string): Node | undefined {
  return NODES[id]
}

/** Resolves a folder node's children ids to full Node objects, in listed order. */
export function getChildren(id: string): Node[] {
  const node = NODES[id]
  if (!node) return []
  return node.children.map((childId) => NODES[childId]).filter((n): n is Node => n !== undefined)
}

/** Walks up the parent chain to the root, root-first — e.g. for a toolbar path field. */
export function getPath(id: string): Node[] {
  const path: Node[] = []
  let current: Node | undefined = NODES[id]
  while (current) {
    path.unshift(current)
    current = current.parent ? NODES[current.parent] : undefined
  }
  return path
}

export function getProject(id: string): ProjectContent | undefined {
  return PROJECTS[id]
}

export function getDoc(id: string): DocContent | undefined {
  return DOCS[id]
}
