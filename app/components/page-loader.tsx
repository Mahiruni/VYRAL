'use client'

import { useEffect, useState } from 'react'

export function PageLoader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 520)
    return () => window.clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className="vyral-loader" aria-hidden="true">
      <div className="vyral-loader-mark">V</div>
    </div>
  )
}
