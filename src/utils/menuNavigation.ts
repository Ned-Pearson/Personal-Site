// Shared arrow-key list navigation for every menu-like surface (README.md
// section 17): Start menu + flyouts, desktop context menu, folder View
// dropdown. Operates on whatever [role="menuitem"] elements are inside
// `container`, so a nested flyout gets its own independent Up/Down scope
// just by being its own container with its own onKeyDown. Disabled items are
// excluded from the query — they should never receive keyboard focus.
const ITEM_SELECTOR = '[role="menuitem"]:not([aria-disabled="true"])'

export function focusAdjacentMenuItem(container: HTMLElement, direction: 1 | -1) {
  const items = [...container.querySelectorAll<HTMLElement>(ITEM_SELECTOR)]
  if (items.length === 0) return
  const current = items.indexOf(document.activeElement as HTMLElement)
  const next = (current + direction + items.length) % items.length
  items[next]?.focus()
}

export function focusFirstMenuItem(container: HTMLElement | null) {
  container?.querySelector<HTMLElement>(ITEM_SELECTOR)?.focus()
}
