// InputLessonName.tsx

import type { LessonName } from '@cknTypes/types'

type InputLessonNameProps = {
  lessonName: LessonName
  onChange: (newValue: string) => void
}

const InputLessonName = ({ lessonName, onChange }: InputLessonNameProps) => {
  return (
    <div className="mv3X flex flex-column items-start w-40 justify-center center mb4">
      <label htmlFor="lessonName" className="f3 db mb2 black">
        Lesson Name
      </label>
      <input
        id="lessonName"
        type="text"
        value={lessonName}
        onChange={(e) => onChange(e.target.value)}
        className="pa2 input-reset ba b--black bg-white black w-100 br2"
        placeholder="Enter a lesson name"
      />
    </div>
  )
}

export default InputLessonName
