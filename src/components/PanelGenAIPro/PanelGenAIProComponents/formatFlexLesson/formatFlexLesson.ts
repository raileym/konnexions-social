import type { FlexLesson, FormattedFlexLesson } from '@cknTypes/types'

type FormatFlexLessonProps = {
  flexLesson: FlexLesson
}
export const formatFlexLesson = ({ flexLesson }: FormatFlexLessonProps): FormattedFlexLesson => {
  const formattedFlexLesson = flexLesson
    .split(/\r\n|\n|\r/)
    .map(line => `n|narrator|${line.trim()}`)
    .filter(line => line.length > 0)

  return formattedFlexLesson
}
