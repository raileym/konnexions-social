import { useCallback, useEffect, useRef, useState } from 'react'
import { usePanelManager } from '@context/PanelManagerContext/PanelManagerContext'
import type { ActivePanel } from '@cknTypes/types'

type UsePanelBaseProps = {
  panelName: ActivePanel
  translateXOpen?: string
  translateXClose?: string
  translateYOpen?: string
  translateYClose?: string
  defaultOpen?: boolean
  callback?: {
    onOpen?: () => void
    onClose?: () => void
    onFocus?: () => void
  }
}

export const usePanelBase = ({
  panelName,
  defaultOpen = false,
  translateXOpen,
  translateXClose = 'translate-x-full',
  translateYOpen,
  translateYClose = 'translate-y-full',
  callback
}: UsePanelBaseProps) => {
  const ref = useRef<HTMLDivElement | null>(null)
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

  const { registerPanel, unregisterPanel, closePanel } = usePanelManager()

  const open = useCallback(() => {
    setIsMounted(true)
    requestAnimationFrame(() => {
      setIsOpen(true)
      setTabIndex(0)
      setAriaDisabled(false)
      setAriaHidden(false)
      if (translateXOpen) setTranslateX(translateXOpen)
      if (translateYOpen) setTranslateY(translateYOpen)
      callback?.onOpen?.()
    })
  }, [translateXOpen, translateYOpen, callback])

  const close = useCallback(() => {
    setIsOpen(false)
    setTabIndex(-1)
    setAriaDisabled(true)
    setAriaHidden(false)
    if (translateXClose) setTranslateX(translateXClose)
    // Yes, on translateYOpen. If there is a translateYOpen,
    // then there must be a translateYClose, defaulted or
    // otherwise.
    if (translateYOpen) setTranslateX(translateYClose)
    callback?.onClose?.()

    // Wait for animation to finish before fully unmounting
    setTimeout(() => setIsMounted(false), 300) // match transition duration
  }, [callback, translateXClose, translateYClose, translateYOpen])

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
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        console.log('outside the click area!')
        closePanel(panelName)
      }
    }

    document.addEventListener('click', handleClickOutside, { capture: true })

    return () => {
      document.removeEventListener('click', handleClickOutside, { capture: true })
    }
  }, [isOpen, close, closePanel, panelName])

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
