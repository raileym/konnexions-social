import { useMemo } from 'react'
import { useAppContext } from '@context/AppContext/AppContext'
import { type LessonPromptStyle, type SelectorLessonPromptStyleProps } from '@cknTypes/types'
import { LESSON_PROMPT_STYLE } from '@cknTypes/constants'

const SelectorLessonPromptStyle = ({tabIndex, ariaDisabled}: SelectorLessonPromptStyleProps) => {
  const {
    lessonPromptStyle,
    setLessonPromptStyle
  } = useAppContext()

  const lessonPromptStyles = useMemo<LessonPromptStyle[]>(() => Object.values(LESSON_PROMPT_STYLE), [])

  return (
    <div className="mb3 on-background">
      <label className="db mb2 f5 b">Content Style:</label>
      <div className="flex flex-wrap flex-column">
        {lessonPromptStyles.map((style) => (
          <label key={style} className="mh3 mb1 flex items-center">
            <input
              tabIndex={tabIndex}
              aria-disabled={ariaDisabled}
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
