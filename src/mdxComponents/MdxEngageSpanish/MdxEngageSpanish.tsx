import Button from '@components/Button/Button'
import { useAppContext } from '@context/AppContext/AppContext'

const MdxEngageSpanish = () => {

  const { setEngageSpanish } = useAppContext()
  
  return(
    <div className="flex flex-column">
      <div className="f5 tc brand">Let's Connect - Through Spanish</div>
      <Button
        iconClass={'f2'}
        buttonClass='mh3 bn grow'
        img={'icons8-sombrero-48.png'}
        title='Bienvenido!'
        onClick={() => setEngageSpanish(prev => !prev)}/>
    </div>
  )
}

export default MdxEngageSpanish