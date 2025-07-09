// LessonName.tsx

import React from 'react'

type LessonNameProps = {
  value: string
  onChange: (newValue: string) => void
}

const LessonName: React.FC<LessonNameProps> = ({ value, onChange }) => {
  return (
    <div className="mv3X flex flex-column items-start w-40 justify-center center mb4">
      <label htmlFor="lessonName" className="f3 db mb2 black">
        Lesson Name
      </label>
      <input
        id="lessonName"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pa2 input-reset ba b--black bg-white black w-100 br2"
        placeholder="Enter a lesson name"
      />
    </div>
  )
}

export default LessonName
