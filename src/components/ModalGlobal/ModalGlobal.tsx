// ModalGlobal.tsx
import React from 'react'
import { useAppContext } from '@context/AppContext/AppContext'

const ModalGlobal: React.FC = () => {
  const { isModalVisible, modalConfig, hideModal } = useAppContext()

  if (!isModalVisible || !modalConfig) return null

  const { title, message, confirmText = 'OK', onConfirm } = modalConfig

  const handleClose = () => {
    if (onConfirm) onConfirm()
    hideModal()
  }

  return (
    <div className="fixed top-0 left-0 w-100 h-100 bg-background-50 flex items-center justify-center z-9999">
      <div className="bg-on-background pa4 br3 shadow-3 w-90 mw6 items-center flex flex-column justify-center">
        <h2 className="f3 mb3">{title}</h2>
        <p className="f5 mb4">{message}</p>
        <button onClick={handleClose} className="bg-brand on-background ph3 pv2 bn btn btn-primary">
          {confirmText}
        </button>
      </div>
    </div>
  )
}

export default ModalGlobal
