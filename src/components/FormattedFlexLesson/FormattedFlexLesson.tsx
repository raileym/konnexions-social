import { useAppContext } from '@context/AppContext/AppContext'
import { FormatSentence } from '@components/FormatSentence/FormatSentence'
import type { FormattedFlexLessonProps } from '@cknTypes/types'

export const FormattedFlexLesson = ({title}: FormattedFlexLessonProps) => {
  const { formattedFlexLesson } = useAppContext()

  return (
    <>
      <div className="w-60 center db mb2 f3 mb3">{title}</div>
      <div className="pa3 mt3 mb5 ba bg-white w-100">
        <ul className="mt0 pt0 black list pl0">
          {(formattedFlexLesson ?? []).map((line, index) => {
            const [, , sentence] = line.split('|')  // extract only the sentence
            return (
              <li key={index} className="black">
                <FormatSentence sentence={sentence} />
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
