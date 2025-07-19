import MyKonnexionsSlash from '@components/MyKonnexionsSlash/MyKonnexionsSlash'

type MyKonnexionsTitleProps = {
  color?: string
  slashColor?: string
  lineHeight?: number
  nominal?: string
}

const MyKonnexionsTitle = ({slashColor = 'primary', color = 'black', lineHeight = 1, nominal}: MyKonnexionsTitleProps) => {
  return (
    <div className="dib">
      <div className="flex flex-row">
        <div className={`b ${color}`}>My</div>
        <div className={`b ${slashColor}`}>K</div>
        <div className={`b  ${color}`}>onne</div>
        <MyKonnexionsSlash slashColor={slashColor} color={color} lineHeight={lineHeight} />
        <div className={`b  ${color}`}>ions {nominal}</div>
      </div>
    </div>
  )
}

export const MyKonnexionsTitleSpan = ({slashColor = 'primary', color = 'black', lineHeight = 1, nominal}: MyKonnexionsTitleProps) => {
  return (
    <span className="dib">
      <span className="flex flex-row">
        <span className={`b ${color}`}>My</span>
        <span className={`b ${slashColor}`}>K</span>
        <span className={`b  ${color}`}>onne</span>
        <MyKonnexionsSlash asSpan={true} slashColor={slashColor} color={color} lineHeight={lineHeight} />
        <span className={`b  ${color}`}>ions {nominal}</span>
      </span>
    </span>
  )
}

export default MyKonnexionsTitle