
type KonnexionsSlashProps = {
  lineHeight?: number
  color?: string
}
const KonnexionsSlash = ({lineHeight = 1, color = 'silver'}: KonnexionsSlashProps) => {
  const marginTop = 0.345 + (lineHeight - 1.)/2

  let slashTop: string,
      slashLeft: string

  if (lineHeight == 2) {
    slashTop = '1.0em'
    slashLeft = '0.2em'
  } else {
    slashTop = '0.2em'
    slashLeft = '0.1em'
  }

  return (
    <>
    <div className="baX flex flow-row justify-centerX items-centerX">
      <div className="flex flex-row relative">
        {/* <div className="bg-black baX b--blue transparent mh2 w1 h1 skew-45" style={{marginRight: '.3em', width: '.15em', height: '0.52em'}}>x</div> */}
        <div className={`bg-${color} transparent mh2 skew-45`} style={{marginTop: `${marginTop}em`, marginRight: '.3em', width: '.15em', height: '0.52em', lineHeight: `${lineHeight}`}}>x</div>
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
