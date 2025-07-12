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
import { getPaywall } from '@components/getPaywall/getPaywall'

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
              element={<Component />}
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

  const {
    setOpenAiUsage,
    setTtsCharUsage,
    setCookedEmail,
    setIsUserValidated,
    setUserData,
    clientUUID,
    setClientUUID,
    isUserValidated,
    setPaywall
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

          // const dataRes = await fetch('/.netlify/functions/get-user-data', {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify({ cookedEmail: cookedEmail }),
          // })

          // const userData = await dataRes.json()
          // setUserData(userData)
        } else {
          // cXonsole.log('NO check')
          // localStorage.removeItem('cookedEmail')
          // setCookedEmail('')
          // setIsUserValidated(false)
        }
      } catch (err) {
        console.error('Failed to verify cookedEmail:', err)
      }
    }

    verifyCooked()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setCookedEmail, setIsUserValidated, setUserData])

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

      const paywallRes = await getPaywall({ clientUUID })
      if (paywallRes.success && paywallRes.data) {
        setPaywall(paywallRes.data)
      } else {
        console.error('❌ Failed to fetch paywall:', paywallRes.error)
      }
    }

    fetchUserDataAndPaywall()
  }, [isUserValidated, clientUUID, setUserData, setPaywall])


  return (
    <Router>
      <Routes>
        <Route path="/*" element={<AppMain />} />
      </Routes>
    </Router>
  )
}

export default App
