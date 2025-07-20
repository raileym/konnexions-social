import MyKonnexionsSlash from '@components/MyKonnexionsSlash/MyKonnexionsSlash'

type MyKonnexionsTitleProps = {
  color?: string
  slashColor?: string
  fontSizeInRem?: number
  nominal?: string
  shorten?: boolean
}

const MyKonnexionsTitle = ({shorten = false, slashColor = 'brand', color = 'silver', fontSizeInRem = 1, nominal}: MyKonnexionsTitleProps) => {
  return (
    <div className="konnexions-title dib lh-2-kx">
      <div className="flex flex-row">
        {!shorten && <div className={`b ${color} mr2`}>My</div>}
        <div className={`b ${slashColor}`}>K</div>
        {!shorten && <div className={`b  ${color}`}>onne</div>}
        <MyKonnexionsSlash slashColor={slashColor} color={color} fontSizeInRem={fontSizeInRem} />
        {!shorten && <div className={`b  ${color}`}>ions<sup className="f7 relative" style={{ top: '-1.5em' }}>TM</sup></div>}
        {fontSizeInRem}
        {nominal ? <div className={`b ${color}`}>{nominal}</div> : null}
      </div>
    </div>
  )
}

export const MyKonnexionsTitleSpan = ({slashColor = 'brand', color = 'silver', fontSizeInRem = 1, nominal}: MyKonnexionsTitleProps) => {
  return (
    <span className="konnexions-title-span dib">
      <span className="inline-flex flex-wrap">
        <span className={`b ${color} mr1`}>My </span>
        <span className={`b ${slashColor}`}>K</span>
        <span className={`b  ${color}`}>onne</span>
        <MyKonnexionsSlash asSpan={true} slashColor={slashColor} color={color} fontSizeInRem={fontSizeInRem} />
        <span className={`b ${color}`}>ions<sup className="f7 relative" style={{ top: '-1em' }}>TM</sup></span>
        {nominal ? <span className={`b ${color}`}>{nominal}</span> : null}
      </span>
    </span>
  )
}

export default MyKonnexionsTitle