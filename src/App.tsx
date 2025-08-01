import { useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import PanelSettings from '@components/PanelSettings/PanelSettings'
import PanelHelp from '@components/PanelHelp/PanelHelp'
import NavbarTop from '@components/NavbarTop/NavbarTop'
import './App.scss'
import PanelGenAI from '@components/PanelGenAI/PanelGenAI'
import NavbarBottom from '@components/NavbarBottom/NavbarBottom'
import PanelMenu from '@components/PanelMenu/PanelMenu'
import { useAppContext } from '@context/AppContext/AppContext'
import { getCurrentWeek } from '@components/getCurrentWeek'
import PanelGenAIPro from '@components/PanelGenAIPro/PanelGenAIPro'
import LessonBar from '@components/LessonBar/LessonBar'
import PanelBasicStudy from '@components/PanelBasicStudy/PanelBasicStudy'
import PanelBasicWelcome from '@components/PanelBasicWelcome/PanelBasicWelcome'
import PanelMDX from '@components/PanelMDX/PanelMDX'
import PanelProfile from '@components/PanelProfile/PanelProfile'
import ModalGlobal from '@components/ModalGlobal/ModalGlobal'
import { getUserData } from '@components/getUserData/getUserData'
import { Navigate } from 'react-router-dom'
import { usePaywall } from '@hooks/usePaywall/usePaywall'
import PanelMDXWrapper from '@components/PanelMDXWrapper/PanelMDXWrapper'
// import ViewportWidthOverlay from '@components/ViewportWidthOverlay/ViewportWidthOverlay'
// import NavbarColor from '@components/NavbarColor/__tests__/NavbarColor'
import PanelBasicCreate from '@components/PanelBasicCreate/PanelBasicCreate'
import { ARIA_LABEL_IDS } from '@components/AriaLabels/ariaLabelsContstants'
import { TABINDEX_ALWAYS } from '@cknTypes/constants'
// import FontSizeControls from '@components/FontSizeControl/FontSizeControl'
// import ColorScheme from '@components/ColorScheme/__tests__/ColorScheme'
// import DayNightToggle from '@components/DayNightToggle/DayNightToggle'

const AppMain = () => {
  const voStartRef = useRef<HTMLDivElement>(null)

  const { mdxPagesMap } = useAppContext()

  useEffect(() => {
    voStartRef.current?.focus()
  }, [])

  return (
    <>
{/* <div
  tabIndex={0}
  aria-disabled="false"
  className="absolute opacity-0 pointer-events-none"
  id="initial-focus-anchor"
/> */}

<div
  tabIndex={TABINDEX_ALWAYS}
  ref={voStartRef}
  aria-labelledby={ARIA_LABEL_IDS.REGION_MAIN}
  role="region"
  className="sr-only"
>
  {ARIA_LABEL_IDS.REGION_MAIN_TEXT}
</div>


{/* <div className="sr-only white" role="region" aria-label="App loaded and ready">
  Application ready
</div> */}



      <ModalGlobal />
      <div className="app bg-blue flex max-w6X min-w5 relative w-100 center min-vh-100 overflow-hidden">
        <LessonBar />

        {/* 🧭 ROUTED MDX PANELS */}
        <Routes>
          {/* Default route: redirect / to /welcome */}
          <Route path="/" element={<Navigate to="/welcome" replace />} />

          {/* Dynamic routes from mdxPagesMap */}
          {Object.entries(mdxPagesMap).map(([key, Component]) => (
            <Route
              key={key}
              path={`/${key.toLowerCase()}`}
              element={<PanelMDXWrapper><Component /></PanelMDXWrapper>}
            />
          ))}
        </Routes>


        {/* The rest of your panels remain */}
        <PanelProfile />
        <PanelGenAIPro />
        <PanelGenAI />
        <PanelBasicWelcome />
        <PanelBasicCreate />
        <PanelBasicStudy />
        <PanelSettings />
        <PanelMenu />
        <PanelHelp />
        <PanelMDX />
      </div>
      <NavbarTop />
      <NavbarBottom />
      {/* <ViewportWidthOverlay /> */}
      {/* <NavbarColor /> */}
      {/* <FontSizeControls /> */}
      {/* <ColorScheme /> */}
      {/* <DayNightToggle /> */}
    </>
  )
}

const App = () => {
  const hasLoadedUserData = useRef(false)
  const { refreshPaywall } = usePaywall()

  const {
    setOpenAiUsage,
    setTtsCharUsage,
    setCookedEmail,
    setIsUserValidated,
    setUserData,
    clientUUID,
    setClientUUID,
    isUserValidated,
    setPaywall,
    setFlexLesson,
    setLesson,
    setLessons,
    setSelectedLessonNumber,
    setLessonPrompt,
    setLessonTimestamp
  } = useAppContext()

  useEffect(() => {
    const week = getCurrentWeek()
    const openAiStored = localStorage.getItem(`openAiUsageW${week}`)
    setOpenAiUsage(openAiStored ? parseInt(openAiStored, 10) : 0)

    const ttsStored = localStorage.getItem(`ttsCharUsageW${week}`)
    setTtsCharUsage(ttsStored ? parseInt(ttsStored, 10) : 0)
  }, [setOpenAiUsage, setTtsCharUsage])

  useEffect(() => {
    const cookedEmail = localStorage.getItem('cookedEmail')
    if (!cookedEmail || cookedEmail.trim() === '') {
      // cXonsole.log('App: No cookedEmail')
      return
    }
    
    // cXonsole.log('App: cookedEmail raw value:', JSON.stringify(cookedEmail))

    // cXonsole.log('XXcookedEmail', cookedEmail)
    const verifyCooked = async () => {
      try {
        const res = await fetch('/.netlify/functions/verify-cooked-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cookedEmail: cookedEmail }),
        })

        const { valid } = await res.json()
        // cXonsole.log('before check')
        if (valid) {
          // cXonsole.log('YES check')
          setCookedEmail(cookedEmail)
          setClientUUID(cookedEmail)
          setIsUserValidated(true)
        }
      } catch (err) {
        console.error('Failed to verify cookedEmail:', err)
      }
    }

    verifyCooked()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setCookedEmail, setIsUserValidated])

  useEffect(() => {
    if (!isUserValidated || !clientUUID) return

    if (hasLoadedUserData.current) return
    hasLoadedUserData.current = true

    const fetchUserDataAndPaywall = async () => {
      const { success, data, error } = await getUserData(clientUUID)
      if (!success || !data) {
        console.error('❌ Failed to get user data:', error)
        return
      }

      setUserData(data)

      setFlexLesson(data.user_data_flex_lesson)
      setLesson(data.user_data_current_lesson)
      setLessons(data.user_data_lessons)
      setSelectedLessonNumber(data.user_data_lesson_number)
      setLessonPrompt(data.user_data_lesson_prompt)
      setLessonTimestamp(data.user_data_lesson_timestamp)

      // console.log('userData', data)

      await refreshPaywall()
    }

    fetchUserDataAndPaywall()
  }, [isUserValidated, clientUUID, setUserData, setPaywall, refreshPaywall, setFlexLesson, setLesson, setLessons, setSelectedLessonNumber, setLessonPrompt, setLessonTimestamp])

  useEffect(() => {
    const handleFocus = (e: FocusEvent) => {
      const el = e.target as HTMLElement
      console.log('🔍 Focused element:', el)
      console.log('🧭 Outer HTML:', el.outerHTML)

      // if (el.parentElement) {
      //   console.log('⬆️ Parent element:', el.parentElement)
      //   console.log('⬆️ Parent outerHTML:', el.parentElement.outerHTML)
      // }

      // if (el.parentElement?.parentElement) {
      //   console.log('⬆️ Grandparent element:', el.parentElement.parentElement)
      //   console.log('⬆️ Grandparent outerHTML:', el.parentElement.parentElement.outerHTML)
      // }

      // console.groupEnd()
    }

    window.addEventListener('focusin', handleFocus)
    return () => window.removeEventListener('focusin', handleFocus)
  }, [])


  useEffect(() => {
    const el = document.activeElement
    console.log('🟢 Focused element on mount:', el)
    console.dir(el)
  }, [])

  const alwaysTrue = false
  if (alwaysTrue) {
    return (
      <div className="pa4">
        <div id="group-label" className="mb2 f5 fw6 sr-only">
          Action Group
        </div>
        <div id="group-desc" className="visually-hidden sr-only">
          This is a group of related actions.
        </div>

        <h1 id="title" className="mb3">VoiceOver ARIA Test</h1>

        {/* Basic labeled button */}
        <div className="mb4">
          <button
            id="btn-flat"
            tabIndex={0}
            aria-labelledby="label-flat"
            aria-describedby="desc-flat"
            className="pa2 bg-light-blue focus:bg-blue focus:white"
          >
            Flat Button
          </button>
          <div id="label-flat" className="visually-hidden">
            Flat Button Label
          </div>
          <div id="desc-flat" className="visually-hidden">
            This is a basic flat button.
          </div>
        </div>

        {/* Structured button with icon and ARIA labeling */}
        <div className="mb4">
          <button
            id="btn-structured"
            tabIndex={0}
            aria-labelledby="label-structured"
            aria-describedby="desc-structured"
            className="pa2 bg-light-yellow focus:bg-blue focus:white"
          >
            <span role="img" aria-label="Star">⭐</span>
            <span id="label-structured" className="ml2">
              Structured Button
            </span>
          </button>
          <div id="desc-structured" className="visually-hidden">
            This button has an icon and text.
          </div>
        </div>

        {/* Grouped buttons with explicit ARIA label */}
        <div
          role="group"
          aria-labelledby="group-label"
          aria-describedby="group-desc"
          className="mb4 pa3 bg-washed-red"
          tabIndex={0} // not focusable itself
        >
          <button tabIndex={0} className="mr2 pa2 focus:bg-blue focus:white">Option 1</button>
          <button tabIndex={0} className="mr2 pa2 focus:bg-blue focus:white">Option 2</button>
        </div>

        {/* No group: test isolated labeled button */}
        <div role="none" className="mb4">
          <button
            tabIndex={0}
            aria-labelledby="label-nogroup"
            className="pa2 bg-light-green focus:bg-blue focus:white"
          >
            Profile
          </button>
          <div id="label-nogroup" className="visually-hidden">
            Profile Button Without Group
          </div>
        </div>
      </div>
    )

    // return (
    //   <div className="pa4">
    //     <span id='button-option-1' className="sr-only">This describes Button Option 1</span>
    //     <span id='button-option-2' className="sr-only">This describes Button Option 2</span>
    //     <h1 id="title" className="mb3">VoiceOver ARIA Test</h1>

    //     {/* Basic labeled button */}
    //     <div className="mb4 focus:bg-red">
    //       <button
    //         id="btn-flat"
    //         tabIndex={0}
    //         aria-labelledby="label-flat"
    //         aria-describedby="desc-flat"
    //         className="pa2 bg-light-blue focus:bg-blue focus:white"
    //       >
    //         Flat Button
    //       </button>
    //       <div id="label-flat" className="visually-hidden">
    //         Flat Button Label
    //       </div>
    //       <div id="desc-flat" className="visually-hidden">
    //         This is a basic flat button.
    //       </div>
    //     </div>

    //     {/* Structured button with icon and ARIA labeling */}
    //     <div className="mb4">
    //       <button
    //         id="btn-structured"
    //         tabIndex={0}
    //         aria-labelledby="label-structured"
    //         aria-describedby="desc-structured"
    //         className="pa2 bg-light-yellow focus:bg-blue focus:white"
    //       >
    //         <span role="img" aria-label="Star">⭐</span>
    //         <span id="label-structured" className="sr-onlyX">
    //           Structured Button
    //         </span>
    //       </button>
    //       <div id="desc-structured" className="sr-onlyX">
    //         This button has an icon and text.
    //       </div>
    //     </div>

    //     {/* Grouped buttons with explicit ARIA label */}
    //     <div
    //       role="group"
    //       aria-labelledby="group-label"
    //       aria-describedby="group-desc"
    //       className="mb4 pa3 bg-washed-red"
    //       tabIndex={TABINDEX_NEVER} // not focusable itself
    //     >
    //       <div id="group-label" className="mb2 f5 fw6" tabIndex={0}>
    //         Action Group
    //       </div>
    //       <div id="group-desc" className="visually-hidden">
    //         This is a group of related actions.
    //       </div>
    //       <button tabIndex={0} aria-label={'Option 1'} aria-describedby={'button-option-1'} className="mr2 pa2 focus:bg-red">Option 1</button>
    //       <button tabIndex={0} aria-label={'Option 2'} aria-describedby={'button-option-2'} className="mr2 pa2 focus:bg-red">Option 2</button>
    //     </div>

    //     {/* No group: test isolated labeled button */}
    //     <div role="none" className="mb4">
    //       <button
    //         tabIndex={0}
    //         aria-labelledby="label-nogroup"
    //         className="pa2 bg-light-green focus:bg-green focus:white"
    //       >
    //         Profile
    //       </button>
    //       <div id="label-nogroup" className="visually-hidden">
    //         Profile Button Without Group
    //       </div>
    //     </div>
    //   </div>
    // )
  } else {
      return (
        <Router>
          <Routes>
            <Route path="/*" element={<AppMain />} />
          </Routes>
        </Router>
      )
  }
}

export default App
