import MyKonnexionsSlash from '@components/MyKonnexionsSlash/MyKonnexionsSlash'

type KonnexionsIconProps = {
  backgroundColor?: string
  slashColor?: string
  forwardColor?: string
}

const KonnexionsIcon = ({slashColor = 'brand', forwardColor = 'white', backgroundColor = 'moon-gray'}: KonnexionsIconProps) => {
  return (    
  <div className={'dibX kx-lh-2X kx-width-4X bg-yellow'}>
    <div className={'tcX flex flex-row kx-lh-4X justify-center items-center'}>
      <div className={'f2 b'}>K</div>
      {/* <MyKonnexionsSlash slashColor={slashColor} color={forwardColor} lineHeight={2} /> */}
    </div>
  </div>
  )
}       

export default KonnexionsIcon

// const KonnexionsIcon = ({slashColor = 'brand', forwardColor = 'white', backgroundColor = 'moon-gray'}: KonnexionsIconProps) => {
//   return (    
//   <div className={`ml5 bw1 br4 f2 b bg-${backgroundColor} ${slashColor} flex justify-center mr3 kx-width-1 kx-width-2-s kx-height-1 kx-height-2-s kx-lh-1 kx-lh-2-s`}>
//     <div className="baX flex flex-row dn">
//       <div className="lh-2X ml0X kx-lh-1X kx-lh-2-sX " style={{marginLeft: '-.3em'}}>K</div>
//       {/* <MyKonnexionsSlash slashColor={slashColor} color={forwardColor} lineHeight={2} /> */}
//     </div>
//   </div>
//   )
// }       

