// src/hooks/useNavbarTop.ts
import { useAppContext } from '@context/AppContext/AppContext'
import { useRef, useCallback } from 'react'

export const useNavbarTop = () => {
  const navbarTopFirstFocusRef = useRef<HTMLDivElement | null>(null)
  const navbarTopRef = useRef<HTMLDivElement | null>(null)
  const navbarTopIndexRef = useRef<number>(-1)

  const { setIsNavbarTopOpen } = useAppContext()

  const {
    isTransitioning,
    setIsTransitioning
  } = useAppContext()

  const openNavbarTop = useCallback(() => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setIsNavbarTopOpen(true)

    setTimeout(() => {
      navbarTopIndexRef.current = 0
      setIsTransitioning(false)
    }, 300)
  }, [isTransitioning, setIsNavbarTopOpen, setIsTransitioning])

  const closeNavbarTop = useCallback(() => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setIsNavbarTopOpen(false)

    setTimeout(() => {
      navbarTopIndexRef.current = -1
      setIsTransitioning(false)
    }, 300)
  }, [isTransitioning, setIsNavbarTopOpen, setIsTransitioning])

  return {
    navbarTopRef,
    navbarTopFirstFocusRef,
    navbarTopIndex: navbarTopIndexRef.current,
    openNavbarTop,
    closeNavbarTop
  }
}
