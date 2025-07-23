// FontSizeControls.tsx
import { useAppContext } from '@context/AppContext/AppContext'
import { useEffect } from 'react'

const FontSizeControls = () => {

  const { baseFontSize, setBaseFontSize } = useAppContext()

  useEffect(() => {
    // Apply font size to <html> element
    document.documentElement.style.fontSize = `${baseFontSize}px`
  }, [baseFontSize])

  const increment = () => setBaseFontSize(prev => Math.min(prev + 1, 32))
  const decrement = () => setBaseFontSize(prev => Math.max(prev - 1, 10))

  return (
    <div
      tabIndex={-1}
      aria-disabled={false}
      className="control-font-size fixed top-0 right-0 z-9999 pa2 on-background bg-background ba b--background br3 flex items-center focus:b--red bw3"
      style={{ right: '5%', top: '8rem', fontFamily: 'monospace' }}
    >
      <button tabIndex={0} aria-disabled={false} onClick={decrement} className="ba f4 b ph2 pv1 mr2 bg-light-gray focus:bg-tertiary focus:white bw2">−</button>
      <span className="f6">{baseFontSize}px</span>
      <button tabIndex={0} aria-disabled={false} onClick={increment} className="ba f4 b ph2 pv1 ml2 bg-light-gray focus:bg-tertiary focus:white bw2">+</button>
    </div>
  )
}

export default FontSizeControls
