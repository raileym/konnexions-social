
const KonnexionsSlash = () => {
  return (
    <>
    <div className="baX flex flow-row justify-centerX items-centerX">
      <div className="flex flex-row relative">
        {/* <div className="transparent mr1">x</div> */}
      <div className="bg-black baX b--blue transparent mh2 w1 h1 skew-45" style={{marginRight: '.3em', width: '.15em', height: '0.52em'}}>x</div>
        <div
          className="konnexion-slash absolute transparent"
          style={{
            height: '1em',
            fontSize: '0.6em',
            top: '0.2em',
            left: '0.1em',
          }}
        >
          x
        </div>
      </div>
      {/* <div className="bg-black baX b--blue transparent mh3 w1 h1 skew-45" style={{width: '.15em', height: '0.52em'}}>x</div> */}
    </div>
    </>
  )
}

export default KonnexionsSlash

// const KonnexionsSlash = () => {
//   return (
//     <div className="flex flex-row relative">
//       <div className="transparent mr1">x</div>
//       <div className="konnexion-slash absolute" style={{height: '1em', fontSize: '0.6em', top: '0.5em', left: '0.1em'}}>X</div>
//     </div>
//   )
// }

// export default KonnexionsSlash