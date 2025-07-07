import type { PanelVerifyEmailComponentsProps } from '@cknTypes/types'
import React, { useState, useEffect } from 'react'

const PanelVerifyEmailComponents = ({ token: propToken, cookedEmail }: PanelVerifyEmailComponentsProps) => {
  const [email, setEmail] = useState('')
  const [token, setToken] = useState(propToken || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [dots, setDots] = useState('.')

  useEffect(() => {
    // If token is present, try to verify automatically
    if (token) {
      verifyToken()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  useEffect(() => {
    if (!loading) {
      setDots('.')
      return
    }

    const dotArray = ['.', '..', '...']
    let i = 0

    const interval = setInterval(() => {
      i = (i + 1) % dotArray.length
      setDots(dotArray[i])
    }, 500)

    return () => clearInterval(interval)
  }, [loading])



const verifyToken = async () => {
    if (!cookedEmail) {
      setError('Missing cooked email.')
      return
    }

    if (!token) {
      setError('Missing token.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/.netlify/functions/verifyToken', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cookedEmail, token }),
      })

      // TEMPORARY: Artificial delay to let Pending... animate
      await new Promise(resolve => setTimeout(resolve, 5000))      

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        const errorMessage = errorBody?.error || 'Verification failed';

        console.log('errorBody', errorBody);
        console.log('response', response);

        throw new Error(errorMessage);
      }

      // if (!response.ok) {
      //   console.log('TWO TWO TWO')
      //   const text = await response.text()
      //   console.log('text', text)
      //   console.log('response', response)
      //   throw new Error(text || 'Verification failed')
      // }

      setSuccess(true)
      // onVerified?.()
    } catch (err) {
      setError((err as Error).message || 'Unexpected error')
      setSuccess(false)
    } finally {
      setLoading(false)
    }
  }

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setError(null)
  //   if (!email) {
  //     setError('Please enter your email.')
  //     return
  //   }
  //   if (!token) {
  //     setError('No verification token found.')
  //     return
  //   }
  //   verifyToken()
  // }

      //   {success ? (
      //   <div className="flex flex-column items-center">
      //     <div className="f1 white">Complete</div>
      //   </div>
      // ) : (
      //   <div className="flex flex-column items-center h2X baX b--white">
      //     <div className="ba f1 white monospace w8 tc flex flex-row justify-centerX">
      //       <div className="tr inline-blockX w4X mr3">Pending</div>
      //       {loading && (<div className={'tl inline-blockX w2 ml2X'}>{dots}</div>)}
      //       {!loading && (<div className={'tl inline-blockX w5 ml2X'}>{error}</div>)}
      //       {/* <div className={`tl inline-blockX w5X ml2X ${loading ? 'w6' : 'w6'}`}>{loading ? ' ' + dots : ': ' + error}</div> */}
      //       {/* <div className="f1X white baZ b--white mt3X pa2X">{error ? error : ' '}</div> */}
      //     </div>
      //   </div>
      // )}

  return (
    <div className="w-100 vh-100 bg-purple flex items-center justify-center pa4">

      {success ? (
        <div className="flex flex-column items-center">
          <div className="f1 white">Complete</div>
        </div>
      ) : (
        <div className="flex flex-column items-center">
          <div className="f1 white monospace w6 tc flex flex-row justify-center">
            <span>Pending</span>
            {loading && (
              <span className="inline-block w2 ml1">{dots}</span>
            )}
          </div>
          {!loading && error && (
            <div className="f4 white ba b--white mt3 pa2">{error}</div>
          )}
        </div>
      )}

      {/*
      <form
        className="bg-white pa5 br3 shadow-5 mw6 w-100"
        onSubmit={handleSubmit}
      >
        <label className="db mb3 fw6 f5 black-70">
          Email:
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={loading || success}
            required
            className="input-reset ba b--black-20 pa3 mt2 w-100 br2"
          />
        </label>
        <label className="db mb4 fw6 f5 black-70">
          Verification Token:
          <input
            type="text"
            value={token}
            onChange={e => setToken(e.target.value)}
            disabled={loading || success}
            required
            className="input-reset ba b--black-20 pa3 mt2 w-100 br2"
          />
        </label>
        <button
          type="submit"
          disabled={loading || success}
          className="b ph4 pv3 input-reset ba b--purple bg-purple white grow pointer f6 br2 dib w-100"
        >
          {loading ? 'Verifying...' : success ? 'Verified' : 'Verify'}
        </button>
        {error && <div className="mt3 red">{error}</div>}
        {success && <div className="mt3 green">Verification successful!</div>}
      </form>
      */}
    </div>
  )
}

export default PanelVerifyEmailComponents