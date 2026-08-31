import { useEffect, useRef, type KeyboardEvent } from 'react'
import type { Node } from '../../data'
import type { WindowView } from './useWindows'
import { FolderGlyph } from './glyphs/FolderGlyph'
import { DocumentGlyph } from './glyphs/DocumentGlyph'
import { ProjectGlyph } from './glyphs/ProjectGlyph'
import { activateOnKey } from '../../utils/activateOnKey'
import { focusAdjacentMenuItem, focusFirstMenuItem } from '../../utils/menuNavigation'
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
  /** The current folder's own modified date, for the status bar's right field. */
  modified: string
  onOpenReadme: () => void
  onToggleMenu: () => void
  onSetView: (view: WindowView) => void
  onBack: () => void
  onSelectRow: (nodeId: string) => void
  onOpenRow: (node: Node) => void
}

// File and Edit are permanently inert (no dropdown, ever) — they still get
// hover feedback, matching a genuine retro menu bar.
export function FolderWindow({
  view,
  menuOpen,
  path,
  canGoBack,
  items,
  selectedRow,
  modified,
  onOpenReadme,
  onToggleMenu,
  onSetView,
  onBack,
  onSelectRow,
  onOpenRow,
}: FolderWindowProps) {
  const viewTriggerRef = useRef<HTMLSpanElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Autofocus the first item whenever the dropdown opens — matches the
  // context menu and Start menu, so a keyboard user landing here never has
  // to blindly Tab/arrow around to discover where focus went.
  useEffect(() => {
    if (menuOpen) focusFirstMenuItem(dropdownRef.current)
  }, [menuOpen])

  function closeViewMenuAndRestoreFocus() {
    onToggleMenu()
    viewTriggerRef.current?.focus()
  }

  function handleDropdownKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {
      e.preventDefault()
      focusAdjacentMenuItem(e.currentTarget, 1)
    } else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
      e.preventDefault()
      focusAdjacentMenuItem(e.currentTarget, -1)
    } else if (e.key === 'Escape') {
      e.preventDefault()
      closeViewMenuAndRestoreFocus()
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      const menuItems = [...e.currentTarget.querySelectorAll<HTMLElement>('[role="menuitem"]:not([aria-disabled])')]
      const index = menuItems.indexOf(document.activeElement as HTMLElement)
      if (index === 0) onSetView('list')
      else if (index === 1) onSetView('grid')
    }
  }

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
          ref={viewTriggerRef}
          className={menuOpen ? `${styles.menuItem} ${styles.menuItemOpen}` : styles.menuItem}
          role="button"
          tabIndex={0}
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          onClick={(e) => {
            e.stopPropagation()
            onToggleMenu()
          }}
          onKeyDown={activateOnKey(onToggleMenu)}
        >
          <u>V</u>iew
        </span>
        <span className={styles.menuItem} role="button" tabIndex={0} onClick={onOpenReadme} onKeyDown={activateOnKey(onOpenReadme)}>
          <u>H</u>elp
        </span>
        {menuOpen && (
          <div
            ref={dropdownRef}
            className={styles.viewDropdown}
            role="menu"
            onMouseDown={(e) => e.stopPropagation()}
            onKeyDown={handleDropdownKeyDown}
          >
            <div
              role="menuitem"
              tabIndex={-1}
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
              role="menuitem"
              tabIndex={-1}
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
            <div className={`${styles.dropdownItem} ${styles.dropdownItemDisabled}`} aria-disabled="true">
              <span className={styles.check} />
              <span className={styles.dropdownLabel}>Refresh</span>
            </div>
          </div>
        )}
      </div>
      <div className={styles.toolbar}>
        <div
          className={`${styles.toolbarButton} ${canGoBack ? styles.toolbarButtonActive : styles.toolbarButtonDisabled}`}
          role="button"
          tabIndex={canGoBack ? 0 : undefined}
          onClick={canGoBack ? onBack : undefined}
          onKeyDown={canGoBack ? activateOnKey(onBack) : undefined}
        >
          ← Back
        </div>
        <div className={`${styles.toolbarButton} ${styles.toolbarButtonDisabled}`}>Forward →</div>
        <div className={styles.toolbarDivider} />
        <div className={styles.pathField}>{path}</div>
        <div
          className={view === 'list' ? `${styles.viewToggle} ${styles.viewToggleActive}` : styles.viewToggle}
          role="button"
          tabIndex={0}
          aria-label="List view"
          aria-pressed={view === 'list'}
          onClick={() => onSetView('list')}
          onKeyDown={activateOnKey(() => onSetView('list'))}
        >
          ≣
        </div>
        <div
          className={view === 'grid' ? `${styles.viewToggle} ${styles.viewToggleActive}` : styles.viewToggle}
          role="button"
          tabIndex={0}
          aria-label="Icon grid view"
          aria-pressed={view === 'grid'}
          onClick={() => onSetView('grid')}
          onKeyDown={activateOnKey(() => onSetView('grid'))}
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
        <div className={styles.statusField}>{items.length} object(s)</div>
        <div className={`${styles.statusField} ${styles.statusFieldRight}`}>{modified}</div>
      </div>
    </>
  )
}
