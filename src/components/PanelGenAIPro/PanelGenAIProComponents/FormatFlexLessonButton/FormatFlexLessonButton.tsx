import { useAppContext } from '@context/AppContext/AppContext'

export const FormatFlexLessonButton = () => {

  const {
    flexLesson,
    setFormattedLesson
  } = useAppContext()

  const handleFormat = () => {
    // Split on CRLF (\r\n), LF (\n), or CR (\r) and filter out empty lines
    const lines = flexLesson
      .split(/\r\n|\n|\r/)
      .map(line => line.trim())
      .filter(line => line.length > 0)

    setFormattedLesson(lines)
  }

  return (
    <button className="pa3 br4 bw1 bg-brand" onClick={handleFormat}>
      Format Flex Lesson
    </button>
  )
}
