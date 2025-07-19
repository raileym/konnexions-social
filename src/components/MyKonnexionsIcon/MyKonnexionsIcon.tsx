import MyKonnexionsSlash from '@components/MyKonnexionsSlash/MyKonnexionsSlash'

type KonnexionsIconProps = {
  backgroundColor?: string
}

const KonnexionsIcon = ({backgroundColor = 'silver'}: KonnexionsIconProps) => {
  return (    
  <div className={`baX b--silverX bw1 br4 f2 b bg-${backgroundColor} primary h3X w3X pa2X flex items-centerX justify-center mr3`} style={{width: '2em', lineHeight: '2em'}}>
    <div className="baX flex flex-row">
      <div className="ml0" style={{marginLeft: '-.3em'}}>K</div><MyKonnexionsSlash color='white' lineHeight={2} />
    </div>
  </div>
  )
}       

export default KonnexionsIcon
