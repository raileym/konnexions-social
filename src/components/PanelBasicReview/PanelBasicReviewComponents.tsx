import React, { useMemo } from 'react'
import { useAppContext } from '@context/AppContext/AppContext'
import {
  LANGUAGE_TITLE,
} from '@cknTypes/constants'
import { DialogList } from '@components/DialogList/DialogList'
// import { useDebugLogger } from '@hooks/useDebugLogger'

const PanelBasicReviewComponents: React.FC = () => {
  // const [showDialogDraftPrompt, setShowDialogDraftPrompt] = useState(false)

  // const debugLog = useDebugLogger()

  const {
    cutoff,
    lessons,
    selectedLessonNumber,
    targetLanguage,
  } = useAppContext()
  
  const tiptapEditorTitle = 'Transform your Spanish text into high-quality speech using a cloud-based Text-to-Speech (TTS) service, or into standard quality speech using the built-in voice on your device.'

  const lesson = useMemo(() => {
    return lessons.find(l => l.number === selectedLessonNumber)
  }, [lessons, selectedLessonNumber])
  
  // cXonsole.log('PanelBasicReviewComponents', lesson)

  let content
  if (selectedLessonNumber != null && Array.isArray(lessons)) {
    if (!lesson) {
      content = <p>Lesson not found.</p>
    } else {
      content = (
        <>
          <h2 className="f2 on-background pa3 pb0X mt4X w-100 items-center tc">
            <div>
              {LANGUAGE_TITLE[targetLanguage]}: Basic
            </div>
          <div className="w-100 on-background f2">Lesson {selectedLessonNumber}</div>
          </h2>

          <div className="w-60 center db mb4 f3 mb3 on-background">{tiptapEditorTitle}</div>
          <div className="pa3 mt3 ba bg-background w-100">
            <DialogList
              language={lesson.targetLanguage}
              lines={(lesson?.dialogResolve?.lines ?? [])}
              translations={(lesson?.translationResolve?.lines ?? [])} 
              useCloudTTS={true} />
          </div>

          {/* <ul className="mv3 bg-on-background background">
            {lesson.translationResolve.lines.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul> */}
        </>
      )
    }
  } else {
    content = (
      <>
        <p>No lessons loaded.</p>
        <p>Select a lesson to view details.</p>
      </>
    )
  }

  // useEffect(() => {
  //   // debugLog('lesson', lesson)
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[lesson])

  return (
    <div className={'panel-right panel-basic-review-components z-1 absolute top-0 left-0 w-100 h-100 flex'}>
      <div tabIndex={-1} aria-hidden={false} className={`b--greenX bw1X w-100 vh-100 pb6 overflow-y-auto pa3 bg-light-gray ${cutoff ? 'bg-yellow' : ''}`} style={{ paddingTop: '7em' }}>
        {content}
      </div>
    </div>
  )
}

export default PanelBasicReviewComponents
