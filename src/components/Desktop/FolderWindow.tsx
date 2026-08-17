import type { Node } from '../../data'
import type { WindowView } from './useWindows'
import { FolderGlyph } from './glyphs/FolderGlyph'
import { DocumentGlyph } from './glyphs/DocumentGlyph'
import { ProjectGlyph } from './glyphs/ProjectGlyph'
import styles from './FolderWindow.module.css'

function rowGlyph(item: Node) {
  if (item.kind === 'folder') return <FolderGlyph size="row" />
  if (item.kind === 'project') return <ProjectGlyph colour={item.colour ?? 'var(--color-bevel-mid)'} size="row" />
  return <DocumentGlyph size="row" />
}

function gridGlyph(item: Node) {
  if (item.kind === 'folder') return <FolderGlyph />
  if (item.kind === 'project') return <ProjectGlyph colour={item.colour ?? 'var(--color-bevel-mid)'} size="grid" />
  return <DocumentGlyph size="grid" />
}

interface FolderWindowProps {
  view: WindowView
  menuOpen: boolean
  path: string
  canGoBack: boolean
  items: Node[]
  selectedRow: string | null
  onOpenReadme: () => void
  onToggleMenu: () => void
  onSetView: (view: WindowView) => void
  onBack: () => void
  onSelectRow: (nodeId: string) => void
  onOpenRow: (node: Node) => void
}

// File and Edit are permanently inert (no dropdown, ever) — they still get
// hover feedback, matching a genuine retro menu bar. Status-bar text is a
// later point still.
export function FolderWindow({
  view,
  menuOpen,
  path,
  canGoBack,
  items,
  selectedRow,
  onOpenReadme,
  onToggleMenu,
  onSetView,
  onBack,
  onSelectRow,
  onOpenRow,
}: FolderWindowProps) {
  return (
    <>
      <div className={styles.menuBar}>
        <span className={styles.menuItem}>
          <u>F</u>ile
        </span>
        <span className={styles.menuItem}>
          <u>E</u>dit
        </span>
        <span
          className={menuOpen ? `${styles.menuItem} ${styles.menuItemOpen}` : styles.menuItem}
          onClick={(e) => {
            e.stopPropagation()
            onToggleMenu()
          }}
        >
          <u>V</u>iew
        </span>
        <span className={styles.menuItem} onClick={onOpenReadme}>
          <u>H</u>elp
        </span>
        {menuOpen && (
          <div className={styles.viewDropdown}>
            <div
              className={styles.dropdownItem}
              onClick={(e) => {
                e.stopPropagation()
                onSetView('list')
              }}
            >
              <span className={styles.check}>{view === 'list' ? '✓' : ''}</span>
              <span className={styles.dropdownLabel}>as File list</span>
              <span>≣</span>
            </div>
            <div
              className={styles.dropdownItem}
              onClick={(e) => {
                e.stopPropagation()
                onSetView('grid')
              }}
            >
              <span className={styles.check}>{view === 'grid' ? '✓' : ''}</span>
              <span className={styles.dropdownLabel}>as Icon grid</span>
              <span>▦</span>
            </div>
            <div className={styles.dropdownDivider} />
            <div className={`${styles.dropdownItem} ${styles.dropdownItemDisabled}`}>
              <span className={styles.check} />
              <span className={styles.dropdownLabel}>Refresh</span>
            </div>
          </div>
        )}
      </div>
      <div className={styles.toolbar}>
        <div
          className={`${styles.toolbarButton} ${canGoBack ? styles.toolbarButtonActive : styles.toolbarButtonDisabled}`}
          onClick={canGoBack ? onBack : undefined}
        >
          ← Back
        </div>
        <div className={`${styles.toolbarButton} ${styles.toolbarButtonDisabled}`}>Forward →</div>
        <div className={styles.toolbarDivider} />
        <div className={styles.pathField}>{path}</div>
        <div
          className={view === 'list' ? `${styles.viewToggle} ${styles.viewToggleActive}` : styles.viewToggle}
          onClick={() => onSetView('list')}
        >
          ≣
        </div>
        <div
          className={view === 'grid' ? `${styles.viewToggle} ${styles.viewToggleActive}` : styles.viewToggle}
          onClick={() => onSetView('grid')}
        >
          ▦
        </div>
      </div>
      <div className={styles.filePane}>
        {view === 'list' ? (
          <div className={styles.listView}>
            <div className={styles.listHeader}>
              <div className={styles.headerName}>Name</div>
              <div className={styles.headerType}>Type</div>
              <div className={styles.headerModified}>Modified</div>
            </div>
            {items.map((item) => (
              <div
                key={item.id}
                className={item.id === selectedRow ? `${styles.row} ${styles.rowSelected}` : styles.row}
                onClick={(e) => {
                  e.stopPropagation()
                  onSelectRow(item.id)
                }}
                onDoubleClick={(e) => {
                  e.stopPropagation()
                  onOpenRow(item)
                }}
              >
                <div className={styles.rowGlyph}>{rowGlyph(item)}</div>
                <div className={styles.rowName}>{item.name}</div>
                <div className={styles.rowType}>{item.type}</div>
                <div className={styles.rowModified}>{item.modified}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.iconGrid}>
            {items.map((item) => (
              <div
                key={item.id}
                className={item.id === selectedRow ? `${styles.gridCell} ${styles.rowSelected}` : styles.gridCell}
                onClick={(e) => {
                  e.stopPropagation()
                  onSelectRow(item.id)
                }}
                onDoubleClick={(e) => {
                  e.stopPropagation()
                  onOpenRow(item)
                }}
              >
                <div className={styles.gridGlyph}>{gridGlyph(item)}</div>
                <div className={styles.gridLabel}>{item.name}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={styles.statusBar}>
        <div className={styles.statusField} />
        <div className={`${styles.statusField} ${styles.statusFieldRight}`} />
      </div>
    </>
  )
}
