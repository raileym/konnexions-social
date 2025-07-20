
type KonnexionsSlashProps = {
  fontSizeInRem?: number
  color?: string
  slashColor?: string
  asSpan?: boolean
}
const KonnexionsSlash = ({fontSizeInRem = 1, slashColor = 'primary', color = 'silver', asSpan = false}: KonnexionsSlashProps) => {
  
  let updatedSlashColor: string

  switch (slashColor) {
    case 'primary': updatedSlashColor = 'var(--kx-primary)'; break;
    case 'secondary': updatedSlashColor = 'var(--kx-45econdary)'; break;
    case 'tertiary': updatedSlashColor = 'var(--kx-tertiary)'; break;
    case 'blue': updatedSlashColor = 'var(--kx-blue)'; break;
    case 'brand': updatedSlashColor = 'var(--kx-brand)'; break;
    default: updatedSlashColor = slashColor
  }

  let slashTop: string,
      slashWidth: string,
      slashLeft: string,
      slashHeight: string,
      // mhX: number,
      // mlX: number,
      // mrX: number,
      mWidth: string,
      mMarginLeft: string,
      mMarginRight: string,
      mMarginTop: string,
      mHeight: string

  slashHeight = '1rem'
  slashTop = '0.2rem'
  slashLeft = '0.1rem'
  slashWidth = '0.5rem'
  mMarginLeft = '0.3rem' 
  mMarginRight = '0.6rem'
  mWidth = '0.3rem'
  mMarginTop = '0.5rem'
  mHeight = '1rem'

  switch (fontSizeInRem) {
    case 3: mMarginTop = '1.2rem' // '0.5rem'
            mWidth = '0.5rem'
            mMarginLeft = '0.5rem' 
            mMarginRight = '0.6rem'
            mHeight = `${ fontSizeInRem * 0.5}rem`
            slashHeight= '3.5rem'
            slashTop = '0.5rem'
            slashWidth = '0.3rem'
            slashLeft = '0.3rem'
            break;
    case 2: mMarginTop = '0.5rem'
            mWidth = '0.3rem'
            mMarginLeft = '0.3rem' 
            mMarginRight = '0.6rem'
            mHeight = `${ fontSizeInRem * 0.5}rem`
            slashHeight= '2.25rem'
            slashTop = '0.2rem'
            slashWidth = '0.3rem'
            slashLeft = '0.1rem'
            break;
    case 1.5: mMarginTop = '0.9rem'
            mWidth = '0.3rem'
            mMarginLeft = '0.3rem' 
            mMarginRight = '0.4rem'
            mHeight = `${ fontSizeInRem * 0.5}rem`
            slashHeight= '2.25rem'
            slashTop = '0.7rem'
            slashWidth = '0.2rem'
            slashLeft = '0.1rem'
            break;
    case 1: mMarginTop = '0.9rem'
            mWidth = '0.3rem'
            mMarginLeft = '0.3rem' 
            mMarginRight = '0.6rem'
            mHeight = `${ fontSizeInRem * 0.7}rem`
            slashHeight= '2.0rem'
            slashWidth = '0.2rem'
            slashTop = '0.7rem'
            slashLeft = '0.1rem'
            break;
  }

  // mMarginTop = '0.5rem' // `${0.8*lineHeight * 0.5}rem` // '0.5rem' // `${lineHeight * -0.5}rem`

    if ( asSpan ) {
    return (
      <>
        <span className="kx-slash-as-span flex flow-row">
          <span className="flex flex-row relative">
            <span className={`bg-${color}X transparent skew-45`}
              style={{
                marginTop: `${mMarginTop}`,
                marginLeft: `${mMarginLeft}`,
                marginRight: `${mMarginRight}`,
                width: mWidth,
                height: mHeight, // '1.2rem', //'0.52rem',
                lineHeight: `${fontSizeInRem}`, // MIS-MATCH
                backgroundColor: color // 'red'
                }}
              >m</span>
            <span
              className="konnexion-slash absolute transparent"
              style={{
                height: '1rem', // '1rem',
                fontSize: '0.6rem',
                top: slashTop, // '1.2rem', // '0.2rem', // 
                left: slashLeft,
                '--slash-width': slashWidth,
                '--slash-top': '-.5rem',
                '--slash-height': slashHeight, // '2.25rem', // '2.25rem',
                '--slash-color': updatedSlashColor // `var(--${slashColor})`
              } as React.CSSProperties & { [key: string]: string }}
            >
              m
            </span>
          </span>
        </span>
      </>
    )
  } else {
    return (
      <>
        <div className="konnexions-slash flex flow-row">
          <div className="flex flex-row relative">
            <div className={`bg-${color} transparent skew-45`}
              style={{
                marginTop: `${mMarginTop}`,
                marginLeft: `${mMarginLeft}`,
                marginRight: `${mMarginRight}`,
                width: mWidth,
                height: mHeight, // '1.2rem', //'0.52rem',
                lineHeight: `${fontSizeInRem}` // MIS-MATCH
                }}
              >m</div>
            <div
              className="konnexion-slash absolute transparent"
              style={{
                height: '2rem', // '1rem',
                fontSize: '0.6rem',
                top: slashTop, // '1.2rem', // '0.2rem', // 
                left: slashLeft,
                '--slash-width': slashWidth,
                '--slash-top': '-.4rem',
                '--slash-height': slashHeight, // '3.5rem', // '3.5rem',
                '--slash-color': updatedSlashColor // `var(--${slashColor})`
              } as React.CSSProperties & { [key: string]: string }}
            >
              m
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default KonnexionsSlash
