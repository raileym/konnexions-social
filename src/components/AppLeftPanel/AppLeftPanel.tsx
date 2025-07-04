import { useAppContext } from '@context/AppContext/AppContext'
import { defaultLesson, type ActivePanel, type Lesson } from '@cknTypes/types'
// import CutoffToggle from '@components/CutoffToggle'
// import ShowMaxCount from '@components/ShowMaxCount'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { APP_PANEL } from '@cknTypes/constants'
import { usePanel } from '@hooks/usePanel'

export const AppLeftPanel: React.FC = () => {
  const {
    lessons,
    setLessons,
    selectedLessonNumber,
    setSelectedLessonNumber,
    activePanel
  } = useAppContext()
  
  const { switchPanel } = usePanel()

  const handleAddLesson = () => {
    if (activePanel === APP_PANEL.BASIC_REVIEW) {
      switchPanel(activePanel)
    }

    const newNumber = lessons.length + 1
    const newLesson: Lesson = {
      ...defaultLesson,
      
      number: newNumber,
      name: `Lesson ${newNumber}`,
      description: `This is the content for Lesson ${newNumber}`
    }

    setLessons([...lessons, newLesson])
    setSelectedLessonNumber(newNumber) // optionally auto-select new lesson
  }

  return (
    <div className="app-left-panel w-10 br b--moon-gray bw1 o-50X z-4 w-05X w-10X vh-100 overflow-y-auto pa3 bg-washed-yellow brX b--black-20X bnX" style={{paddingTop: '6em'}}>
      <button
        onClick={handleAddLesson}
        // onClick={() => {
        //   const newId = lessons.length + 1
        //   setLessons([...lessons, { id: newId, name: `Lesson ${newId}`, dialog: { lines: [] } }])
        // }}
        className="mv3X pa2 bn bbX b--blackX bw3 ba bg-transparent bg-light-blueX br2X bX f2 flex justify-center tc w-100"
      >
        <FontAwesomeIcon className="f1X" icon={faPlus} />
      </button>
      <hr className="bg-black bn" style={{height: '0.15em'}} />
      <ul className="list pa0">
        {Array.isArray(lessons) && lessons.length > 0 ? (
          lessons.map((lesson) => (
            <li
              key={lesson.number}
              onClick={() => setSelectedLessonNumber(lesson.number)}
              className={`b baX pa2 pointer br2X f3 bw2 bbX tc b--blue ${
                selectedLessonNumber === lesson.number ? 'bg-light-green b' : 'hover-bg-light-gray'
              }`}
            >
              {lesson.number}
            </li>
          ))
        ) : (
          <li className="pa2 gray">No saved lessons yet.</li>
        )}
      </ul>
    </div>
  )
}

export default AppLeftPanel
