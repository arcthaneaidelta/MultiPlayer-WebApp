import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, KeyRound, ArrowRight, CheckCircle2, Lock, Smartphone, Sparkles } from 'lucide-react';
import { StorageService } from '../services/storageService';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'credentials' | '2fa'>('credentials');
  const [email, setEmail] = useState('admin@questroom.demo');
  const [password, setPassword] = useState('••••••••••••');
  const [twoFactorCode, setTwoFactorCode] = useState('784-291');

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('2fa');
  };

  const handle2FASubmit = (e: React.FormEvent) => {
    e.preventDefault();
    StorageService.setAdminAuthenticated(true);
    navigate('/admin');
  };

  const handleInstantDemoLogin = () => {
    StorageService.setAdminAuthenticated(true);
    navigate('/admin');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-ivory)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
      }}
    >
      <div style={{ width: '100%', maxWidth: '440px' }}>
        {/* Brand */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: 'var(--color-charcoal)',
                color: '#FCFBF7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '1.2rem',
              }}
            >
              Q
            </div>
            <span className="font-serif" style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--color-charcoal)' }}>
              QUESTROOM
            </span>
          </Link>
          <div style={{ fontSize: '0.8125rem', color: 'var(--color-gray)', marginTop: '0.25rem' }}>
            Platform Operations & Game Administration
          </div>
        </div>

        {/* Card */}
        <div
          className="card-paper"
          style={{
            padding: '2.25rem',
            borderRadius: '24px',
            boxShadow: 'var(--shadow-md)',
            marginBottom: '1.5rem',
          }}
        >
          {step === 'credentials' ? (
            <form onSubmit={handleCredentialsSubmit}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <Shield size={20} color="var(--color-olive)" />
                <h2 className="font-serif" style={{ fontSize: '1.45rem', fontWeight: 700 }}>
                  Operator Sign In
                </h2>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-gray)', marginBottom: '1.75rem' }}>
                Enter your administrative credentials to manage games and monitor sessions.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                    Admin Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-text"
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 600 }}>Password</label>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-gray)' }}>Demo: Any string</span>
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-text font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg"
                style={{ width: '100%', borderRadius: '14px', marginBottom: '1rem' }}
              >
                <span>Continue to 2-Factor Check</span>
                <ArrowRight size={18} />
              </button>

              <button
                type="button"
                onClick={handleInstantDemoLogin}
                className="btn btn-secondary btn-sm"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Sparkles size={14} color="var(--color-amber-dark)" />
                <span>Instant 1-Click Demo Access</span>
              </button>
            </form>
          ) : (
            <form onSubmit={handle2FASubmit}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <Smartphone size={20} color="var(--color-amber-dark)" />
                <h2 className="font-serif" style={{ fontSize: '1.45rem', fontWeight: 700 }}>
                  Authenticator Verification
                </h2>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-gray)', marginBottom: '1.75rem' }}>
                Step 2: Enter the 6-digit verification code from your authenticator app.
              </p>

              <div style={{ marginBottom: '1.75rem' }}>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  2FA Verification Code
                </label>
                <input
                  type="text"
                  required
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value)}
                  className="input-text font-mono"
                  style={{ fontSize: '1.4rem', letterSpacing: '0.12em', textAlign: 'center' }}
                />
                <span style={{ fontSize: '0.725rem', color: 'var(--color-gray)', marginTop: '0.45rem', display: 'block', textAlign: 'center' }}>
                  Simulated 2FA Code pre-filled for easy reviewer access.
                </span>
              </div>

              <button
                type="submit"
                className="btn btn-amber btn-lg"
                style={{ width: '100%', borderRadius: '14px', marginBottom: '0.75rem' }}
              >
                <CheckCircle2 size={18} />
                <span>Verify & Enter Dashboard</span>
              </button>

              <button
                type="button"
                onClick={() => setStep('credentials')}
                className="btn btn-ghost btn-sm"
                style={{ width: '100%', justifyContent: 'center', color: 'var(--color-gray)' }}
              >
                <span>Back to login</span>
              </button>
            </form>
          )}
        </div>

        {/* Security disclaimer */}
        <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--color-gray)', lineHeight: 1.5 }}>
          Demo Mode: Authentication workflow is locally simulated. No real passwords or secrets are collected or stored.
        </div>
      </div>
    </div>
  );
};

