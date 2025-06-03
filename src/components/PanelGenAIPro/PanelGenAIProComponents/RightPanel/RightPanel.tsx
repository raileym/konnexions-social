import React from 'react'
import { useAppContext } from '../../../../context/AppContext'

const RightPane: React.FC = () => {
  const {
    lessons,
    selectedLessonId,
  } = useAppContext()
  
  return (
    <div className="w-80 vh-100 overflow-y-auto pa3 bg-light-gray">
      {selectedLessonId != null ? (
        (() => {
          const currentLesson = lessons.find(l => l.id === selectedLessonId)

          if (!currentLesson) return <p>Lesson not found.</p>

          console.log(currentLesson)
          
          return (
            <>
              <h2>{currentLesson.name}</h2>
              <p>{currentLesson.description}</p>
              <ul className="mt0 pt0 black">
                {currentLesson.dialog?.lines?.map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ul>
            </>
          )
        })()
      ) : (
        <p>Select a lesson to view details.</p>
      )}
    </div>
  )
}

export default RightPane
