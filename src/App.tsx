import React, { useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import PanelKeys from '@components/PanelKeys/PanelKeys'
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

const AppMain = () => {
  const { mdxPagesMap } = useAppContext()

  return (
    <>
      <ModalGlobal />
      <div className="app flex max-w6X min-w5 relative w-100 center min-vh-100 overflow-hidden bg-blue">
        <LessonBar />

        {/* 🧭 ROUTED MDX PANELS */}
        <Routes>
          {/* Default route: redirect / to /welcome */}
          <Route path="/" element={<Navigate to="/about" replace />} />

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
        <PanelKeys />
        <PanelMenu />
        <PanelHelp />
        <PanelMDX />
      </div>
      <NavbarTop />
      <NavbarBottom />
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

      console.log('userData', data)

      await refreshPaywall()
    }

    fetchUserDataAndPaywall()
  }, [isUserValidated, clientUUID, setUserData, setPaywall, refreshPaywall, setFlexLesson, setLesson, setLessons, setSelectedLessonNumber, setLessonPrompt, setLessonTimestamp])


  return (
    <Router>
      <Routes>
        <Route path="/*" element={<AppMain />} />
      </Routes>
    </Router>
  )
}

export default App
