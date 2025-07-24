// src/hooks/useNavbarTop.ts
import type { IsNavbarTopOpen } from '@cknTypes/types'
import { useAppContext } from '@context/AppContext/AppContext'
import { useRef, useState } from 'react'

export const useNavbarTop = () => {
  const [isNavbarTopOpen, setIsNavbarTopOpen] = useState<IsNavbarTopOpen>(false)
  const navbarTopPanelFirstFocusRef = useRef<HTMLButtonElement | null>(null)

  const {
    isTransitioning,
    setIsTransitioning
  } = useAppContext()

  const openNavbarTop = () => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setIsNavbarTopOpen(true)

    setTimeout(() => {
      setIsTransitioning(false)
    }, 300)
  }

  const closeNavbarTop = () => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setIsNavbarTopOpen(false)

    setTimeout(() => {
      setIsTransitioning(false)
    }, 300)
  }

  return { navbarTopPanelFirstFocusRef, isNavbarTopOpen, openNavbarTop, closeNavbarTop }
}
