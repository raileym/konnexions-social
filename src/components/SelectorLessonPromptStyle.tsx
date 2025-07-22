import React, { useMemo } from 'react'
import { useAppContext } from '@context/AppContext/AppContext'
import { type LessonPromptStyle } from '@cknTypes/types'
import { LESSON_PROMPT_STYLE, SCREEN } from '@cknTypes/constants'

const SelectorLessonPromptStyle: React.FC = () => {
  const {
    lessonPromptStyle,
    setLessonPromptStyle,
    screenState
  } = useAppContext()

  const lessonPromptStyles = useMemo<LessonPromptStyle[]>(() => Object.values(LESSON_PROMPT_STYLE), [])

  return (
    <div className="mb3">
      <label className="db mb2 f5 b">Content Style:</label>
      <div className="flex flex-wrap flex-column">
        {lessonPromptStyles.map((style) => (
          <label key={style} className="mh3 mb1 flex items-center">
            <input
              tabIndex={screenState[SCREEN.GEN_AI_PRO] ? 0 : -1}
              aria-hidden={!screenState[SCREEN.GEN_AI_PRO]}
              type="radio"
              name="content-style"
              value={style}
              checked={lessonPromptStyle === style}
              onChange={() => setLessonPromptStyle(style)}
              className="mr1"
            />
            {style.charAt(0).toUpperCase() + style.slice(1)}
          </label>
        ))}
      </div>
    </div>
  )
}

export default SelectorLessonPromptStyle
