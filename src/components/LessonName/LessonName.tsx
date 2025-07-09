import React from 'react'
import { useAppContext } from '@context/AppContext/AppContext'

const LessonName: React.FC = () => {
  const { lessonName, setLessonName } = useAppContext()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLessonName(e.target.value)
  }

  return (
    <div className="mv3X flex flex-column items-start w-40 justify-center center mb4">
      <label htmlFor="lessonName" className="f3 db mb2 black">
        Lesson Name
      </label>
      <input
        id="lessonName"
        type="text"
        value={lessonName}
        onChange={handleChange}
        className="pa2 input-reset ba b--black bg-white black w-100 br2"
        placeholder="Enter a lesson name"
      />
    </div>
  )
}

export default LessonName
