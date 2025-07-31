import { useAppContext } from '@context/AppContext/AppContext'
import { defaultLesson, type Lesson } from '@cknTypes/types'
// import CutoffToggle from '@components/CutoffToggle'
// import ShowMaxCount from '@components/ShowMaxCount'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { ACTIVE_PANEL, TABINDEX_NEVER } from '@cknTypes/constants'
import { usePanel } from '@hooks/usePanel'
import { usePanelBase } from '@hooks/usePanelBase'
import { usePanelManager } from '@context/PanelManagerContext/PanelManagerContext'

export const LessonBar = () => {

  const {
    lessons,
    setLessons,
    selectedLessonNumber,
    setSelectedLessonNumber,
    // activePanel,
    // lessonComplete,
    setLessonComplete,
    setLesson,
    paywall
  } = useAppContext()
  
  const { focusPanel, openPanel } = usePanelManager()
  
  const { firstFocusButtonRef, translateX, tabIndex, ariaDisabled, ariaHidden, isOpen, isMounted } = usePanelBase({
    panelName: ACTIVE_PANEL.LESSON_BAR,
    translateXOpen: 'translateX-0',
    translateXClose: 'translateX--100',
    callback: {
      onOpen: () => {
        // setSelectedLessonNumber(1)
        // openPanel(ACTIVE_PANEL.BASIC_WELCOME)
      }
      // onFocus: () => {
      //   openPanel(ACTIVE_PANEL.BASIC_WELCOME)
      // },
      // onClose: () => {
      //   closePanel(ACTIVE_PANEL.BASIC_WELCOME)
      // }
    }
  })
  
  // const translateX = activateLessonBar ? 'translateX-0' : 'translateX--100'
  // const translateX = currentPanel === ACTIVE_PANEL.BASIC_CREATE ? 'translateX-0' : 'translateX--100'

  const { switchPanel } = usePanel()

  const handleAddLesson = () => {
    setLessonComplete(false)

    console.log('switching panel', ACTIVE_PANEL.BASIC_CREATE)
    switchPanel(ACTIVE_PANEL.BASIC_CREATE)

    // Not sure the logic below versus a straight
    // patch through to ACTIVE_PANEL.BASIC_CREATE
    //
    // if (activePanel === ACTIVE_PANEL.BASIC_STUDY) {
    //   switchPanel(activePanel)
    // }

    const newNumber = lessons.length + 1
    const newLesson: Lesson = {
      ...defaultLesson,
      
      isComplete: false,
      number: newNumber,
      name: `Lesson ${newNumber}`,
      description: `This is the content for Lesson ${newNumber}`
    }

    setLessons([...lessons, newLesson])
    setLesson(newLesson)
    setSelectedLessonNumber(newNumber) // optionally auto-select new lesson
    setLessonComplete(false)
  }

  return (
    <div
      tabIndex={TABINDEX_NEVER}
      aria-disabled={true}
      className={`lesson-bar panel-left bg-tertiary w-10 br b--moon-gray bw1 o-50X z-4 w-05X w-10X vh-100 overflow-y-auto pa2 bg-washed-yellowX brX b--background-20X bnX transition-transform ${translateX} ${isOpen ? 'panel-visible' : 'panel-hidden'} ${!isMounted ? 'dn' : ''}`} style={{paddingTop: '10em'}}>
      <button
        ref={firstFocusButtonRef}
        tabIndex={tabIndex}
        aria-disabled={ariaDisabled}
        aria-hidden={ariaHidden}
        onClick={handleAddLesson}
        className="lesson-bar button-add focus-visible:bg-redX focus:b--redX b--double mv3X pa2 bnX bbX white b--backgroundX bw3X baX bg-transparent bg-light-blueX br2X bX f2 flex justify-center tc w-100"
      >
        <FontAwesomeIcon className="f1X" icon={faPlus} />
      </button>
      <hr className="bg-white bn" style={{height: '0.15em'}} />
      <ul className="ba list pa0">
        {Array.isArray(lessons) && lessons.length > 0 ? (
          lessons.map((lesson) => (
            <li
              role="button"
              tabIndex={tabIndex}
              aria-disabled={ariaDisabled}
              aria-hidden={ariaHidden}
              key={lesson.number}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault() // prevent scrolling on space
                  e.currentTarget.click() // trigger onClick
                }
              }}
              onFocus={() => {
                  setSelectedLessonNumber(lesson.number)
                  setLessonComplete(lesson.isComplete)
                  if (lesson.isComplete) {
                    openPanel(ACTIVE_PANEL.BASIC_STUDY)
                    // focusPanel(ACTIVE_PANEL.BASIC_STUDY_COMPONENTS)
                  } else {
                    openPanel(ACTIVE_PANEL.BASIC_CREATE)
                    // focusPanel(ACTIVE_PANEL.BASIC_CREATE_COMPONENTS)
                  }
                }}
              onClick={() => {
                // console.log('lesson', lesson)
                setSelectedLessonNumber(lesson.number)
                setLessonComplete(lesson.isComplete)
                if (lesson.isComplete) {
                  // switchPanel(ACTIVE_PANEL.BASIC_STUDY)
                  // focusPanel(ACTIVE_PANEL.BASIC_STUDY_COMPONENTS)
                  openPanel(ACTIVE_PANEL.BASIC_STUDY)
                  focusPanel(ACTIVE_PANEL.BASIC_STUDY)
                } else {
                  // switchPanel(ACTIVE_PANEL.BASIC_CREATE)
                  openPanel(ACTIVE_PANEL.BASIC_CREATE)
                  focusPanel(ACTIVE_PANEL.BASIC_CREATE_COMPONENTS)
                }
                // if (activePanel === ACTIVE_PANEL.BASIC_STUDY && !lesson.isComplete) {
                //   switchPanel(ACTIVE_PANEL.BASIC_CREATE)
                //   focusPanel(ACTIVE_PANEL.BASIC_CREATE_COMPONENTS)
                // } else if  (activePanel === ACTIVE_PANEL.BASIC_STUDY) {
                //   focusPanel(ACTIVE_PANEL.BASIC_STUDY_COMPONENTS)
                // } else {
                //   focusPanel(ACTIVE_PANEL.BASIC_CREATE_COMPONENTS)                  
                // }
              }}
              className={`lesson-bar button-lesson b--transparent b--double focus:b--redX focus:b--doubleX b mv1 pa2 pointer br2X f3 bw2 bbX tc b--blueX on-tertiaryX whiteX hover:tertiary ${
                selectedLessonNumber === lesson.number ? 'bg-light-green black b' : 'hover-bg-light-gray on-tertiary  '
              }`}
            >
              <div className="flex flex-column">
                <div className="bb b--moon-gray">{lesson.number}</div>
                <div className="f8">{lesson.lessonName}</div>
              </div>
            </li>
          ))
        ) : (
          <li className="pa2 gray">No saved lessons yet.</li>
        )}
      </ul>
      <hr className="bg-background bn" style={{height: '0.15em'}} />
      <div className="f6 flex justify-around tc mb3">
        <div className="green pv1 ph2 bg-background br3 b--background b">Green</div>
        <div className="pa1 items-center flex justify-center">{paywall.paywall_package_green_remaining}</div>
      </div>
      <div className="f6 flex justify-around tc">
        <div className="yellow pv1 ph2 bg-background br3 b--background b">Yellow</div>
        <div className="pa1 items-center flex justify-center">{paywall.paywall_package_yellow_remaining}</div>
      </div>
    </div>
  )
}

export default LessonBar
