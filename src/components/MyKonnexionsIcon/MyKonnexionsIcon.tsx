import MyKonnexionsSlash from '@components/MyKonnexionsSlash/MyKonnexionsSlash'

type KonnexionsIconProps = {
  backgroundColor?: string
  slashColor?: string
  forwardColor?: string
}

const KonnexionsIcon = ({slashColor = 'brand', forwardColor = 'white', backgroundColor = 'moon-gray'}: KonnexionsIconProps) => {
  return (    
  <div className={`ml5 bw1 br4 f2 b bg-${backgroundColor} ${slashColor} flex justify-center mr3 kx-width-1 kx-width-2-s kx-height-1 kx-height-2-s kx-lh-1 kx-lh-2-s`}>
    <div className="baX flex flex-row">
      <div className="ml0 kx-lh-1 kx-lh-2-s " style={{marginLeft: '-.3em'}}>K</div>
      <MyKonnexionsSlash slashColor={slashColor} color={forwardColor} lineHeight={1} />
    </div>
  </div>
  )
}       

export default KonnexionsIcon
