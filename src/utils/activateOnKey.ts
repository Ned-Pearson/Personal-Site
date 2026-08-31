import type { KeyboardEvent } from 'react'

// Shared by every plain `<div>` acting as a button (README.md section 17) —
// native <button>/<a> elements already get Enter/Space activation for free
// from the browser, so this is only needed on the divs.
export function activateOnKey(handler: () => void) {
  return (e: KeyboardEvent) => {
    if (e.key !== 'Enter' && e.key !== ' ') return
    e.preventDefault()
    handler()
  }
}
