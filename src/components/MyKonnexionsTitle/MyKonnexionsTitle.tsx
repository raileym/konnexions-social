import MyKonnexionsSlash from '@components/MyKonnexionsSlash/MyKonnexionsSlash'

type MyKonnexionsTitleProps = {
  lineHeight?: number
  nominal?: string
}

const MyKonnexionsTitle = ({lineHeight = 1, nominal}: MyKonnexionsTitleProps) => {
  return (
    <div className="flex flex-row">
      <div className="b grey">My</div>
      <div className="b brand">K</div>
      <div>onne</div>
      <MyKonnexionsSlash lineHeight={lineHeight} />
      <div>ions {nominal}</div>
    </div>
  )
}

export default MyKonnexionsTitle