import React from 'react'
import { useAppContext } from '../../../../context/AppContext/AppContext'
import { defaultLesson, type Lesson } from '../../../../../shared/cknTypes/types/types'
import CutoffToggle from '../../../CutoffToggle'
import ShowMaxCount from '../../../ShowMaxCount'

const LeftPane: React.FC = () => {
  const {
    lessons,
    setLessons,
    selectedLessonId,
    setSelectedLessonId
  } = useAppContext()
  
const handleAddLesson = () => {
  const newId = lessons.length + 1
  const newLesson: Lesson = {
    ...defaultLesson,
    
    id: newId,
    name: `Lesson ${newId}`,
    description: `This is the content for Lesson ${newId}`
  }

  setLessons([...lessons, newLesson])
  setSelectedLessonId(newId) // optionally auto-select new lesson
}


  return (
    <div className="w-30 vh-100 overflow-y-auto pa3 bg-washed-yellow" style={{paddingTop: '7em'}}>
      <button
        onClick={handleAddLesson}
        // onClick={() => {
        //   const newId = lessons.length + 1
        //   setLessons([...lessons, { id: newId, name: `Lesson ${newId}`, dialog: { lines: [] } }])
        // }}
        className="mb3 pa2 bg-light-blue br2 b"
      >
        + Add Lesson
      </button>
      <ul className="list pa0">
        {Array.isArray(lessons) && lessons.length > 0 ? (
          lessons.map((lesson) => (
            <li
              key={lesson.id}
              onClick={() => setSelectedLessonId(lesson.id)}
              className={`pa2 pointer br2 ${
                selectedLessonId === lesson.id ? 'bg-light-green b' : 'hover-bg-light-gray'
              }`}
            >
              {lesson.name}
            </li>
          ))
        ) : (
          <li className="pa2 gray">No saved lessons yet.</li>
        )}
      </ul>
      <CutoffToggle />
      <ShowMaxCount />
    </div>
  )
}

export default LeftPane
