import MyKonnexionsSlash from '@components/MyKonnexionsSlash/MyKonnexionsSlash'

type MyKonnexionsTitleProps = {
  color?: string
  slashColor?: string
  lineHeight?: number
  nominal?: string
}

const MyKonnexionsTitle = ({slashColor = 'brand', color = 'silver', lineHeight = 1, nominal}: MyKonnexionsTitleProps) => {
  return (
    <div className="dib kx-lh-2">
      <div className="flex flex-row">
        <div className={`b ${color} mr2`}>My</div>
        <div className={`b ${slashColor}`}>K</div>{lineHeight}
        <div className={`b  ${color}`}>onne</div>
        <MyKonnexionsSlash slashColor={slashColor} color={color} lineHeight={lineHeight} />
        <div className={`b  ${color}`}>ions<sup className="f7 relative" style={{ top: '-1.5em' }}>TM</sup></div>
        {nominal ? <div className={`b ${color}`}>{nominal}</div> : null}
      </div>
    </div>
  )
}

export const MyKonnexionsTitleSpan = ({slashColor = 'brand', color = 'silver', lineHeight = 1, nominal}: MyKonnexionsTitleProps) => {
  return (
    <span className="dib">
      <span className="inline-flex flex-wrap">
        <span className={`b ${color} mr1`}>My </span>
        <span className={`b ${slashColor}`}>K</span>
        <span className={`b  ${color}`}>onne</span>
        <MyKonnexionsSlash asSpan={true} slashColor={slashColor} color={color} lineHeight={lineHeight} />
        <span className={`b ${color}`}>ions<sup className="f7 relative" style={{ top: '-1em' }}>TM</sup></span>
        {nominal ? <span className={`b ${color}`}>{nominal}</span> : null}
      </span>
    </span>
  )
}

export default MyKonnexionsTitle