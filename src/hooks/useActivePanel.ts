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
    console.log(`closePanel: ${panel}`)
    if (isTransitioning || currentPanel !== panel) return

    console.log(`Yep! Let's close that panel: ${panel}`)

    setIsTransitioning(true)
    panelSetters[panel](false)
    setCurrentPanel(null)

    setTimeout(() => {
      tabIndexRefs[panel].current = -1
      setIsTransitioning(false)
    }, 300)
  }, [currentPanel, isTransitioning, panelSetters, setIsTransitioning, tabIndexRefs])

  useEffect(() => {
    if (currentPanel == null) return

    // Defer logic to ensure DOM node is painted
    const rafId = requestAnimationFrame(() => {
      const ref = refs[currentPanel]
      const node = ref?.current

      if (!node) {
        console.log(`[useEffect:raf] Skipping click outside handler: ref for ${currentPanel} is not ready`)
        return
      }

      const handleClickOutside = (event: MouseEvent) => {
        if (!ref.current) return

        const clickedOutside = !ref.current.contains(event.target as Node)
        if (clickedOutside) {
          console.log(`Click outside — closing ${currentPanel}Panel`)
          closePanel(currentPanel)
        } else {
          console.log('Click inside panel — ignoring')
        }
      }

      document.addEventListener('click', handleClickOutside, { capture: true })

      // Cleanup inside raf to match mount
      return () => {
        document.removeEventListener('click', handleClickOutside, { capture: true })
      }
    })

    // External cleanup for the raf itself
    return () => cancelAnimationFrame(rafId)
  }, [currentPanel, closePanel, refs])


  return {
    refs,
    tabIndexRefs,
    currentPanel,
    openPanel,
    closePanel,
    closeAllPanels
  }
}
