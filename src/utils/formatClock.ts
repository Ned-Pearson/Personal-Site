// Shared by the desktop taskbar and the mobile system tray — both show the
// same live clock, just styled differently for their own chrome.
export function formatClock(date: Date, use24h = false): string {
  const minutes = String(date.getMinutes()).padStart(2, '0')
  if (use24h) return `${String(date.getHours()).padStart(2, '0')}:${minutes}`
  const suffix = date.getHours() < 12 ? ' AM' : ' PM'
  const hours = date.getHours() % 12 || 12
  return `${hours}:${minutes}${suffix}`
}
