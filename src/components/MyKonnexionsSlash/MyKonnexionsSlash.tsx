
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
    case 'secondary': updatedSlashColor = 'var(--kx-secondary)'; break;
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
    mMarginLeft: number,
    mMarginRight: number,
    marginTop: number

  if (lineHeight == 2) {
    slashTop = `${0.2 + 0.8}em`
    slashLeft = '0.2em'
    // mhX = 2
    // mlX = 2
    // mrX = 2
    mMarginLeft = .2
    mMarginRight = 0
    marginTop = 0.345 + (lineHeight - 1.)/2

  } else if (lineHeight == 1.5) {
    slashTop = `${0.2 + 0.4}em`
    slashLeft = '0.1em'
    // mhX = 1
    // mlX = 2
    // mrX = 0.5
    mMarginLeft = .2 - 0.04
    mMarginRight = .2
    marginTop = 0.345 + (lineHeight - 1.)/2 + 0.01
  } else {
    // lineHeight == 1.0
    slashTop = '0.2em'
    slashLeft = '0.1em'
    // mhX = 2
    mMarginLeft = .2
    mMarginRight = .25
    marginTop = 0.345 + (lineHeight - 1.)/2 + 0.04
  }

  if ( asSpan ) {
    return (
      <>
        <span className="baX flex flow-row justify-centerX items-centerX">
          <span className="flex flex-row relative">
            <span className={`bg-${color} transparent skew-45`}
              style={{
                marginTop: `${marginTop}em`,
                marginLeft: `${mMarginLeft}em`,
                marginRight: `${mMarginRight}em`,
                width: '.15em',
                height: '0.52em',
                lineHeight: `${lineHeight}`
                }}
              >m</span>
            <span
              className="konnexion-slash absolute transparent"
              style={{
                height: '1em',
                fontSize: '0.6em',
                top: slashTop, // '1.2em', // '0.2em', // 
                left: slashLeft,
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
        <div className="baX flex flow-row justify-centerX items-centerX">
          <div className="flex flex-row relative">
            <div className={`bg-${color} transparent skew-45`}
              style={{
                marginTop: `${marginTop}em`,
                marginLeft: `${mMarginLeft}em`,
                marginRight: `${mMarginRight}em`,
                width: '.15em',
                height: '0.52em',
                lineHeight: `${lineHeight}`
                }}
              >m</div>
            <div
              className="konnexion-slash absolute transparent"
              style={{
                height: '1em',
                fontSize: '0.6em',
                top: slashTop, // '1.2em', // '0.2em', // 
                left: slashLeft,
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
