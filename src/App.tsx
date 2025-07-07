// src/App.tsx
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// import PanelVerifyEmail from '@components/PanelVerifyEmail/PanelVerifyEmail'

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
// import { useLocation } from 'react-router-dom';

const AppMain = () => {
  // const location = useLocation();

  // const isVerifyRoute = location.pathname === '/verify';

  return (
    <>
      <div className="app flex max-w6X min-w5 relative w-100 center min-vh-100 overflow-hidden bg-blue">
        {/* your main panels */}
        <LessonBar />
        <PanelMDX />
        <PanelRequestEmail />
        {/* <PanelVerifyEmail isRouteMode={isVerifyRoute} /> */}
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
  );
};

const App: React.FC = () => {
  const {
    setOpenAiUsage,
    setTtsCharUsage,
  } = useAppContext()

  const loadUsage = () => {
    const week = getCurrentWeek()
    const openAiStored = localStorage.getItem(`openAiUsageW${week}`)
    setOpenAiUsage(openAiStored ? parseInt(openAiStored, 10) : 0)

    const ttsStored = localStorage.getItem(`ttsCharUsageW${week}`)
    setTtsCharUsage(ttsStored ? parseInt(ttsStored, 10) : 0)
  }

  useEffect(() => {
    const handleVoiceLoad = () => {
      void window.speechSynthesis.getVoices()
    }

    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = handleVoiceLoad
      handleVoiceLoad()
    }

    loadUsage()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setOpenAiUsage, setTtsCharUsage])

const alwaysTrue = true
if (alwaysTrue) {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<AppMain />} />
      </Routes>
    </Router>    
  )
}

return (
    <Router>
      <Routes>
        {/* /verify route: renders PanelVerifyEmail always visible */}
        <Route path="/verify" element={<PanelVerifyEmail isRouteMode={true} />} />

        {/* Main app UI - NO PanelVerifyEmail here */}
        <Route
          path="/*"
          element={
            <>
              <div className="app flex max-w6X min-w5 relative w-100 center min-vh-100 overflow-hidden bg-blue">
                <LessonBar />
                <PanelMDX />
                <PanelRequestEmail />
                {/* Remove PanelVerifyEmail from here */}
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
          }
        />
      </Routes>
    </Router>
  )
}

export default App
