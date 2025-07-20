
type KonnexionsSlashProps = {
  lineHeight?: number
  color?: string
  slashColor?: string
  asSpan?: boolean
}
const KonnexionsSlash = ({lineHeight = 1, slashColor = 'primary', color = 'silver', asSpan = false}: KonnexionsSlashProps) => {
  
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
    slashLeft: string,
    // mhX: number,
    // mlX: number,
    // mrX: number,
    mMarginLeft: string,
    mMarginRight: string,
    marginTop: string

  if (lineHeight == 2) {
    slashTop = `${0.2 + 0.8}rem`
    slashLeft = '0.2rem'
    // mhX = 2
    // mlX = 2
    // mrX = 2
    mMarginLeft = '.2rem'
    mMarginRight = '0rem'
    marginTop = `${0.345 + (lineHeight - 1.)/2}rem`

  } else if (lineHeight == 1.5) {
    slashTop = `${0.2 + 0.4}rem`
    slashLeft = '0.1rem'
    // mhX = 1
    // mlX = 2
    // mrX = 0.5
    mMarginLeft = '0.3rem' // `${.2 - 0.04}rem`
    mMarginRight = '0.4rem' // `${.2}rem`
    marginTop = `${0.9}rem` // 0.345 + (lineHeight - 1.)/2 + 0.01
  } else {
    // lineHeight == 1.0
    slashTop = '0.2rem'
    slashLeft = '0.1rem'
    // mhX = 2
    mMarginLeft = '0.3rem' // `${.2}rem`
    mMarginRight = '0.6rem' // `${.25}rem`
    marginTop = `${0.9}rem` // 0.345 + (lineHeight - 1.)/2 + 0.04
  }

  slashTop = '0.2rem'
  slashLeft = '0.1rem'
  mMarginLeft = '0.3rem' 
  mMarginRight = '0.6rem' 
  marginTop = '0.5rem' // `${lineHeight * -0.5}rem`

    if ( asSpan ) {
    return (
      <>
        <span className="kx-slash-as-span baX flex flow-row justify-centerX items-centerX">
          <span className="flex flex-row relative">
            <span className={`bg-${color}X transparent skew-45`}
              style={{
                marginTop: `${marginTop}`,
                marginLeft: `${mMarginLeft}`,
                marginRight: `${mMarginRight}`,
                width: '.22rem',
                height: '.75rem', // '0.52rem',
                lineHeight: `${lineHeight}`,
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
                '--slash-top': '-.5rem',
                '--slash-height': '2.25rem', // '2.25rem',
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
        <div className="kx-slash baX flex flow-row justify-centerX items-centerX">
          <div className="flex flex-row relative">
            <div className={`bg-${color} transparent skew-45`}
              style={{
                marginTop: `${marginTop}`,
                marginLeft: `${mMarginLeft}`,
                marginRight: `${mMarginRight}`,
                width: '.5rem',
                height: `${ lineHeight * 0.5}rem`, // '1.2rem', //'0.52rem',
                lineHeight: `${lineHeight}`
                }}
              >m</div>
            <div
              className="konnexion-slash absolute transparent"
              style={{
                height: '2rem', // '1rem',
                fontSize: '0.6rem',
                top: slashTop, // '1.2rem', // '0.2rem', // 
                left: slashLeft,
                '--slash-top': '-.4rem',
                '--slash-height': '3.5rem', // '3.5rem',
                '--slash-color': updatedSlashColor // `var(--${slashColor})`
              } as React.CSSProperties & { [key: string]: string }}
            >
              m
            </div>
            {lineHeight}
          </div>
        </div>
      </>
    )
  }
}

export default KonnexionsSlash
