import React from 'react';
import { X, Users, Clock, Award, ShieldAlert, CheckCircle, Lightbulb, Activity, ArrowRight } from 'lucide-react';
import { GameSession } from '../../types/session';

interface SessionDetailDrawerProps {
  session: GameSession | null;
  onClose: () => void;
  onTriggerSimulatedEvent?: (sessionId: string) => void;
}

export const SessionDetailDrawer: React.FC<SessionDetailDrawerProps> = ({
  session,
  onClose,
  onTriggerSimulatedEvent,
}) => {
  if (!session) return null;

  const durationSec = session.endTime && session.startTime
    ? Math.round((session.endTime - session.startTime) / 1000)
    : Math.round((Date.now() - session.startTime) / 1000);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(20, 23, 21, 0.6)',
        backdropFilter: 'blur(4px)',
        zIndex: 100,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
      onClick={onClose}
    >
      <div
        className="card-paper"
        style={{
          width: '100%',
          maxWidth: '520px',
          height: '100%',
          backgroundColor: '#FCFBF7',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          overflowY: 'auto',
          animation: 'fadeIn 0.25s ease',
          boxShadow: '-10px 0 30px rgba(0,0,0,0.15)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span className="badge badge-charcoal">{session.roomCode}</span>
              <span
                className={`badge ${
                  session.status === 'completed'
                    ? 'badge-olive'
                    : session.status === 'in_progress'
                    ? 'badge-amber'
                    : 'badge-charcoal'
                }`}
              >
                {session.status.replace('_', ' ')}
              </span>
            </div>
            <h2 className="font-serif" style={{ fontSize: '1.35rem', fontWeight: 700 }}>
              Session {session.id}
            </h2>
            <div style={{ fontSize: '0.8125rem', color: 'var(--color-gray)' }}>
              Game: {session.gameTitle}
            </div>
          </div>

          <button
            onClick={onClose}
            style={{ background: 'none', color: 'var(--color-gray)', padding: '0.4rem', borderRadius: '8px' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Quick Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
          <div style={{ backgroundColor: 'var(--color-ivory)', padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--color-gray)', textTransform: 'uppercase', fontWeight: 600 }}>Score</span>
            <div className="font-mono" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-amber-dark)' }}>
              {session.score}
            </div>
          </div>
          <div style={{ backgroundColor: 'var(--color-ivory)', padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--color-gray)', textTransform: 'uppercase', fontWeight: 600 }}>Stage</span>
            <div className="font-mono" style={{ fontSize: '1.25rem', fontWeight: 700 }}>
              {session.currentStageIndex + 1}/{session.totalStages}
            </div>
          </div>
          <div style={{ backgroundColor: 'var(--color-ivory)', padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--color-gray)', textTransform: 'uppercase', fontWeight: 600 }}>Duration</span>
            <div className="font-mono" style={{ fontSize: '1.25rem', fontWeight: 700 }}>
              {Math.floor(durationSec / 60)}m {durationSec % 60}s
            </div>
          </div>
        </div>

        {/* Connected Participants */}
        <div>
          <h4 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-charcoal)', marginBottom: '0.65rem' }}>
            Connected Participants ({session.players.length}/5)
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            {session.players.map((p) => (
              <div
                key={p.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '10px',
                  backgroundColor: 'var(--color-ivory)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <div
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-charcoal)',
                      color: '#FCFBF7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                    }}
                  >
                    {p.avatar}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                      {p.displayName} {p.isHost && <span style={{ color: 'var(--color-amber-dark)', fontSize: '0.7rem' }}>(Host)</span>}
                    </div>
                    <div style={{ fontSize: '0.725rem', color: 'var(--color-gray)' }}>{p.role}</div>
                  </div>
                </div>
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    color: p.isReady ? 'var(--color-success)' : 'var(--color-gray)',
                  }}
                >
                  {p.isReady ? 'Ready' : 'Connecting'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stage Performance */}
        <div>
          <h4 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-charcoal)', marginBottom: '0.65rem' }}>
            Stage History & Answers
          </h4>
          {session.stageResults.length === 0 ? (
            <div style={{ padding: '1rem', backgroundColor: 'var(--color-ivory)', borderRadius: '10px', textAlign: 'center', fontSize: '0.8125rem', color: 'var(--color-gray)' }}>
              No stage answers submitted yet for this session.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {session.stageResults.map((sr, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    backgroundColor: 'var(--color-ivory)',
                    border: '1px solid var(--color-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{sr.stageTitle}</div>
                    <div style={{ fontSize: '0.725rem', color: 'var(--color-gray)' }}>
                      Solved in {sr.timeSpentSeconds}s • {sr.hintsUsedCount} hints used
                    </div>
                  </div>
                  <span className="font-mono" style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-olive-dark)' }}>
                    +{sr.totalScore}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Event Timeline */}
        <div>
          <h4 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-charcoal)', marginBottom: '0.65rem' }}>
            Telemetry Event Timeline
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '200px', overflowY: 'auto' }}>
            {session.activityEvents.map((ev) => (
              <div
                key={ev.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.65rem',
                  fontSize: '0.775rem',
                  padding: '0.5rem 0.65rem',
                  borderRadius: '8px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-border)',
                }}
              >
                <Activity size={14} color="var(--color-olive)" style={{ marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <div style={{ color: 'var(--color-charcoal)', fontWeight: 500 }}>{ev.message}</div>
                  <div style={{ fontSize: '0.675rem', color: 'var(--color-gray)' }}>
                    {new Date(ev.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer controls */}
        {onTriggerSimulatedEvent && (
          <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
            <button
              onClick={() => onTriggerSimulatedEvent(session.id)}
              className="btn btn-secondary btn-sm"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <span>Simulate Periodic Event</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

