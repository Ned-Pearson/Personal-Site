import { getNode } from '../../data'
import { DesktopIcon } from './DesktopIcon'
import styles from './Desktop.module.css'

const projectsNode = getNode('projects')!
const readmeNode = getNode('readme')!

export function Desktop() {
  return (
    <div className={styles.desktop}>
      <div className={styles.iconColumn}>
        <DesktopIcon label={projectsNode.name} glyph="folder" />
        <DesktopIcon label="About Me" glyph="document" />
        <DesktopIcon label={readmeNode.name} glyph="document" />
      </div>
    </div>
  )
}
