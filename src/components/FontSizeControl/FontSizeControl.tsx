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
      className="fixed top-0 right-0 z-99999 pa2 bg-white ba b--black-10 flex items-center"
      style={{ right: '5%', top: '8rem', fontFamily: 'monospace' }}
    >
      <button onClick={decrement} className="f6 ph2 pv1 mr2 bg-light-gray">−</button>
      <span className="f6">{baseFontSize}px</span>
      <button onClick={increment} className="f6 ph2 pv1 ml2 bg-light-gray">+</button>
    </div>
  )
}

export default FontSizeControls
