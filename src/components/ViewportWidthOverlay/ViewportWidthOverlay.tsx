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
      inert={true}
      className="control-viewport-width bg-on-background background b--background ba bw1"
      style={{
        position: 'fixed',
        top: '9rem',
        left: '20%',
        transform: 'translate(-50%, -50%)',
        zIndex: 99999,
        // background: 'bg-transparent',
        fontSize: '1rem',
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
