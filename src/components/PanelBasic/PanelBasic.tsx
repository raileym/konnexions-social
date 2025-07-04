import { useAppContext } from '@context/AppContext/AppContext'
import {
  LANGUAGE_TITLE
} from '@cknTypes/constants'
import { ToastMarkdownEditor } from '@components/ToastMarkdownEditor/ToastMarkdownEditor'
import { formatFlexLesson } from '@components/formatFlexLesson/formatFlexLesson'
import { useLessonHandlers } from '@hooks/useLessonHandlers'

const RightPanel = () => {

  const {
    cutoff,
    lessons,
    selectedLessonNumber,
    targetLanguage,
    flexLesson,
    setFlexLesson
  } = useAppContext()
  
  const {
    createFlexLesson
  } = useLessonHandlers()

  const lesson = lessons.find(l => l.number === selectedLessonNumber)
  
  const toastMarkdownEditorTitle = 'Transform your Spanish text into high-quality speech using a cloud-based Text-to-Speech (TTS) service, or into standard quality speech using the built-in voice on your device.'

  let content
  if (selectedLessonNumber != null && Array.isArray(lessons)) {
    if (!lesson) {
      content = <p>Lesson not found.</p>
    } else {
      content = (
        <>
          <h2 className="baX f2 pa3 pb0X mt4X w-100 items-center tc">
            <div>
              {LANGUAGE_TITLE[targetLanguage]}: Basic
            </div>
          <div className="w-100 black f2">Lesson {selectedLessonNumber}</div>
          </h2>

          <div>
            <ToastMarkdownEditor initialValue={flexLesson} title={toastMarkdownEditorTitle} onChange={setFlexLesson} />
          </div>

          <div className={'mt3 mb4 flex justify-center'}>
            <div>
              <button
                className={'f3 pa3 br4 bn bg-brand white pointer'}
                onClick={() => {
                  const formattedFlexLesson = formatFlexLesson({flexLesson})
                  createFlexLesson({formattedFlexLesson})
                }}
              >
                Create Flex Lesson
              </button>
            </div>
          </div>
          

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

  return (
    <div className={'baX bw1 b--moon-gray bl gen-ai-pro-panel z-0 absolute top-0 left-10 w-90 h-100 bg-light-greenX flex flex-rowX transition-transform translate-x-0'}>

      <div className={`baX b--greenX bw1X w-100 vh-100 pb6 overflow-y-auto pa3 bg-light-gray ${cutoff ? 'bg-yellow' : ''}`} style={{ paddingTop: '7em' }}>
      {content}
      </div>
    </div>
  )
}

export default RightPanel
