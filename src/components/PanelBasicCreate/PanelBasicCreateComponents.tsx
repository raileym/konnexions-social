import { useAppContext } from '@context/AppContext/AppContext'
import {
  ACTIVE_PANEL,
  LANGUAGE_TITLE
} from '@cknTypes/constants'
import { formatFlexLesson } from '@components/formatFlexLesson/formatFlexLesson'
import { useLessonHandlers } from '@hooks/useLessonHandlers'
import { TiptapEditor } from '@components/TiptapEditor/TiptapEditor'
import InputLessonName from '@components/InputLessonName/InputLessonName'
import { useEffect, useMemo, useState } from 'react'
import type { Lesson, Lines } from '@cknTypes/types'
import { usePanelBase } from '@hooks/usePanelBase'

const PanelBasicCreateComponents = () => {
  const [formattedFlexLesson, setFormattedFlexLesson] = useState<Lines>([])

  const { firstFocusButtonRef, tabIndex, ariaDisabled } = usePanelBase({
    panelName: ACTIVE_PANEL.BASIC_CREATE_COMPONENTS
  })

  const {
    cutoff,
    lessons,
    selectedLessonNumber,
    targetLanguage,
    // flexLesson,
    setFlexLesson,
    setLessons
  } = useAppContext()
  
  const {
    createFlexLesson
  } = useLessonHandlers()

  const lesson = useMemo(() => {
    return lessons.find(l => l.number === selectedLessonNumber)
  }, [lessons, selectedLessonNumber])

  const updateLessonField = (partialUpdate: Partial<Lesson>) => {
    setLessons(prev =>
      prev.map(lsn =>
        lsn.number === selectedLessonNumber
          ? { ...lsn, ...partialUpdate }
          : lsn
      )
    )
  }

  useEffect(() => {
    if (lesson && lesson.flexLesson) {
      const formattedFlexLesson = formatFlexLesson({flexLesson: lesson.flexLesson})
      setFlexLesson(lesson.flexLesson)
      setFormattedFlexLesson(formattedFlexLesson)
    } else {
      setFlexLesson('')
      setFormattedFlexLesson([])
    }
  }, [lesson, setFlexLesson])

  // lessons.forEach(lesson => {
  //   cXnsole.log(`lesson No ${lesson.number}`, lesson)
  // })
  
  // cXnsole.log('Working Lesson: ', lesson?.number ?? 'undefined number')

  const tiptapEditorTitle = 'Transform your Spanish text into high-quality speech using a cloud-based Text-to-Speech (TTS) service, or into standard quality speech using the built-in voice on your device.'

  let content
  if (selectedLessonNumber != null && Array.isArray(lessons)) {
    if (!lesson) {
      content = <p>Lesson not found.</p>
    } else {
      content = (
        <>
          <button ref={firstFocusButtonRef} className="bg-yellow pv1 ph2">PLACEHOLDER</button>

          <h2 className="flex flex-column f2 f3-m pa3 pb0X mt4X w-100 on-background items-center tc">
            <div>{LANGUAGE_TITLE[targetLanguage]}: Basic</div>
          <div className="w-100 background f2 f3-m on-background">Lesson {selectedLessonNumber}</div>
          </h2>

          <InputLessonName
            lessonName={lesson.lessonName ?? ''}
            onChange={(lessonName) => updateLessonField({ lessonName, isComplete: false })}
          />

          {!ariaDisabled &&
            <TiptapEditor
              key={lesson.number} // reinitialize when lesson changes
              initialValue={lesson.flexLesson ?? ''}
              title={tiptapEditorTitle}
              onChange={(flexLesson) => {
                const formattedFlexLesson = formatFlexLesson({flexLesson})
                updateLessonField({ flexLesson, formattedFlexLesson, isComplete: false })
                setFormattedFlexLesson(formattedFlexLesson)
              }}
            />
          }

          <div className={'mt3 mb4 flex justify-center'}>
            <div>
              <button
                tabIndex={tabIndex}
                aria-disabled={ariaDisabled}
                className={'f3 pa3 br4 bn bg-brand on-background pointer'}
                onClick={() => {
                  createFlexLesson({lesson})
                }}
              >
                Create Lesson
              </button>
            </div>
          </div>

          {/* <div className="background f2">{lesson.isComplete ? 'Study now' : 'Wait on study'}</div> */}

          <ul className="pl3">
            {formattedFlexLesson.map((line, i) => (
              <li key={i} className="mb2">
                {line}
              </li>
            ))}
          </ul>

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
    <div className={'panel-right panel-basic bw1 b--moon-gray bl panel-basic z-1 absolute top-0 left-0 w-100 h-100 bg-transparent flex flex-rowX transition-transform translate-x-0'}>
      <div tabIndex={-1} aria-disabled={false} className={`b--greenX bw1X w-100 vh-100 pb6 overflow-y-auto pa3 ${cutoff ? 'bg-yellow' : ''}`} style={{ paddingTop: '7em' }}>
      {content}
      </div>
    </div>
  )
}

export default PanelBasicCreateComponents
