import { useAppContext } from '@context/AppContext/AppContext'
import {
  LANGUAGE_TITLE
} from '@cknTypes/constants'
import { formatFlexLesson } from '@components/formatFlexLesson/formatFlexLesson'
import { useLessonHandlers } from '@hooks/useLessonHandlers'
import { TiptapEditor } from '@components/TiptapEditor/TiptapEditor'

const PanelBasic = () => {

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

  console.log('lesson', lesson)
  
  const tiptapEditorTitle = 'Transform your Spanish text into high-quality speech using a cloud-based Text-to-Speech (TTS) service, or into standard quality speech using the built-in voice on your device.'

  let content
  if (selectedLessonNumber != null && Array.isArray(lessons)) {
    if (!lesson) {
      content = <p>Lesson not found.</p>
    } else {
      content = (
        <>
          <h2 className="baX f2 f3-m pa3 pb0X mt4X w-100 items-center tc">
            <div>
              {LANGUAGE_TITLE[targetLanguage]}: Basic
            </div>
          <div className="w-100 black f2 f3-m ">Lesson {selectedLessonNumber}</div>
          </h2>

          <TiptapEditor
            initialValue={lesson.flexLesson}
            title={tiptapEditorTitle}
            onChange={setFlexLesson}
            // onChange={(newContent: string) => {
            //   setFlexLesson(newContent)
            //   lesson.flexLesson = newContent
            //   // setLesson(prev => ({
            //   //   ...prev,
            //   //   flexLesson: newContent
            //   // }))
            // }}
          />


          <div className={'mt3 mb4 flex justify-center'}>
            <div>
              <button
                className={'f3 pa3 br4 bn bg-brand white pointer'}
                onClick={() => {
                  const formattedFlexLesson = formatFlexLesson({flexLesson})
                  createFlexLesson({flexLesson, formattedFlexLesson})
                }}
              >
                Create Lesson
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
    <div className={'panel-right panel-basic baX bw1 b--moon-gray bl panel-basic z-1 absolute top-0 left-0 w-100 h-100 bg-light-greenX flex flex-rowX transition-transform translate-x-0'}>

      <div className={`baX b--greenX bw1X w-100 vh-100 pb6 overflow-y-auto pa3 bg-light-gray ${cutoff ? 'bg-yellow' : ''}`} style={{ paddingTop: '7em' }}>
      {content}
      </div>
    </div>
  )
}

export default PanelBasic
