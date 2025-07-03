import { useAppContext } from '@context/AppContext/AppContext'

export const FormatFlexLessonButton = ({ onClick }: { onClick?: (lines: string[]) => void }) => {
  const {
    flexLesson,
    setFormattedLesson
  } = useAppContext()

  const handleFormat = () => {
    const lines = flexLesson
      .split(/\r\n|\n|\r/)
      .map(line => line.trim())
      .filter(line => line.length > 0)

    setFormattedLesson(lines)
    return lines
  }

  const handleClick = () => {
    const lines = handleFormat()
    if (onClick) onClick(lines)
  }

  return (
    <button className="pa3 br4 bw1 bg-brand" onClick={handleClick}>
      Format Flex Lesson
    </button>
  )
}
