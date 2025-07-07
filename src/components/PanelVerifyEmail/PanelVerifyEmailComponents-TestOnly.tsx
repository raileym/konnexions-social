import type { CookedEmail } from '@cknTypes/types';
import React, { useEffect, useState } from 'react';

const PanelVerifyEmailComponents: React.FC<Props> = ({ token, cookedEmail }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    setStatus('loading');
    setError(null);

    fetch('/.netlify/functions/verifyToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token,
        cookedEmail
      }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Verification failed');
        return res.json();
      })
      .then(() => {
        setStatus('success');
      })
      .catch(e => {
        setError(e.message);
        setStatus('error');
      });
  }, [token]);

  if (!token) return <div>No token provided</div>;

  if (status === 'loading') return <div>Verifying token...</div>;

  if (status === 'error') return <div style={{ color: 'red' }}>Error: {error}</div>;

  if (status === 'success') return <div style={{ color: 'green' }}>Verification successful!</div>;

  return null;
};

export default PanelVerifyEmailComponents;
