import { useCallback, useEffect, useRef, useState } from 'react'
import { usePanelManager } from '@context/PanelManagerContext/PanelManagerContext'
import type { ActivePanel } from '@cknTypes/types'

export const usePanelBase = (
  panelName: ActivePanel,
  translateXOpen: string,
  {
    onOpen,
    onClose
  }: {
    onOpen?: () => void
    onClose?: () => void
  } = {}
) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [translateX, setTranslateX] = useState('translate-x-full')

  const { registerPanel, unregisterPanel } = usePanelManager()

  const open = useCallback(() => {
    setIsOpen(true)
    setTranslateX(translateXOpen)
    if (onOpen) onOpen()
  }, [translateXOpen, onOpen])

  const close = useCallback(() => {
    setIsOpen(false)
    setTranslateX('translate-x-full')
    if (onClose) onClose()
  }, [onClose])

  useEffect(() => {
    registerPanel(panelName, {
      open,
      close,
      isOpen
    })

    return () => {
      unregisterPanel(panelName)
    }
  }, [panelName, open, close, isOpen, registerPanel, unregisterPanel])

  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        close()
      }
    }

    document.addEventListener('click', handleClickOutside, { capture: true })

    return () => {
      document.removeEventListener('click', handleClickOutside, { capture: true })
    }
  }, [isOpen, close])

  return {
    ref,
    isOpen,
    translateX
  }
}
