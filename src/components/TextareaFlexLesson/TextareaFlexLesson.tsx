import type { TextareaFlexLessonProps } from '@cknTypes/types'
import { useAppContext } from '@context/AppContext/AppContext'
import { formatFlexLesson } from '@components/formatFlexLesson/formatFlexLesson'
import { ACTIVE_PANEL } from '@cknTypes/constants'
import { usePanelBase } from '@hooks/usePanelBase'

// Assume you have this helper function somewhere
// const formatFlexLesson = ({ flexLesson }: { flexLesson: string }): string[] => {
//   return flexLesson
//     .split(/\r\n|\n|\r/)
//     .map(line => `n|narrator|${line.trim()}`)
//     .filter(line => line.length > 0)
// }

export const TextareaFlexLesson = ({title}: TextareaFlexLessonProps) => {
  const { flexLesson, setFlexLesson, setFormattedFlexLesson } = useAppContext()

  const { tabIndex, ariaDisabled, ariaHidden, isOpen, isMounted } = usePanelBase({panelName: ACTIVE_PANEL.TEXTAREA_FLEX_LESSON})

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value
    setFlexLesson(newText)

    const formattedFlexLesson = formatFlexLesson({ flexLesson: newText })
    setFormattedFlexLesson(formattedFlexLesson)
  }

  return (
    <>
      <div className={`textarea-flex-lesson tc w-60 center db mb2 f3 mb3 on-background ${isOpen ? 'panel-visible' : 'panel-hiddenX'} ${!isMounted ? 'dnX' : ''}`}>{title}</div>
      <textarea
        tabIndex={tabIndex}
        aria-disabled={ariaDisabled}
        aria-hidden={ariaHidden}
        value={flexLesson}
        onChange={handleChange}
        className="w-100 ba b--gray br2 pa2"
        rows={20}
      />
    </>
  )
}
