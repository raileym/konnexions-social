import { useAppContext } from '@context/AppContext/AppContext'
import { formatFlexLesson } from '@PanelGenAIProComponents/formatFlexLesson/formatFlexLesson'

// Assume you have this helper function somewhere
// const formatFlexLesson = ({ flexLesson }: { flexLesson: string }): string[] => {
//   return flexLesson
//     .split(/\r\n|\n|\r/)
//     .map(line => `n|narrator|${line.trim()}`)
//     .filter(line => line.length > 0)
// }

export const TextareaFlexLesson = () => {
  const { flexLesson, setFlexLesson, setFormattedFlexLesson } = useAppContext()

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value
    setFlexLesson(newText)

    const formattedFlexLesson = formatFlexLesson({ flexLesson: newText })
    setFormattedFlexLesson(formattedFlexLesson)
  }

  return (
    <>
      <label className="db mb2 f5 b">Flex Lesson</label>
      <textarea
        value={flexLesson}
        onChange={handleChange}
        className="w-100 ba b--gray br2 pa2"
        rows={10}
      />
    </>
  )
}
