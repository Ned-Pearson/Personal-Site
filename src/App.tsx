import { Analytics } from '@vercel/analytics/react'
import { Desktop } from './components/Desktop/Desktop'
import { Mobile } from './components/Mobile/Mobile'
import { useIsMobile } from './hooks/useIsMobile'

function App() {
  const isMobile = useIsMobile()
  return (
    <>
      {isMobile ? <Mobile /> : <Desktop />}
      <Analytics />
    </>
  )
}

export default App
