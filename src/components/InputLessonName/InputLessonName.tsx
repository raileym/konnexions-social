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
  
  const { firstFocusInputRef, tabIndex, ariaDisabled } = usePanelBase({panelName: ACTIVE_PANEL.BASIC_CREATE})

  useEffect(() =>{
    if (tabIndex === 0) {
      // myFirstFocusRef.current?.focus()
    }
  }, [tabIndex])
  
  return (
    <div className="mv3X flex flex-column items-start w-40 justify-center center mb4">
      <label htmlFor="lessonName" className="f3 db mb2 background">
        Lesson Name
      </label>
      <input
        ref={firstFocusInputRef}
        tabIndex={tabIndex}
        aria-disabled={ariaDisabled}
        id="lessonName"
        type="text"
        value={lessonName}
        onChange={(e) => onChange(e.target.value)}
        className="pa2 input-reset ba b--background bg-on-background background w-100 br2"
        placeholder="Enter a lesson name"
      />
    </div>
  )
}

export default InputLessonName
