
type KonnexionsSlashProps = {
  lineHeight?: number
  color?: string
}
const KonnexionsSlash = ({lineHeight = 1, color = 'silver'}: KonnexionsSlashProps) => {
  const marginTop = 0.345 + (lineHeight - 1.)/2

  let slashTop: string,
      slashLeft: string,
      // mhX: number,
      // mlX: number,
      // mrX: number,
      mMarginLeft: number,
      mMarginRight: number


  if (lineHeight == 2) {
    slashTop = `${0.2 + 0.8}em`
    slashLeft = '0.2em'
    // mhX = 2
    // mlX = 2
    // mrX = 2
    mMarginLeft = .2
    mMarginRight = 0
  } else if (lineHeight == 1.5) {
    slashTop = `${0.2 + 0.4}em`
    slashLeft = '0.1em'
    // mhX = 1
    // mlX = 2
    // mrX = 0.5
    mMarginLeft = .2
    mMarginRight = .2
  } else {
    // lineHeight == 1.0
    slashTop = '0.2em'
    slashLeft = '0.1em'
    // mhX = 2
    mMarginLeft = .2
    mMarginRight = .25
  }

  return (
    <>
    <div className="baX flex flow-row justify-centerX items-centerX">
      <div className="flex flex-row relative">
        {/* <div className="bg-black baX b--blue transparent mh2 w1 h1 skew-45" style={{marginRight: '.3em', width: '.15em', height: '0.52em'}}>x</div> */}
        {/* <div className={`bg-${color} transparent ml${mlX} mrX${mrX} mhX${mhX} skew-45`} style={{marginTop: `${marginTop}em`, marginRight: '.3em', width: '.15em', height: '0.52em', lineHeight: `${lineHeight}`}}>m</div> */}
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
            left: slashLeft
          }}
        >
          m
        </div>
      </div>
    </div>
    </>
  )
}

export default KonnexionsSlash
