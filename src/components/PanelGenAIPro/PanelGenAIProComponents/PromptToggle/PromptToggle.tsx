import React, { useState } from 'react'
import type { Prompt } from '@cknTypes/types'
import { SCREEN } from '@cknTypes/constants'
import { useAppContext } from '@context/AppContext/AppContext'

type PromptToggleProps = {
  title: string
  prompt: Prompt
  className?: string
}

const PromptToggle: React.FC<PromptToggleProps> = ({ title, prompt, className = 'b--background bg-brand black' }) => {
  const [isVisible, setIsVisible] = useState(false)

  const { screenState } = useAppContext()
  
  return (
    <>
      <div className={'w-100 mv3X'}>
        <button
          tabIndex={screenState[SCREEN.CREATE] ? 0 : -1}
          onClick={() => setIsVisible(prev => !prev)}
          className={`pa2 br3 ma1 pointer b--background ${className}`}
        >
          {isVisible ? `Hide ${title}` : `Show ${title}`}
        </button>
      </div>

      {isVisible && (
        <div className="w-100 db flex justify-center flex-column">
          <div className="mv4 ba pa3 bg-on-background">
            <div className="b" style={{ whiteSpace: 'pre-wrap' }}>{title}</div>
            <div className="db" style={{ whiteSpace: 'pre-wrap' }}>{prompt}</div>
          </div>
        </div>
      )}
    </>
  )
}

export default PromptToggle
