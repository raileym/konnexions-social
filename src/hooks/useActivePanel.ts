import { useRef, useCallback, useMemo, useState, useEffect } from 'react'
import { useAppContext } from '@context/AppContext/AppContext'

type PanelKey = 'help' | 'settings' | 'profile' | 'menu' | 'navbarTop'

export const useActivePanel = () => {
  const {
    setIsHelpOpen,
    setIsSettingsOpen,
    setIsProfileOpen,
    setIsMenuOpen,
    setIsNavbarTopOpen,
    isTransitioning,
    setIsTransitioning
  } = useAppContext()

  const [currentPanel, setCurrentPanel] = useState<PanelKey | null>(null)

  // ---- SAFE useRef calls
  const helpRef = useRef<HTMLDivElement | null>(null)
  const settingsRef = useRef<HTMLDivElement | null>(null)
  const profileRef = useRef<HTMLDivElement | null>(null)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const navbarTopRef = useRef<HTMLDivElement | null>(null)

  const helpTabRef = useRef(-1)
  const settingsTabRef = useRef(-1)
  const profileTabRef = useRef(-1)
  const menuTabRef = useRef(-1)
  const navbarTopTabRef = useRef(-1)

  // ---- Memoized accessors (stable object identities)
  const refs = useMemo(() => ({
    help: helpRef,
    settings: settingsRef,
    profile: profileRef,
    menu: menuRef,
    navbarTop: navbarTopRef
  }), [])

  const tabIndexRefs = useMemo(() => ({
    help: helpTabRef,
    settings: settingsTabRef,
    profile: profileTabRef,
    menu: menuTabRef,
    navbarTop: navbarTopTabRef
  }), [])

  const panelSetters = useMemo(() => ({
    help: setIsHelpOpen,
    settings: setIsSettingsOpen,
    profile: setIsProfileOpen,
    menu: setIsMenuOpen,
    navbarTop: setIsNavbarTopOpen
  }), [setIsHelpOpen, setIsSettingsOpen, setIsProfileOpen, setIsMenuOpen, setIsNavbarTopOpen])

  // ---- Logic
  const closeAllPanels = useCallback(() => {
    Object.values(panelSetters).forEach(fn => fn(false))
    Object.values(tabIndexRefs).forEach(ref => { ref.current = -1 })
    setCurrentPanel(null)
  }, [panelSetters, tabIndexRefs])

  const openPanel = useCallback((panel: PanelKey) => {
    if (isTransitioning || currentPanel === panel) return

    setIsTransitioning(true)

    // Step 1: close everything
    closeAllPanels()

    // Step 2: wait for panels to close, then open new one
    setTimeout(() => {
      panelSetters[panel](true)
      tabIndexRefs[panel].current = 0
      setCurrentPanel(panel)

      // Step 3: wait a bit longer before clearing transition
      setTimeout(() => {
        setIsTransitioning(false)
      }, 100)
    }, 50) // small delay before setting open
  }, [
    isTransitioning,
    currentPanel,
    closeAllPanels,
    panelSetters,
    tabIndexRefs,
    setIsTransitioning
  ])

  const closePanel = useCallback((panel: PanelKey) => {
    if (isTransitioning || currentPanel !== panel) return

    setIsTransitioning(true)
    panelSetters[panel](false)
    setCurrentPanel(null)

    setTimeout(() => {
      tabIndexRefs[panel].current = -1
      setIsTransitioning(false)
    }, 300)
  }, [currentPanel, isTransitioning, panelSetters, setIsTransitioning, tabIndexRefs])

  useEffect(() => {
    console.log('updating click outside handler')
    if (!currentPanel) return

    function handleClickOutside(event: MouseEvent) {
      console.log(`I detected an potential outside click for Panel${currentPanel}`)
      if (!currentPanel) {
        console.log('There is no current Panel')
        return
      }
      console.log('two')
      const ref = refs[currentPanel]
      if (!ref?.current) {
        console.log('Apparently ref.current is not set')
        return
      }
      console.log('three')
      if (ref?.current && ref.current.contains(event.target as Node)) {
        console.log('Apparently click is not outside the Panel')
        return
      }
      console.log('four')
      if (ref?.current && !ref.current.contains(event.target as Node)) {
        console.log(`Trying to close ${currentPanel}Panel`)
        closePanel(currentPanel)
        // requestAnimationFrame(() => closePanel(currentPanel))
      }
      console.log('five')
    }

    const timeoutId = setTimeout(() => {
      document.addEventListener('click', handleClickOutside, { capture: true })
    }, 150)

    return () => {
      clearTimeout(timeoutId)
      document.removeEventListener('click', handleClickOutside, { capture: true })
    }
  }, [currentPanel, refs, closePanel])

  return {
    refs,
    tabIndexRefs,
    currentPanel,
    openPanel,
    closePanel,
    closeAllPanels
  }
}
