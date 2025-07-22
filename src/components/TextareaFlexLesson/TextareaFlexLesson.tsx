import type { TextareaFlexLessonProps } from '@cknTypes/types'
import { useAppContext } from '@context/AppContext/AppContext'
import { formatFlexLesson } from '@components/formatFlexLesson/formatFlexLesson'
import { SCREEN } from '@cknTypes/constants'

// Assume you have this helper function somewhere
// const formatFlexLesson = ({ flexLesson }: { flexLesson: string }): string[] => {
//   return flexLesson
//     .split(/\r\n|\n|\r/)
//     .map(line => `n|narrator|${line.trim()}`)
//     .filter(line => line.length > 0)
// }

export const TextareaFlexLesson = ({title}: TextareaFlexLessonProps) => {
  const { flexLesson, setFlexLesson, setFormattedFlexLesson, screenState } = useAppContext()

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value
    setFlexLesson(newText)

    const formattedFlexLesson = formatFlexLesson({ flexLesson: newText })
    setFormattedFlexLesson(formattedFlexLesson)
  }

  return (
    <>
      <div className="w-60 center db mb2 f3 mb3">{title}</div>
      <textarea
        tabIndex={screenState[SCREEN.REVIEW] ? 0 : -1}
        aria-disabled={!screenState[SCREEN.REVIEW]}
        value={flexLesson}
        onChange={handleChange}
        className="w-100 ba b--gray br2 pa2"
        rows={20}
      />
    </>
  )
}
