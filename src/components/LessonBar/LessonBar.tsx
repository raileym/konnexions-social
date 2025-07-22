import { useAppContext } from '@context/AppContext/AppContext'
import { defaultLesson, type Lesson } from '@cknTypes/types'
// import CutoffToggle from '@components/CutoffToggle'
// import ShowMaxCount from '@components/ShowMaxCount'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { APP_PANEL, SCREEN } from '@cknTypes/constants'
import { usePanel } from '@hooks/usePanel'

export const LessonBar: React.FC = () => {
  const {
    lessons,
    setLessons,
    selectedLessonNumber,
    setSelectedLessonNumber,
    activePanel,
    // lessonComplete,
    setLessonComplete,
    setLesson,
    activateLessonBar,
    paywall,
    screenState
  } = useAppContext()
  
  const translateX = activateLessonBar ? 'translateX-0' : 'translateX--100'

  const { switchPanel } = usePanel()

  const handleAddLesson = () => {
    setLessonComplete(false)

    console.log('switching panel', APP_PANEL.BASIC)
    switchPanel(APP_PANEL.BASIC)

    // Not sure the logic below versus a straight
    // patch through to APP_PANEL.BASIC
    //
    // if (activePanel === APP_PANEL.BASIC_REVIEW) {
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
      tabIndex={-1}
      aria-hidden={true}
      className={`panel-left lesson-bar bg-tertiary w-10 br b--moon-gray bw1 o-50X z-4 w-05X w-10X vh-100 overflow-y-auto pa2 bg-washed-yellowX brX b--background-20X bnX transition-transform ${translateX}`} style={{paddingTop: '10em'}}>
      <button
        tabIndex={screenState[SCREEN.REVIEW] ? 0 : -1}
        aria-hidden={!screenState[SCREEN.REVIEW]}
        onClick={handleAddLesson}
        className="mv3X pa2 bn bbX b--backgroundX bw3 ba bg-transparent bg-light-blueX br2X bX f2 flex justify-center tc w-100"
      >
        <FontAwesomeIcon className="f1X" icon={faPlus} />
      </button>
      <hr className="bg-background bn" style={{height: '0.15em'}} />
      <ul className="ba list pa0">
        {Array.isArray(lessons) && lessons.length > 0 ? (
          lessons.map((lesson) => (
            <li
              key={lesson.number}
              onClick={() => {
                setSelectedLessonNumber(lesson.number)
                setLessonComplete(lesson.isComplete)
                if (activePanel === APP_PANEL.BASIC_REVIEW && !lesson.isComplete) {
                  switchPanel(APP_PANEL.BASIC)
                }
              }}
              className={`b pa2 pointer br2X f3 bw2 bbX tc b--blue ${
                selectedLessonNumber === lesson.number ? 'bg-light-green b' : 'hover-bg-light-gray'
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
