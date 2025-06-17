import React, { useState } from 'react'
import type { Prompt } from '@cknTypes/types'

type PromptToggleProps = {
  title: string
  prompt: Prompt
}

const PromptToggle: React.FC<PromptToggleProps> = ({ title, prompt }) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="w-100 mv3">
      <button
        onClick={() => setIsVisible(prev => !prev)}
        className="pa2 br3 bg-brand black pointer b--black"
      >
        {isVisible ? `Hide ${title}` : `Show ${title}`}
      </button>

      {isVisible && (
        <div className="w-100 flex justify-center flex-column">
          <div className="mv4 ba pa3 bg-white">
            <div className="b" style={{ whiteSpace: 'pre-wrap' }}>{title}</div>
            <div className="db" style={{ whiteSpace: 'pre-wrap' }}>{prompt}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PromptToggle
