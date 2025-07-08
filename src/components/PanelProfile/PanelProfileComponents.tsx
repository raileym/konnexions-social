import { useAppContext } from '@context/AppContext/AppContext'
import React, { useState } from 'react'
import { APP_PANEL, MENU_PANEL_WIDTH_PERCENT, PROFILE_PANEL_WIDTH_PERCENT } from '@cknTypes/constants'

const PanelRequestEmailComponents = () => {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [step, setStep] = useState<'request' | 'verify'>('request')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const { setCookedEmail, setActivePanel, setIsUserValidated, setUserData } = useAppContext()
  const [localCookedEmail, setLocalCookedEmail] = useState('')

  const sendEmail = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/.netlify/functions/sendVerificationEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        throw new Error('Failed to send email')
      }

      const data = await response.json()
      const cookedEmail = data.cookedEmail || ''
      setLocalCookedEmail(cookedEmail)
      // setCookedEmail(cookedEmail)
      setStep('verify')
    } catch (err) {
      setError((err as Error).message || 'Unexpected error')
      setLocalCookedEmail('')
      setStep('request')
    } finally {
      setLoading(false)
    }
  }

  const verifyCode = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/.netlify/functions/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cookedEmail: localCookedEmail, code }),
      })

      console.log('response', response)

      if (!response.ok) {
        const errData = await response.json().catch(() => null)
        const message = errData?.error || 'Verification failed'
        throw new Error(message)
      }

      const { verified } = await response.json()

      console.log('verified', verified)

      setSuccess(true)
      setCookedEmail(localCookedEmail)
      setIsUserValidated(true)

      // const dataRes = await fetch('/.netlify/functions/get-email-user-data', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ cookedEmail: localCookedEmail }),
      // })

      // if (!dataRes.ok) {
      //   const errData = await response.json().catch(() => null)
      //   const message = errData?.error || 'Verification failed'
      //   console.log('get-email-user-data ERROR:', message)
      //   throw new Error(message)
      // } else {
      //   const userData = await dataRes.json()
      //   setUserData(userData)
      // }

      // Optional: delay before redirect
      setTimeout(() => {
        setActivePanel(APP_PANEL.BASIC)
      }, 1500)

    } catch (err) {
      setIsUserValidated(false)
      setError((err as Error).message)
      setSuccess(false)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (step === 'request') {
      if (!email) {
        setError('Please enter your email')
        return
      }
      await sendEmail()
    } else if (step === 'verify') {
      if (!code || code.length !== 6) {
        setError('Enter your 6-digit code')
        return
      }
      await verifyCode()
    }
  }

  return (
    <div className={`ba b--red w-100X vh-100 bg-purple flex items-center justify-center ${PROFILE_PANEL_WIDTH_PERCENT} pa4`}>
      <form
        onSubmit={handleSubmit}
        className="bg-white pa5 br3 shadow-5 mw6 w-100"
        aria-label="Email + code form"
      >
        {step === 'request' && (
          <>
            <label htmlFor="email" className="db mb3 fw6 f5 black-70">
              Email:
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={loading}
              required
              className="input-reset ba b--black-20 pa3 mb4 db w-100 br2"
              placeholder="your.email@example.com"
            />
          </>
        )}

        {step === 'verify' && (
          <>
            <label htmlFor="code" className="db mb3 fw6 f5 black-70">
              Enter the 6-digit code sent to {email}:
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
          </>
        )}

        <button
          type="submit"
          disabled={loading || success}
          className="b ph4 pv3 input-reset ba b--purple bg-purple white grow pointer f6 br2 dib w-100"
        >
          {loading
            ? step === 'request'
              ? 'Sending...'
              : 'Verifying...'
            : success
              ? 'Success!'
              : step === 'request'
                ? 'Send Verification Email'
                : 'Verify Code'}
        </button>

        {error && <div className="mt3 red f6">{error}</div>}
        {success && <div className="mt3 green f6">Success! Redirecting...</div>}
      </form>
    </div>
  )
}

export default PanelRequestEmailComponents
