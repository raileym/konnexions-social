// InputLessonName.tsx

import { ACTIVE_PANEL } from '@cknTypes/constants'
import type { LessonName } from '@cknTypes/types'
import { usePanelBase } from '@hooks/usePanelBase'
import { useEffect } from 'react'

type InputLessonNameProps = {
  lessonName: LessonName
  onChange: (newValue: string) => void
}

const InputLessonName = ({ lessonName, onChange }: InputLessonNameProps) => {
  
  const { firstFocusInputRef, tabIndex, ariaDisabled, ariaHidden, isOpen, isMounted } = usePanelBase({panelName: ACTIVE_PANEL.INPUT_LESSON_NAME})

  useEffect(() =>{
    if (tabIndex === 0) {
      // myFirstFocusRef.current?.focus()
    }
  }, [tabIndex])
  
  return (
    <div className={`Input-lesson-name mv3X flex flex-column items-start w-40 justify-center center mb4 ${isOpen ? 'panel-visible' : 'panel-hiddenX'} ${!isMounted ? 'dnX' : ''}`}>
      <label htmlFor="lessonName" className="f3 db mb2 on-background">
        Lesson Name
      </label>
      <div className="w-100 bw3 b--double b--transparent focus-within:b--red pa2">
        <input
          ref={firstFocusInputRef}
          tabIndex={tabIndex}
          inert={!isOpen}
          aria-disabled={ariaDisabled}
          aria-hidden={ariaHidden}
          id="lessonName"
          type="text"
          value={lessonName}
          onChange={(e) => onChange(e.target.value)}
          className="pa2 input-reset ba b--black bw1 focus:bnX focus-visible:bnX br2 bg-white black w-100"
          placeholder="Enter a lesson name"
        />
      </div>
    </div>
  )
}

export default InputLessonName
