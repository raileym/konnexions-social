import { useThemeContext } from '@context/ThemeContext/ThemeContext'

const ColorScheme = () => {
    const { theme } = useThemeContext()
  
  return (
    <div
      className="viewport-width-overlay on-primary flex flex-row items-center bg-background b--black ba"
      style={{
        position: 'fixed', 
        top: '7rem',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 99999,
        fontSize: '1rem',
        padding: '0.5rem 1rem',
        borderRadius: '0.5rem',
        fontFamily: 'monospace',
        pointerEvents: 'none',
      }}
    >
      <div className="f7 pa1 mh3 on-background">{theme}</div>
      <div className="f7 br3 pa1 mh3 bg-primary on-primary">primary</div>
      <div className="f7 br3 pa1 mh3 bg-secondary on-secondary">secondary</div>
      <div className="f7 br3 pa1 mh3 bg-tertiary on-tertiary">tertiary</div>
    </div>
  )
}

export default ColorScheme
