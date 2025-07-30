import type { MyConnexionsTitleLegalProps, MyKonnexionsTitleProps } from '@cknTypes/types'
import MyKonnexionsSlash from '@components/MyKonnexionsSlash/MyKonnexionsSlash'

const MyKonnexionsTitle = ({
  ariaLabel = '',
  ariaDescribedBy = '',
  ariaHidden = false,
  shorten = false, 
  slashColor = 'primary', 
  color = 'secondary', 
  fontSizeInRem = 1, 
  nominal = '',
  className
}: MyKonnexionsTitleProps) => {
  // const title = describedBy ? describedBy : `My Connections ${nominal}`

return (  
    <>
      <div aria-hidden={ariaHidden} aria-label={ariaLabel} aria-describedby={ariaDescribedBy} className={`${className} konnexions-title dib lh-2-kx`} >
        { shorten &&
          <div aria-hidden={true} className="flex flex-row" style={{marginLeft: '-0.3rem'}}>
            <div className={`b ${slashColor}`}>K</div>
            <MyKonnexionsSlash slashColor={slashColor} color={'var(--kx-background)'} fontSizeInRem={fontSizeInRem} />
          </div>
        }
        { !shorten &&
          <div aria-hidden={true} className="flex flex-row">
            {!shorten && <div className={`b ${color} mr2`}>My</div>}
            <div className={`b ${slashColor}`}>K</div>
            {!shorten && <div className={`b  ${color}`}>onne</div>}
            <MyKonnexionsSlash slashColor={slashColor} color={color} fontSizeInRem={fontSizeInRem} />
            {!shorten && <div className={`b  ${color}`}>ions<sup className="f7 relative" style={{ top: '-2em' }}>TM</sup></div>}
            {nominal ? <div className={`ml2 b ${color}`}>{nominal}</div> : null}
          </div>
        }
      </div>
    </>
  )
}

export const MyKonnexionsTitleSpan = ({
  slashColor = 'primary',
  color = 'secondary',
  fontSizeInRem = 1,
  nominal ='',
  className
}: MyKonnexionsTitleProps) => {
  return (
    <span aria-label={`my connections ${nominal}`} className={`konnexions-title-span dib ${className}`}>
      <span aria-disabled={true} className="inline-flex flex-wrap">
        <span className={`b ${color} mr1`}>My </span>
        <span className={`b ${slashColor}`}>K</span>
        <span className={`b  ${color}`}>onne</span>
        <MyKonnexionsSlash asSpan={true} slashColor={slashColor} color={color} fontSizeInRem={fontSizeInRem} />
        <span className={`b ${color}`}>ions<sup className="f7 relative" style={{ top: '-1em' }}>TM</sup></span>
        {nominal ? <span className={`ml1 b ${color}`}>{nominal}</span> : null}
      </span>
    </span>
  )
}

export const MyKonnexionsTitleLegal = ({nominal = ''}: MyConnexionsTitleLegalProps) => {
  return(
    <>
      <div className="dib b">MY KONNEXIONS<sup className="f7 relative" style={{ top: '-1.2em' }}>TM</sup></div>
      {nominal ? <div className="ml2 dib">{nominal}</div> : ''}
    </>
  )
}



export default MyKonnexionsTitle