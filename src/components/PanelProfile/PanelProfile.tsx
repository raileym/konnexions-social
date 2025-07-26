import {
  ACTIVE_PANEL,
  PROFILE_PANEL_TRANSLATE_X,
  PROFILE_PANEL_WIDTH_PERCENT,
} from '@cknTypes/constants'

import { USER_EMAIL_NOT_VALIDATED, USER_EMAIL_VALIDATED } from '@cknTypes/constants'
import { getUserData } from '@components/getUserData/getUserData'
import Paywall from '@components/Paywall/Paywall'
import { SelectMarketingPreferences } from '@components/SelectMarketingPreferences/SelectMarketingPreferences'
import { faSquareCheck } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { usePaywall } from '@hooks/usePaywall/usePaywall'
import { useAppContext } from '@context/AppContext/AppContext'
import { usePanelBase } from '@hooks/usePanelBase'

import { useEffect, useRef, useState } from 'react'

const PanelProfile = () => {
  const {
    setCookedEmail,
    setClientUUID,
    setIsUserValidated,
    isUserValidated,
    setUserData,
    setFlexLesson,
    setLesson,
    setLessons,
    setSelectedLessonNumber,
    setLessonPrompt,
    setLessonTimestamp,
    isProfileOpen
  } = useAppContext()

  const { refreshPaywall } = usePaywall()

  const firstFocusRef = useRef<HTMLInputElement | null>(null)
  const [profilePanelTabIndex, setProfilePanelTabIndex] = useState<number>(-1)
  const [validationMessage, setValidationMessage] = useState<string>(USER_EMAIL_NOT_VALIDATED)
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [step, setStep] = useState<'request' | 'verify'>('request')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [localCookedEmail, setLocalCookedEmail] = useState('')

  // const { ref, isOpen, translateX } = usePanelBase(ACTIVE_PANEL.PROFILE)
  const { ref, isOpen, translateX } = usePanelBase(
    ACTIVE_PANEL.PROFILE,
    PROFILE_PANEL_TRANSLATE_X,
    {
      onOpen: () => {
        setProfilePanelTabIndex(0)
        setTimeout(() => {
          console.log('Apply that focus for PanelProfile')
          firstFocusRef.current?.focus()
        }, 250)
      },
      onClose: () => {
        setProfilePanelTabIndex(-1)
      }
    }
  )

  useEffect(() => {
    setValidationMessage(isUserValidated ? USER_EMAIL_VALIDATED : USER_EMAIL_NOT_VALIDATED)
  }, [isUserValidated])

  useEffect(() => {
    if (isProfileOpen && firstFocusRef.current) {
      const timeoutId = setTimeout(() => {
        firstFocusRef.current?.focus()
        setProfilePanelTabIndex(0)
      }, 250)

      return () => clearTimeout(timeoutId)
    } else {
      setProfilePanelTabIndex(-1)
    }
  }, [isProfileOpen])

  const sendEmail = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/.netlify/functions/sendVerificationEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) throw new Error('Failed to send email')

      const data = await response.json()
      const cookedEmail = data.cookedEmail || ''
      setLocalCookedEmail(cookedEmail)
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

      if (!response.ok) {
        const errData = await response.json().catch(() => null)
        throw new Error(errData?.error || 'Verification failed')
      }

      await response.json()
      setSuccess(true)
      setCookedEmail(localCookedEmail)
      setClientUUID(localCookedEmail)
      setIsUserValidated(true)

      const { success, data, error } = await getUserData(localCookedEmail)
      if (!success || !data) return console.error('❌ Failed to get user data:', error)

      setUserData(data)
      setFlexLesson(data.user_data_flex_lesson)
      setLesson(data.user_data_current_lesson)
      setLessons(data.user_data_lessons)
      setSelectedLessonNumber(data.user_data_lesson_number)
      setLessonPrompt(data.user_data_lesson_prompt)
      setLessonTimestamp(data.user_data_lesson_timestamp)

      await refreshPaywall()
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
      if (!email) return setError('Please enter your email')
      await sendEmail()
    } else if (step === 'verify') {
      if (!code || code.length !== 6) return setError('Enter your 6-digit code')
      await verifyCode()
    }
  }

  const clearLocalStorageExceptEssential = () => {
    const preserveKeys = ['debugMode']
    Object.keys(localStorage).forEach(key => {
      if (!preserveKeys.includes(key)) {
        localStorage.removeItem(key)
      }
    })
    alert('Local storage (except debugMode) cleared.')
  }

  return (
    <div
      ref={ref}
      className={`panel-right-short panel-profile absolute bl b--background bw1 z-3 top-0 left-10 w-90 h-100 pt5 transition-transform ${translateX}`}
    >
      <div tabIndex={-1} aria-disabled={!isOpen} className="h-100 w-100 overflow-y-auto">
        <div className={`pa4 ${PROFILE_PANEL_WIDTH_PERCENT} mb5`}>
          <h2 className="f3 pa3 mt5 tc on-tertiary">Profile Panel</h2>
          <p className="background pl3X">When you access paid and free-tier services on this site, including the CKՈ Platform Technologies for</p>
          <p className="tc b background f4">Let's konnect! - through Spanish!</p>
          <p className="background">we require and use a validated version of your email address to store lesson materials remotely. We do not store your email in the cloud. </p>

          {/*
          <div className="flex flex-column items-center">
            <button ref={firstFocusRef} tabIndex={profilePanelTabIndex} className="bg-yellow w4 h2 focus:bg-red">Test only</button>
            <button tabIndex={profilePanelTabIndex} className="bg-yellow w4 h2 b--transparent b--solid"><div className="bg-red br5 b--red bw1">Test only</div></button>
            <button tabIndex={profilePanelTabIndex} className="bg-yellow w4 h2">Test only</button>
          </div>
          */}

          <div className="background f3 b mt3 mb4">
            {validationMessage}
            {validationMessage === USER_EMAIL_VALIDATED && (
              <FontAwesomeIcon className="ml2" icon={faSquareCheck} />
            )}
          </div>

          <form onSubmit={handleSubmit} className={`${isUserValidated ? 'bg-dimgrey' : 'bg-background'} pa3 br3 shadow-5 mw6 w-100`} aria-label="Email + code form">
            {step === 'request' && (
              <>
                <label htmlFor="email" className="db mb3 fw6 f5 background">Email:</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  disabled={loading || isUserValidated}
                  required
                  placeholder="your.email@example.com"
                  className="input-reset ba b--background-20 pa3 mb4 db w-100 br2"
                />
              </>
            )}
            {step === 'verify' && (
              <>
                <label htmlFor="code" className="db mb3 fw6 f5 on-background">
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
                  placeholder="123456"
                  className="input-reset ba b--background-20 pa3 mb4 db w-100 br2 tc f3 tracked"
                />
              </>
            )}
            <button
              type="submit"
              disabled={loading || success || isUserValidated}
              className="b ph4 pv3 input-reset ba b--purple bg-purple background pointer f6 br2 dib w-100"
            >
              {loading
                ? step === 'request' ? 'Sending...' : 'Verifying...'
                : success ? 'Success!' : step === 'request' ? 'Send Verification Email' : 'Verify Code'}
            </button>
            {error && <div className="mt3 red f6">{error}</div>}
            {!error && <div className="mt3 on-background f5 tc"><br /></div>}
          </form>

          <SelectMarketingPreferences ref={firstFocusRef} />
          <Paywall />

          <button
            type="button"
            onClick={clearLocalStorageExceptEssential}
            className="mt4 b ph4 pv3 input-reset ba b--red bg-on-background red grow pointer f6 br3 dib"
          >
            Clear Local Storage<br/>(except debugMode)
          </button>
        </div>
      </div>
    </div>
  )
}

export default PanelProfile
