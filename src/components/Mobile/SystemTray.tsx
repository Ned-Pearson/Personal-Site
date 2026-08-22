import { useEffect, useState } from 'react'
import { formatClock } from '../../utils/formatClock'
import styles from './SystemTray.module.css'

const SIGNAL_BAR_HEIGHTS = [3, 5, 7, 8]

export function SystemTray() {
  const [clock, setClock] = useState(() => formatClock(new Date()))

  useEffect(() => {
    const id = setInterval(() => setClock(formatClock(new Date())), 10000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className={styles.tray}>
      <div className={styles.mark}>
        <div className={styles.colourGrid}>
          <div style={{ background: '#c1443c' }} />
          <div style={{ background: '#2f7a35' }} />
          <div style={{ background: '#1f4fa8' }} />
          <div style={{ background: '#e0b13a' }} />
        </div>
        np
      </div>
      <div className={styles.status}>
        <div className={styles.clock}>{clock}</div>
        <div className={styles.signal}>
          {SIGNAL_BAR_HEIGHTS.map((height, i) => (
            <div key={i} className={styles.signalBar} style={{ height }} />
          ))}
        </div>
        <div className={styles.battery}>
          <div className={styles.batteryFill} />
        </div>
      </div>
    </div>
  )
}
