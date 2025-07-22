import React, { useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import PanelSettings from '@components/PanelSettings/PanelSettings'
import PanelBasic from '@components/PanelBasic/PanelBasic'
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
import PanelBasicReview from '@components/PanelBasicReview/PanelBasicReview'
import PanelBasicWelcome from '@components/PanelBasicWelcome/PanelBasicWelcome'
import PanelMDX from '@components/PanelMDX/PanelMDX'
import PanelProfile from '@components/PanelProfile/PanelProfile'
import ModalGlobal from '@components/ModalGlobal/ModalGlobal'
import { getUserData } from '@components/getUserData/getUserData'
import { Navigate } from 'react-router-dom'
import { usePaywall } from '@hooks/usePaywall/usePaywall'
import PanelMDXWrapper from '@components/PanelMDXWrapper/PanelMDXWrapper'
import ViewportWidthOverlay from '@components/ViewportWidthOverlay/ViewportWidthOverlay'
import NavbarColor from '@components/NavbarColor/__tests__/NavbarColor'
import FontSizeControls from '@components/FontSizeControl/FontSizeControl'
import ColorScheme from '@components/ColorScheme/__tests__/ColorScheme'
import DayNightToggle from '@components/DayNightToggle/DayNightToggle'

const AppMain = () => {
  const { mdxPagesMap } = useAppContext()

  return (
    <>
{/* <div
  tabIndex={0}
  aria-hidden="false"
  className="absolute opacity-0 pointer-events-none"
  id="initial-focus-anchor"
/> */}

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
        <PanelBasic />
        <PanelGenAI />
        <PanelBasicWelcome />
        <PanelBasicReview />
        <PanelSettings />
        <PanelMenu />
        <PanelHelp />
        <PanelMDX />
      </div>
      <NavbarTop />
      <NavbarBottom />
      <ViewportWidthOverlay />
      <NavbarColor />
      <FontSizeControls />
      <ColorScheme />
      <DayNightToggle />
    </>
  )
}

const App: React.FC = () => {
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
      console.log('Focused element:', e.target)
    }
    window.addEventListener('focusin', handleFocus)
    return () => window.removeEventListener('focusin', handleFocus)
  }, [])

  const alwaysTrue = false
  if (alwaysTrue) {
    return (
      <>
      <div className="bg-yellow flex flex-column justify-center items-center min-vh-100 w-100">
        <header className="header">
          <h1 className="tc">Practice App</h1>
          <nav className="w-full flex justify-between">
            <button className="pa2 mh3 bw2 b--red bg-white red focus:bg-green focus:b--green focus:white">Home</button>
            <button className="pa2 mh3 bw2 b--red bg-white red focus:bg-green focus:b--green focus:white" onClick={() => console.log('Home clicked')}>Home</button>
            <button className="pa2 mh3 bw2 b--red bg-white red focus:bg-green focus:b--green focus:white" onClick={() => console.log('About clicked')}>About</button>
            <button className="pa2 mh3 bw2 b--red bg-white red focus:bg-green focus:b--green focus:white" onClick={() => console.log('Contact clicked')}>Contact</button>
          </nav>
        </header>

        <main id="main" className="main w-50">
          <h2 className="tc">Main Content</h2>
          <div className="w-full flex justify-center">
            <button className="pa2 mh3 bw2 b--red bg-white red focus:bg-green focus:b--green focus:white" onClick={() => console.log('First action')}>Action 1</button>
            <button className="pa2 mh3 bw2 b--red bg-white red focus:bg-green focus:b--green focus:white" onClick={() => console.log('Second action')}>Action 2</button>
            <button className="pa2 mh3 bw2 b--red bg-white red focus:bg-green focus:b--green focus:white" onClick={() => console.log('Third action')}>Action 3</button>
          </div>
        </main>

        <footer className="footer">
          <p>Footer content here.</p>
        </footer>
      </div>
      </>
    )
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
