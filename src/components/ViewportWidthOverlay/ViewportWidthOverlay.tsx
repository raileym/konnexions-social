import { useEffect, useState } from 'react'

const ViewportWidthOverlay = () => {
  const [widthEm, setWidthEm] = useState(0)

  const updateWidth = () => {
    const baseFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
    const ems = window.innerWidth / baseFontSize
    setWidthEm(parseFloat(ems.toFixed(2)))
  }

  useEffect(() => {
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        top: '1em',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 99999,
        background: 'white',
        color: 'black',
        fontSize: '1.5em',
        padding: '0.5em 1em',
        borderRadius: '0.5em',
        fontFamily: 'monospace',
        pointerEvents: 'none',
      }}
    >
      {widthEm}em
    </div>
  )
}

export default ViewportWidthOverlay
