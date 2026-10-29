import React, { useState } from 'react';
import { Sliders, X, Eye, FastForward, UserPlus, UserMinus, CheckCircle2, RotateCcw, Zap } from 'lucide-react';
import { GameSession, Player } from '../../types/session';
import { PlayerPerspectiveKey } from '../../types/game';
import { GameService } from '../../services/gameService';
import { StorageService } from '../../services/storageService';

interface DemoControlsDrawerProps {
  session: GameSession | null;
  onSessionUpdated: (updated: GameSession) => void;
  onInstantCompleteStage?: () => void;
  onSpeedMultiplierChange?: (multiplier: number) => void;
}

export const DemoControlsDrawer: React.FC<DemoControlsDrawerProps> = ({
  session,
  onSessionUpdated,
  onInstantCompleteStage,
  onSpeedMultiplierChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [speed, setSpeed] = useState(1);

  if (!session) return null;

  const handlePerspectiveChange = (key: PlayerPerspectiveKey) => {
    const updated = { ...session };
    // Find player with that perspective or update active player's perspective
    const targetPlayer = updated.players.find((p) => p.perspectiveKey === key);
    if (targetPlayer) {
      updated.activePlayerId = targetPlayer.id;
    } else {
      const active = updated.players.find((p) => p.id === updated.activePlayerId);
      if (active) active.perspectiveKey = key;
    }
    onSessionUpdated(updated);
  };

  const handleAddPlayer = () => {
    const updated = GameService.addSimulatedPlayer(session);
    onSessionUpdated(updated);
  };

  const handleRemovePlayer = (id: string) => {
    const updated = GameService.removeSimulatedPlayer(session, id);
    onSessionUpdated(updated);
  };

  const handleToggleReady = (id: string) => {
    const updated = GameService.togglePlayerReady(session, id);
    onSessionUpdated(updated);
  };

  const handleSpeed = (newSpeed: number) => {
    setSpeed(newSpeed);
    StorageService.setDemoSpeedMultiplier(newSpeed);
    if (onSpeedMultiplierChange) onSpeedMultiplierChange(newSpeed);
  };

  const activePlayer = session.players.find((p) => p.id === session.activePlayerId);
  const activeKey = activePlayer?.perspectiveKey || 'player_a';

  return (
    <>
      {/* Floating Demo Controls Trigger Pill */}
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 90,
        }}
      >
        <button
          onClick={() => setIsOpen(true)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.6rem 1.1rem',
            borderRadius: '9999px',
            backgroundColor: 'rgba(34, 37, 34, 0.92)',
            color: '#E0BA7A',
            border: '1px solid rgba(201, 155, 85, 0.4)',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
            fontSize: '0.8125rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
          aria-label="Open Reviewer Demo Controls"
        >
          <Sliders size={15} />
          <span>Demo Controls</span>
        </button>
      </div>

      {/* Drawer Overlay */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(4px)',
            zIndex: 110,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
          onClick={() => setIsOpen(false)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '380px',
              height: '100%',
              backgroundColor: '#181B19',
              color: '#F5F2EA',
              borderLeft: '1px solid #2F3531',
              padding: '1.75rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              overflowY: 'auto',
              animation: 'fadeIn 0.2s ease',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span className="badge badge-dark-amber" style={{ marginBottom: '0.25rem' }}>
                  Reviewer Toolkit
                </span>
                <h3 className="font-serif" style={{ fontSize: '1.25rem', color: '#F5F2EA' }}>
                  Demo Controls
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'none',
                  color: '#9FA499',
                  padding: '0.4rem',
                  borderRadius: '8px',
                }}
              >
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: '0.8125rem', color: '#9FA499', lineHeight: 1.5 }}>
              Use these shortcuts to inspect different player perspectives, simulate multiplayer behavior, or accelerate the mystery without waiting for timers.
            </p>

            {/* 1. Switch Active Perspective */}
            <div>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: '#C99B55',
                  marginBottom: '0.75rem',
                  letterSpacing: '0.05em',
                }}
              >
                <Eye size={15} />
                <span>Switch Player Perspective</span>
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  { key: 'player_a' as PlayerPerspectiveKey, name: 'Player A — Detective Hayes', role: 'Lead Detective' },
                  { key: 'player_b' as PlayerPerspectiveKey, name: 'Player B — Dr. Elena Vance', role: 'Chief Archivist' },
                  { key: 'player_c' as PlayerPerspectiveKey, name: 'Player C — Marcus Chen', role: 'Security Specialist' },
                  { key: 'player_d' as PlayerPerspectiveKey, name: 'Player D — Sarah Jenkins', role: 'Forensics Specialist' },
                  { key: 'player_e' as PlayerPerspectiveKey, name: 'Player E — Alex Rivera', role: 'Systems Engineer' },
                ].map((item) => {
                  const isSelected = activeKey === item.key;
                  return (
                    <button
                      key={item.key}
                      onClick={() => handlePerspectiveChange(item.key)}
                      style={{
                        padding: '0.65rem 0.85rem',
                        borderRadius: '10px',
                        textAlign: 'left',
                        backgroundColor: isSelected ? 'rgba(201, 155, 85, 0.2)' : '#222624',
                        border: `1px solid ${isSelected ? '#C99B55' : '#303632'}`,
                        color: isSelected ? '#E0BA7A' : '#D4D8CE',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{item.name}</div>
                        <div style={{ fontSize: '0.725rem', color: '#8E9487' }}>{item.role}</div>
                      </div>
                      {isSelected && <CheckCircle2 size={16} color="#E0BA7A" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Timer Acceleration */}
            <div>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: '#C99B55',
                  marginBottom: '0.75rem',
                  letterSpacing: '0.05em',
                }}
              >
                <FastForward size={15} />
                <span>Timer Speedup</span>
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                {[1, 2, 5].map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSpeed(s)}
                    style={{
                      padding: '0.5rem',
                      borderRadius: '8px',
                      backgroundColor: speed === s ? '#C99B55' : '#222624',
                      color: speed === s ? '#161816' : '#E0E3DA',
                      fontWeight: 600,
                      fontSize: '0.8125rem',
                      border: '1px solid #323734',
                    }}
                  >
                    {s}x Speed
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Fast Complete / Skip Stage */}
            {onInstantCompleteStage && session.status === 'in_progress' && (
              <div>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: '#C99B55',
                    marginBottom: '0.75rem',
                    letterSpacing: '0.05em',
                  }}
                >
                  <Zap size={15} />
                  <span>Instant Solve / Fast-Forward</span>
                </label>
                <button
                  onClick={() => {
                    onInstantCompleteStage();
                    setIsOpen(false);
                  }}
                  className="btn btn-amber btn-sm"
                  style={{ width: '100%', borderRadius: '10px' }}
                >
                  <Zap size={15} />
                  <span>Auto-Submit Correct Answer</span>
                </button>
              </div>
            )}

            {/* 4. Simulated Players Management */}
            <div>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: '#C99B55',
                  marginBottom: '0.75rem',
                  letterSpacing: '0.05em',
                }}
              >
                <UserPlus size={15} />
                <span>Simulated Lobby ({session.players.length}/5)</span>
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <button
                  onClick={handleAddPlayer}
                  disabled={session.players.length >= 5}
                  className="btn btn-secondary btn-sm"
                  style={{
                    flex: 1,
                    backgroundColor: '#222624',
                    color: '#E0E3DA',
                    borderColor: '#323734',
                    opacity: session.players.length >= 5 ? 0.4 : 1,
                  }}
                >
                  <UserPlus size={14} />
                  <span>Add Player</span>
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {session.players.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.45rem 0.65rem',
                      borderRadius: '8px',
                      backgroundColor: '#1E2220',
                      border: '1px solid #2C312E',
                      fontSize: '0.775rem',
                    }}
                  >
                    <div>
                      <span style={{ fontWeight: 600 }}>{p.displayName}</span>
                      {p.isHost && (
                        <span style={{ marginLeft: '0.4rem', color: '#C99B55', fontSize: '0.7rem' }}>(Host)</span>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <button
                        onClick={() => handleToggleReady(p.id)}
                        style={{
                          background: 'none',
                          color: p.isReady ? '#727B61' : '#9FA499',
                          fontSize: '0.7rem',
                          padding: '0.2rem 0.4rem',
                          borderRadius: '4px',
                          border: `1px solid ${p.isReady ? '#727B61' : '#3C423E'}`,
                        }}
                      >
                        {p.isReady ? 'Ready' : 'Waiting'}
                      </button>
                      {!p.isHost && (
                        <button
                          onClick={() => handleRemovePlayer(p.id)}
                          style={{
                            background: 'none',
                            color: '#B84A39',
                            padding: '0.2rem',
                          }}
                          title="Remove player"
                        >
                          <UserMinus size={13} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reset Session */}
            <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #2F3531' }}>
              <button
                onClick={() => {
                  if (window.confirm('Reset the active game session to initial state?')) {
                    StorageService.saveCurrentSession(null);
                    window.location.href = '/#/play';
                    window.location.reload();
                  }
                }}
                className="btn btn-secondary btn-sm"
                style={{ width: '100%', backgroundColor: 'transparent', color: '#9FA499', borderColor: '#3C423E' }}
              >
                <RotateCcw size={14} />
                <span>Reset Game Session</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

