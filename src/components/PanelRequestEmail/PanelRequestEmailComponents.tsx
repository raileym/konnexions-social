import React, { useState } from 'react'

type PanelRequestEmailComponentsProps = {
  onEmailSent?: () => void // Optional callback when email is sent
}

const PanelRequestEmailComponents: React.FC<PanelRequestEmailComponentsProps> = ({ onEmailSent }) => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

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

      setSuccess(true)
      onEmailSent?.()
    } catch (err) {
      setError((err as Error).message || 'Unexpected error')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setError('Please enter your email')
      return
    }
    sendEmail()
  }

  return (
    <div className="w-100 vh-100 bg-purple flex items-center justify-center pa4">
      <form
        onSubmit={handleSubmit}
        className="bg-white pa5 br3 shadow-5 mw6 w-100"
        aria-label="Email verification form"
      >
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
        <button
          type="submit"
          disabled={loading}
          className="b ph4 pv3 input-reset ba b--purple bg-purple white grow pointer f6 br2 dib w-100"
        >
          {loading ? 'Sending...' : 'Send Verification Email'}
        </button>
        {error && <div className="mt3 red f6">{error}</div>}
        {success && <div className="mt3 green f6">Email sent! Check your inbox.</div>}
      </form>
    </div>
  )
}

export default PanelRequestEmailComponents
