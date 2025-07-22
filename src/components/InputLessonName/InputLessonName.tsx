// InputLessonName.tsx

import { SCREEN } from '@cknTypes/constants'
import type { LessonName } from '@cknTypes/types'
import { useAppContext } from '@context/AppContext/AppContext'

type InputLessonNameProps = {
  lessonName: LessonName
  onChange: (newValue: string) => void
}

const InputLessonName = ({ lessonName, onChange }: InputLessonNameProps) => {

  const { screenState } = useAppContext()
  
  return (
    <div className="mv3X flex flex-column items-start w-40 justify-center center mb4">
      <label htmlFor="lessonName" className="f3 db mb2 background">
        Lesson Name
      </label>
      <input
        tabIndex={screenState[SCREEN.CREATE] ? 0 : -1}
        aria-hidden={!screenState[SCREEN.CREATE]}
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
