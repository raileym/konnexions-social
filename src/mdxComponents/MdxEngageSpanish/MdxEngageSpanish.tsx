import { ACTIVE_PANEL, TABINDEX_NEVER } from '@cknTypes/constants'
import Button from '@components/Button/Button'
import { useAppContext } from '@context/AppContext/AppContext'
import { usePanelBase } from '@hooks/usePanelBase'

const MdxEngageSpanish = () => {

  const { setEngageSpanish } = useAppContext()
  
  const { isOpen } = usePanelBase({panelName: ACTIVE_PANEL.MDX_ENGAGE_SPANISH})
  
  return(
    <div className="mv5 flex flex-column grow-largeW wiggle">
      <div className="f5 tc brand">Let's konnect! - Through Spanish</div>
      <Button
        tabIndex={TABINDEX_NEVER}
        ariaLabelledBy={''}
        ariaDisabled={true}
        iconClass={'f2'}
        inert={!isOpen}
        buttonClass='mh3 bn grow'
        img={'icons8-sombrero-48.png'}
        title='Bienvenido!'
        onClick={() => setEngageSpanish(prev => !prev)}/>
    </div>
  )
}

export default MdxEngageSpanish