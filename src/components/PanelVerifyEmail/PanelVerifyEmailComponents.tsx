import React, { useState } from 'react';

type PanelVerifyEmailComponentsProps = {
  onVerified?: () => void; // Callback on successful verification
};

const PanelVerifyEmailComponents: React.FC<PanelVerifyEmailComponentsProps> = ({ onVerified }) => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const verifyToken = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/.netlify/functions/verifyToken', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token }),
      });

      if (!response.ok) {
        throw new Error('Verification failed');
      }

      setSuccess(true);
      onVerified?.();
    } catch (err) {
      setError((err as Error).message || 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !token) {
      setError('Please fill in all fields');
      return;
    }
    verifyToken();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={loading}
          required
        />
      </label>
      <label>
        Verification Token:
        <input
          type="text"
          value={token}
          onChange={e => setToken(e.target.value)}
          disabled={loading}
          required
        />
      </label>
      <button type="submit" disabled={loading}>
        {loading ? 'Verifying...' : 'Verify'}
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>Verification successful!</div>}
    </form>
  );
};

export default PanelVerifyEmailComponents;
