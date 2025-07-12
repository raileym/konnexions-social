import { USER_EMAIL_NOT_VALIDATED, USER_EMAIL_VALIDATED } from '@cknTypes/constants'
import Paywall from '@components/Paywall/Paywall'
import { SelectMarketingPreferences } from '@components/SelectMarketingPreferences/SelectMarketingPreferences'
import { useAppContext } from '@context/AppContext/AppContext'
import { faSquareCheck } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'

const PanelRequestEmailComponents = () => {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [step, setStep] = useState<'request' | 'verify'>('request')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [validationMessage, setValidationMessage] = useState<string>(USER_EMAIL_NOT_VALIDATED)
  const [localCookedEmail, setLocalCookedEmail] = useState('')
  
  const { setCookedEmail, setClientUUID, setIsUserValidated, isUserValidated } = useAppContext()

  useEffect(() => {
    if (isUserValidated) {
      setValidationMessage(USER_EMAIL_VALIDATED)
    } else {
      setValidationMessage(USER_EMAIL_NOT_VALIDATED)
    }
  }, [isUserValidated])

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

      // cXonsole.log('response', response)

      if (!response.ok) {
        const errData = await response.json().catch(() => null)
        const message = errData?.error || 'Verification failed'
        throw new Error(message)
      }

      await response.json()
      // const { verified } = await response.json()

      // cXonsole.log('verified', verified)

      setSuccess(true)
      setCookedEmail(localCookedEmail)
      setClientUUID(localCookedEmail)
      setIsUserValidated(true)
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

  // const clearLocalStorageExceptEssential = () => {
  //   const preserveKeys = ['debugMode']
  //   Object.keys(localStorage).forEach(key => {
  //     if (!preserveKeys.includes(key)) {
  //       localStorage.removeItem(key)
  //     }
  //   })
  //   alert('Local storage (except cookedEmail and debugMode) cleared.')
  // }

  return (
    <>
      <div className={'bl b--black w-100 vh-100 bg-yellow flex flex-column items-center justify-start pa3 mt0X'}>
        <div className="black pl3">
            <h2 className="f3 pa3 mt5">Profile Panel</h2>
            <p className="pl3X">When you access paid and free-tier services on this site, including the CKՈ Platform Technologies for</p>
            <p className="tc b black f4">Let's connect - through Spanish!</p>
            <p>we require and use a validated version of your email address to store lesson materials remotely. We do not store your email in the cloud. </p>
        </div>
        <div 
          className="black f3 b mt3 mb4">
            {validationMessage}
            {validationMessage == USER_EMAIL_VALIDATED ? <FontAwesomeIcon className="ml2" icon={faSquareCheck} /> : null}</div>
        <form
          onSubmit={handleSubmit}
          className={`${isUserValidated? 'bg-dimgrey' : 'bg-black'} pa3 br3 shadow-5 mw6 w-100`}
          aria-label="Email + code form"
        >
          {step === 'request' && (
            <>
              <label htmlFor="email" className="db mb3 fw6 f5 white">
                Email:
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={loading || isUserValidated}
                required
                className="input-reset ba b--black-20 pa3 mb4 db w-100 br2 disabledX:yellow disabled:bg-grey placeholder-disabled:white"
                placeholder="your.email@example.com"
              />
            </>
          )}

          {step === 'verify' && (
            <>
              <label htmlFor="code" className="db mb3 fw6 f5 white">
                {isUserValidated ? 'Thank you!' : `Enter the 6-digit code sent to ${email}.`}
              </label>
              <input
                id="code"
                type="text"
                maxLength={6}
                value={code}
                onChange={e => setCode(e.target.value.replace(/\D/g, ''))}
                disabled={loading || success || isUserValidated}
                required
                className="input-reset ba b--black-20 pa3 mb4 db w-100 br2 tc f3 tracked"
                placeholder="123456"
              />
            </>
          )}

          <button
            type="submit"
            disabled={loading || success || isUserValidated}
            className={`b ph4 pv3 input-reset ba b--purple bg-purple white ${isUserValidated ? '' : 'grow'} pointer f6 br2 dib w-100 disabled:bg-grey disabled:white disabled:b--grey`}
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
          {/* {success && <div className="mt3 white f5 tc">Success!</div>} */}
          {!error && <div className="baX mt3 white f5 tc"><br /></div>}
        </form>

        <SelectMarketingPreferences />

        <Paywall />

        {/*
        <button
          type="button"
          onClick={clearLocalStorageExceptEssential}
          className="mt4 b ph4 pv3 input-reset ba b--red bg-white red grow pointer f6 br3 dib"
        >
          Clear Local Storage<br/>(except debugMode + cookedEmail)
        </button>
        */}

      </div>
      <div className="h5"></div>
    </>
  )
}

export default PanelRequestEmailComponents
