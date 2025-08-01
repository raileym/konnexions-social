import { useMemo } from 'react'
import { useAppContext } from '@context/AppContext/AppContext'
import {
  ACTIVE_PANEL,
  LANGUAGE_TITLE,
  TABINDEX_NEVER,
} from '@cknTypes/constants'
import { DialogList } from '@components/DialogList/DialogList'
import { usePanelManager } from '@context/PanelManagerContext/PanelManagerContext'
import { usePanelBase } from '@hooks/usePanelBase'
// import { useDebugLogger } from '@hooks/useDebugLogger'

const PanelBasicStudyComponents = () => {

const { openPanel, closePanel } = usePanelManager()
// const { openPanel, closePanel, focusPanel } = usePanelManager()

  const { firstFocusButtonRef, tabIndex, ariaDisabled, isOpen, isMounted } = usePanelBase({
    panelName: ACTIVE_PANEL.BASIC_STUDY_COMPONENTS,
    callback: {
      onOpen: () => {
        openPanel(ACTIVE_PANEL.DIALOG_LIST)
        openPanel(ACTIVE_PANEL.DIALOG_LINE)
    //     openPanel(ACTIVE_PANEL.INPUT_LESSON_NAME)
    //     openPanel(ACTIVE_PANEL.TIPTAP_EDITOR)
      },
      onClose: () => {
        closePanel(ACTIVE_PANEL.DIALOG_LIST)
        closePanel(ACTIVE_PANEL.DIALOG_LINE)
    //     closePanel(ACTIVE_PANEL.INPUT_LESSON_NAME)
    //     closePanel(ACTIVE_PANEL.TIPTAP_EDITOR)
      },
    //   onFocus: () => {
    //     focusPanel(ACTIVE_PANEL.INPUT_LESSON_NAME)
    //   }
    }
  })

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

          <button ref={firstFocusButtonRef} inert={!isOpen} tabIndex={tabIndex} aria-disabled={ariaDisabled} className="wiggle bg-secondary pv1 ph3">Placeholder</button>

          {!ariaDisabled && 
            <>
              <div className="w-60 center db mb4 f3 mb3 on-background">{tiptapEditorTitle}</div>
              <div className="pa3 mt3 ba bg-background w-100">
                <DialogList
                  language={lesson.targetLanguage}
                  lines={(lesson?.dialogResolve?.lines ?? [])}
                  translations={(lesson?.translationResolve?.lines ?? [])} 
                  useCloudTTS={true} />
              </div>
            </>
          }

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

  return (
    <div className={`panel-basic-study-components panel-right z-1 absolute top-0 left-0 w-100 h-100 flex ${isOpen ? 'panel-visible' : 'panel-hiddenX'} ${!isMounted ? 'dnX' : ''}`}>
      <div tabIndex={TABINDEX_NEVER} inert={!isOpen} aria-disabled={false} className={`b--greenX bw1X w-100 vh-100 pb6 overflow-y-auto pa3 bg-light-gray ${cutoff ? 'bg-yellow' : ''}`} style={{ paddingTop: '7em' }}>
        {content}
      </div>
    </div>
  )
}

export default PanelBasicStudyComponents
