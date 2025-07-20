import { useAppContext } from '@context/AppContext/AppContext'
import { useEffect, useState } from 'react'

export const LessonStatus = () => {
  const [dots, setDots] = useState('')

  const { lessonComplete } = useAppContext()
  
  useEffect(() => {
    if (lessonComplete) {
      setDots('')
      return
    }

    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'))
    }, 500)

    return () => clearInterval(interval)
  }, [lessonComplete])

  return (
    <div className="text-center mt-4X text-lg font-medium text-gray-800X blackX w-100">
      {!lessonComplete ? 
        <div className="flex flex-row justify-center w-100X">
          <div className="tr w-30 mr1 black">Creating Lesson</div>
          <div className="tl w-10 ml1">{dots}</div>
        </div> :
        <div className="flex flex-row justify-center w-100X">
          <div>Lesson Complete</div>
        </div>}      
    </div>
  )
}
