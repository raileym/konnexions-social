import { useEffect, useState } from 'react'

type Props = {
  isLoading: boolean
}

export const LessonStatus = ({ isLoading }: Props) => {
  const [dots, setDots] = useState('')

  useEffect(() => {
    if (!isLoading) {
      setDots('')
      return
    }

    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'))
    }, 500)

    return () => clearInterval(interval)
  }, [isLoading])

  return (
    <div className="baX text-center mt-4X text-lg font-medium text-gray-800X blackX w-100">
      {isLoading ? 
        <div className="flex flex-row justify-center w-100X">
          <div className="baX tr w-30 mr1 black">Creating Lesson</div>
          <div className="baX tl w-10 ml1">{dots}</div>
        </div> :
        <div className="flex flex-row justify-center w-100X">
          <div>Lesson Complete</div>
        </div>}      
    </div>
  )
}
