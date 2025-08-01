import { useCallback, useEffect, useRef, useState } from 'react'
import { usePanelManager } from '@context/PanelManagerContext/PanelManagerContext'
import type { ActivePanel } from '@cknTypes/types'
import { ACTIVE_PANEL } from '@cknTypes/constants'

type UsePanelBaseProps = {
  panelName: ActivePanel
  translateXOpen?: string
  translateXClose?: string
  translateYOpen?: string
  translateYClose?: string
  defaultOpen?: boolean
  defaultClickOutside?: boolean
  callback?: {
    onOpen?: () => void
    onClose?: () => void
    onFocus?: () => void
  }
}

export const usePanelBase = ({
  panelName,
  defaultOpen = false,
  defaultClickOutside = true,
  translateXOpen,
  translateXClose = 'translate-x-full',
  translateYOpen,
  translateYClose = 'translate-y-full',
  callback
}: UsePanelBaseProps) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const isClosingRef = useRef(false)

  const firstFocusDivRef = useRef<HTMLDivElement | null>(null)
  const firstFocusButtonRef = useRef<HTMLButtonElement | null>(null)
  const firstFocusInputRef = useRef<HTMLInputElement | null>(null)
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [translateX, setTranslateX] = useState(translateXClose)
  const [translateY, setTranslateY] = useState(translateYClose)
  const [tabIndex, setTabIndex] = useState<number>(-1)
  const [ariaDisabled, setAriaDisabled] = useState<boolean>(true)
  const [ariaHidden, setAriaHidden] = useState<boolean>(false)
  const [isMounted, setIsMounted] = useState(defaultOpen)
  const [clickOutside, ] = useState<boolean>(defaultClickOutside)

  const { registerPanel, unregisterPanel, closePanel } = usePanelManager()

  const open = useCallback(() => {
    isClosingRef.current = false
    setIsMounted(true)
    if (panelName === ACTIVE_PANEL.BASIC_CREATE)
    console.log(`${panelName} ... First, set isMount`)

    requestAnimationFrame(() => {
      setIsOpen(true)
      setTabIndex(0)
      setAriaDisabled(false)
      setAriaHidden(false)

      if (translateXOpen) setTranslateX(translateXOpen)
      if (translateYOpen) setTranslateY(translateYOpen)
      callback?.onOpen?.()
    })
  }, [panelName, translateXOpen, translateYOpen, callback])

  const close = useCallback(() => {
    isClosingRef.current = true
    setIsOpen(false)
    setTabIndex(-1)
    setAriaDisabled(true)
    // setAriaHidden(false)
    setAriaHidden(true)

    // Set transform to start slide-out
    if (translateXClose) setTranslateX(translateXClose)
    if (translateYOpen) setTranslateY(translateYClose)

    callback?.onClose?.()

    // Wait for transform to finish before hiding panel
    setTimeout(() => {
      if (isClosingRef.current) {
        setIsMounted(false)
        console.log(`${panelName} ... unset isMount`)
      }
    }, 600)
  }, [callback, panelName, translateXClose, translateYClose, translateYOpen])


  const focus = useCallback(() => {
    setTimeout(() => {
      firstFocusDivRef.current?.focus()
      firstFocusInputRef.current?.focus()
      firstFocusButtonRef.current?.focus()
    }, 250)    
    if (callback?.onFocus) callback.onFocus()
  }, [callback])

  useEffect(() => {
    registerPanel(panelName, {
      open,
      close,
      focus,
      isOpen: () => isOpen
    })

    return () => {
      unregisterPanel(panelName)
    }
  }, [panelName, open, close, isOpen, registerPanel, unregisterPanel, focus])

  useEffect(() => {
    if (!clickOutside) return

    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        console.log(`${panelName}: outside the click area!`)
        console.log(`${panelName}: closing the panel.`)
        closePanel(panelName)
      }
    }

    document.addEventListener('click', handleClickOutside, { capture: true })

    return () => {
      document.removeEventListener('click', handleClickOutside, { capture: true })
    }
  }, [isOpen, close, closePanel, panelName, clickOutside])

  return {
    ref,
    firstFocusDivRef,
    firstFocusButtonRef,
    firstFocusInputRef,
    tabIndex,
    ariaDisabled,
    ariaHidden,
    isOpen,
    isMounted,
    translateX,
    translateY
  }
}
