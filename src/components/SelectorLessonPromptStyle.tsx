import { useMemo } from 'react'
import { useAppContext } from '@context/AppContext/AppContext'
import { type LessonPromptStyle } from '@cknTypes/types'
import { ACTIVE_PANEL, LESSON_PROMPT_STYLE } from '@cknTypes/constants'
import { usePanelBase } from '@hooks/usePanelBase'

const SelectorLessonPromptStyle = () => {
  const {
    lessonPromptStyle,
    setLessonPromptStyle
  } = useAppContext()

  const lessonPromptStyles = useMemo<LessonPromptStyle[]>(() => Object.values(LESSON_PROMPT_STYLE), [])

  const {tabIndex, ariaDisabled, ariaHidden, isOpen, isMounted } = usePanelBase({panelName: ACTIVE_PANEL.SELECTOR_LESSON_PROMPT_STYLE})

  return (
    <div className={`selector-lesson-prompt-style mb3 on-background ${isOpen ? 'panel-visible' : 'panel-hiddenX'} ${!isMounted ? 'dnX' : ''}`}>
      <label className="db mb2 f5 b">Content Style:</label>
      <div className="flex flex-wrap flex-column">
        {lessonPromptStyles.map((style) => (
          <label key={style} className="mh3 mb1 flex items-center">
            <input
              tabIndex={tabIndex}
              aria-disabled={ariaDisabled}
              aria-hidden={ariaHidden}
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
