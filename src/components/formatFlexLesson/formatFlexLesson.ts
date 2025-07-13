import type { FlexLesson, FormattedFlexLesson } from '@cknTypes/types'

type FormatFlexLessonProps = {
  flexLesson: FlexLesson
}

export const formatFlexLesson = ({ flexLesson }: FormatFlexLessonProps): FormattedFlexLesson => {
  const formattedFlexLesson = flexLesson
    .split(/\r\n|\n|\r/)                    // split into lines
    .map(line => line.replace(/\\/g, ''))   // remove all backslashes
    .map(line => line.trim())              // trim whitespace
    .filter(line => line.length > 0)       // remove empty lines
    .map(line => `n|narrator|${line}`)     // add prefix after filtering

  return formattedFlexLesson
}
