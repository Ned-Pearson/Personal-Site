import { useEffect, useState } from 'react'

// Mobile is a separate presentation, not a scaled-down window manager (see
// README.md section 14), so this decides which one mounts at the App root
// rather than feeding into any layout math.
const QUERY = '(max-width: 767px)'

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia(QUERY).matches)

  useEffect(() => {
    const query = window.matchMedia(QUERY)
    const sync = () => setIsMobile(query.matches)
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  return isMobile
}
