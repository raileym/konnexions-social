import { useEffect, useState } from 'react'

const ViewportWidthOverlay = () => {
  const [widthRem, setWidthRem] = useState(0)

  const updateWidth = () => {
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
    const rems = window.innerWidth / rootFontSize
    setWidthRem(parseFloat(rems.toFixed(2)))
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
        top: '8rem',
        left: '90%',
        transform: 'translate(-50%, -50%)',
        zIndex: 99999,
        background: 'white',
        color: 'black',
        fontSize: '1.5rem',
        padding: '0.5rem 1rem',
        borderRadius: '0.5rem',
        fontFamily: 'monospace',
        pointerEvents: 'none',
      }}
    >
      {widthRem}rem
    </div>
  )
}

export default ViewportWidthOverlay
