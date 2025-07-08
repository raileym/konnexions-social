import React, { useEffect } from 'react'
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
import PanelMDX from '@components/PanelMDX/PanelMDX'
import PanelRequestEmail from '@components/PanelRequestEmail/PanelRequestEmail'

const AppMain = () => {
  return (
    <>
      <div className="app flex max-w6X min-w5 relative w-100 center min-vh-100 overflow-hidden bg-blue">
        <LessonBar />
        <PanelMDX />
        <PanelRequestEmail />
        <PanelGenAIPro />
        <PanelBasic />
        <PanelGenAI />
        <PanelBasicReview />
        <PanelKeys />
        <PanelMenu />
        <PanelHelp />
      </div>
      <NavbarTop />
      <NavbarBottom />
    </>
  )
}

const App: React.FC = () => {
  const {
    setOpenAiUsage,
    setTtsCharUsage,
    setCookedEmail,
    setIsUserValidated,
    setUserData, // optional
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
      console.log('App: No cookedEmail')
      return
    }

    console.log('App: cookedEmail raw value:', JSON.stringify(cookedEmail))

    console.log('XXcookedEmail', cookedEmail)
    const verifyCooked = async () => {
      try {
        const res = await fetch('/.netlify/functions/verify-cooked-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cookedEmail: cookedEmail }),
        })

        const { valid } = await res.json()
        console.log('before check')
        if (valid) {
          console.log('YES check')
          setCookedEmail(cookedEmail)
          setIsUserValidated(true)

          // const dataRes = await fetch('/.netlify/functions/get-email-user-data', {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify({ cookedEmail: cookedEmail }),
          // })

          // const userData = await dataRes.json()
          // setUserData(userData)
        } else {
          console.log('NO check')
          // localStorage.removeItem('cookedEmail')
          // setCookedEmail('')
          // setIsUserValidated(false)
        }
      } catch (err) {
        console.error('Failed to verify cookedEmail:', err)
      }
    }

    verifyCooked()
  }, [setCookedEmail, setIsUserValidated, setUserData])

  return (
    <Router>
      <Routes>
        <Route path="/*" element={<AppMain />} />
      </Routes>
    </Router>
  )
}

export default App
