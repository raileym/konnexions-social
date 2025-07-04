import { useState } from 'react'
import { useAppContext } from '@context/AppContext/AppContext'
import {
  LANGUAGE_TITLE
} from '@cknTypes/constants'
import { TextareaFlexLesson } from '@components/TextareaFlexLesson/TextareaFlexLesson'
import { FormattedFlexLesson } from '@components/FormattedFlexLesson/FormattedFlexLesson'
import { ToastMarkdownEditor } from '@components/ToastMarkdownEditor/ToastMarkdownEditor'

const RightPanel = () => {

  const [markdown, setMarkdown] = useState('')
  
  const {
    cutoff,
    lessons,
    selectedLessonNumber,
    targetLanguage,
    flexLesson,
    setFlexLesson
  } = useAppContext()
  
  const lesson = lessons.find(l => l.number === selectedLessonNumber)
  
  const textareaFlexLessonTitle = 'Transform your Spanish text into high-quality speech using a cloud-based Text-to-Speech (TTS) service, or into standard quality speech using the built-in voice on your device.'

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
    

          <TextareaFlexLesson title={textareaFlexLessonTitle}/>

          <FormattedFlexLesson title={'Review your lesson before creating the corresponding translation and MP3 audio file.'}/>
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
