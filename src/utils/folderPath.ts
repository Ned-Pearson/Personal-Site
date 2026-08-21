import { getPath } from '../data'

// Shared by the desktop folder window's toolbar and the mobile toolbar's
// (RTL) path field. e.g. folderPath('machine-learning') -> "C:\ned\projects\machine-learning"
export function folderPath(node: string): string {
  const segments = getPath(node).map((n) => n.name.toLowerCase().replace(/ /g, '-'))
  return 'C:\\ned\\' + segments.join('\\')
}
