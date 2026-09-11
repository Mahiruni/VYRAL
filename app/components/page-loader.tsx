'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

const LOGO_PATH = 'M 60.3 0 C 57.9 0 55.7 0.8 54.1 2.5 L 1.8 56.5 C -0.7 59.1 -0.6 63.3 2 65.8 C 3.6 67.4 5.7 68.1 8 68.1 L 47.2 68.1 L 43.8 98.5 C 43.3 103.1 47.1 107.2 51.7 107.2 C 53.8 107.2 55.7 106.3 57.2 104.8 L 111.6 48.8 C 114.4 45.9 114.3 41.4 111.3 38.6 C 109.6 37 107.6 36.2 105.2 36.2 L 65.6 36.2 L 76 8.1 C 77.6 3.9 74.5 0 70 0 Z'

export function PageLoader() {
  const pathname = usePathname()
  const didMount = useRef(false)
  const [visible, setVisible] = useState(true)
  const [run, setRun] = useState(0)

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 650)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true
      return
    }

    setRun((value) => value + 1)
    setVisible(true)
    const timer = window.setTimeout(() => setVisible(false), 500)
    return () => window.clearTimeout(timer)
  }, [pathname])

  if (!visible) return null

  return (
    <div key={run} className="vyral-loader" aria-hidden="true">
      <svg className="vyral-loader-logo" viewBox="-3 -3 118 114" role="presentation">
        <defs>
          <clipPath id={`vyral-logo-fill-${run}`}>
            <rect className="vyral-loader-fill" x="-6" y="-4" width="0" height="116" />
          </clipPath>
        </defs>
        <path className="vyral-loader-outline" d={LOGO_PATH} />
        <g clipPath={`url(#vyral-logo-fill-${run})`}>
          <path className="vyral-loader-solid" d={LOGO_PATH} />
          <rect className="vyral-loader-sheen" x="-8" y="-8" width="3" height="124" />
        </g>
      </svg>
    </div>
  )
}
