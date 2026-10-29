import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { KeyRound, Users, ArrowRight, Sparkles, Smartphone, CheckCircle2 } from 'lucide-react';
import { GameService } from '../services/gameService';
import { StorageService } from '../services/storageService';

export const InviteLandingPage: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const roomCode = (code || '578595').toUpperCase();

  const [displayName, setDisplayName] = useState('Agent Morgan');
  const [error, setError] = useState<string | null>(null);

  const game = StorageService.getGame();

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim()) {
      setError('Please choose a display name to join.');
      return;
    }

    try {
      GameService.joinRoom(roomCode, displayName.trim());
      navigate('/play/lobby');
    } catch (err: any) {
      setError(err.message || 'Unable to join room.');
    }
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
      <div style={{ width: '100%', maxWidth: '460px' }}>
        {/* Brand */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              backgroundColor: 'var(--color-charcoal)',
              color: '#FCFBF7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '1.25rem',
              margin: '0 auto 0.75rem',
            }}
          >
            Q
          </div>
          <span className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-charcoal)' }}>
            QUESTROOM
          </span>
          <div style={{ fontSize: '0.8125rem', color: 'var(--color-gray)', marginTop: '0.2rem' }}>
            Private Game Night Invitation
          </div>
        </div>

        {/* Invitation Card */}
        <div
          className="card-paper"
          style={{
            padding: '2.25rem',
            borderRadius: '24px',
            boxShadow: 'var(--shadow-md)',
            textAlign: 'center',
            marginBottom: '1.5rem',
          }}
        >
          <span className="badge badge-amber" style={{ marginBottom: '0.65rem' }}>
            Room Invitation
          </span>

          <h2 className="font-serif" style={{ fontSize: '1.6rem', color: 'var(--color-charcoal)', marginBottom: '0.35rem' }}>
            You’ve Been Invited!
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-gray)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
            Join your group for <strong>"{game.title}"</strong>. Compare separate evidence files and solve the mystery together.
          </p>

          {/* Room Code Badge */}
          <div
            style={{
              backgroundColor: 'var(--color-ivory)',
              border: '2px dashed var(--color-olive)',
              borderRadius: '14px',
              padding: '1rem',
              marginBottom: '1.5rem',
            }}
          >
            <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--color-gray)', fontWeight: 700, letterSpacing: '0.06em' }}>
              TARGET ROOM ACCESS CODE
            </span>
            <div className="font-mono" style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '0.14em', color: 'var(--color-charcoal)' }}>
              {roomCode}
            </div>
          </div>

          {error && (
            <div style={{ padding: '0.65rem', borderRadius: '8px', backgroundColor: 'var(--color-error-bg)', color: 'var(--color-error)', fontSize: '0.8125rem', marginBottom: '1rem' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleJoin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ textAlign: 'left' }}>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Your Player Display Name
              </label>
              <input
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="input-text"
                placeholder="e.g. Agent Morgan"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ width: '100%', borderRadius: '14px' }}
            >
              <span>Enter Investigation Lobby</span>
              <ArrowRight size={18} />
            </button>
          </form>
        </div>

        <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--color-gray)' }}>
          Works directly in your mobile or desktop browser. No app download required.
        </div>
      </div>
    </div>
  );
};

