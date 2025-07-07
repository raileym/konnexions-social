import type { PanelVerifyEmailComponentsProps } from '@cknTypes/types'
import React, { useState } from 'react'
import { useAppContext } from '@context/AppContext/AppContext'
import { APP_PANEL } from '@cknTypes/constants'

const PanelVerifyEmailComponents = ({ cookedEmail }: PanelVerifyEmailComponentsProps) => {
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const {
    setCookedEmail,
    setActivePanel
  } = useAppContext()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!cookedEmail) {
      setError('Missing email hash')
      return
    }

    if (!code || code.length !== 6) {
      setError('Enter your 6-digit code')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/.netlify/functions/verifyCode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cookedEmail, code }),
      })

      if (!response.ok) {
        const errData = await response.json().catch(() => null)
        const message = errData?.error || 'Verification failed'
        throw new Error(message)
      }

      setSuccess(true)
      setCookedEmail(cookedEmail)

      // Delay panel switch for user feedback
      setTimeout(() => {
        setActivePanel(APP_PANEL.BASIC) // change this to whatever panel should follow
      }, 1500)

    } catch (err) {
      setError((err as Error).message)
      setSuccess(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-100 vh-100 bg-purple flex items-center justify-center pa4">
      <form
        onSubmit={handleSubmit}
        className="bg-white pa5 br3 shadow-5 mw6 w-100"
        aria-label="Code verification form"
      >
        <label htmlFor="code" className="db mb3 fw6 f5 black-70">
          Enter the 6-digit code sent to your email:
        </label>
        <input
          id="code"
          type="text"
          maxLength={6}
          value={code}
          onChange={e => setCode(e.target.value.replace(/\D/g, ''))}
          disabled={loading || success}
          required
          className="input-reset ba b--black-20 pa3 mb4 db w-100 br2 tc f3 tracked"
          placeholder="123456"
        />
        <button
          type="submit"
          disabled={loading || success}
          className="b ph4 pv3 input-reset ba b--purple bg-purple white grow pointer f6 br2 dib w-100"
        >
          {loading ? 'Verifying…' : success ? 'Verified' : 'Verify Code'}
        </button>
        {error && <div className="mt3 red f6">{error}</div>}
        {success && <div className="mt3 green f6">Code verified successfully!</div>}
      </form>
    </div>
  )
}

export default PanelVerifyEmailComponents
