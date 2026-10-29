import React from 'react';
import { HelpCircle, X, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';
import { Hint } from '../../types/game';

interface HintsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  hints: Hint[];
  unlockedHintCount: number;
  onUnlockNextHint: () => void;
  hintPenalty: number;
}

export const HintsDrawer: React.FC<HintsDrawerProps> = ({
  isOpen,
  onClose,
  hints,
  unlockedHintCount,
  onUnlockNextHint,
  hintPenalty,
}) => {
  if (!isOpen) return null;

  const hasNextHint = unlockedHintCount < hints.length;
  const nextHint = hasNextHint ? hints[unlockedHintCount] : null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(5px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <div
        className="card-dark"
        style={{
          width: '100%',
          maxWidth: '460px',
          padding: '1.75rem',
          position: 'relative',
          border: '1px solid #363C38',
          animation: 'fadeIn 0.2s ease',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'none',
            color: '#9FA499',
            padding: '0.4rem',
            borderRadius: '8px',
          }}
          aria-label="Close Hints Modal"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: 'rgba(201, 155, 85, 0.18)',
              color: '#E0BA7A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Lightbulb size={20} />
          </div>
          <div>
            <h3 className="font-serif" style={{ fontSize: '1.3rem', color: '#F5F2EA' }}>
              Investigation Clue Hints
            </h3>
            <span style={{ fontSize: '0.75rem', color: '#9FA499' }}>
              Unlocked: {unlockedHintCount} / {hints.length} available
            </span>
          </div>
        </div>

        <p style={{ fontSize: '0.85rem', color: '#D2D6CC', lineHeight: 1.5, marginBottom: '1.25rem' }}>
          Stuck on this stage? Revealing a hint will clarify how your group's pieces fit together.
        </p>

        {/* List of hints */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
          {hints.map((hint, idx) => {
            const isUnlocked = idx < unlockedHintCount;
            return (
              <div
                key={hint.id}
                style={{
                  padding: '1rem',
                  borderRadius: '12px',
                  backgroundColor: isUnlocked ? '#222724' : '#1A1D1B',
                  border: `1px solid ${isUnlocked ? 'rgba(201, 155, 85, 0.4)' : '#2A2F2C'}`,
                  position: 'relative',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <span
                    style={{
                      fontSize: '0.725rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: isUnlocked ? '#E0BA7A' : '#72776D',
                    }}
                  >
                    Hint {idx + 1}
                  </span>
                  {isUnlocked ? (
                    <span style={{ fontSize: '0.725rem', color: '#727B61', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <CheckCircle size={13} /> Unlocked (-{hint.penaltyPoints} pts)
                    </span>
                  ) : (
                    <span style={{ fontSize: '0.725rem', color: '#9FA499' }}>
                      Costs -{hint.penaltyPoints} pts
                    </span>
                  )}
                </div>

                {isUnlocked ? (
                  <p style={{ fontSize: '0.9rem', color: '#F5F2EA', lineHeight: 1.5 }}>
                    {hint.text}
                  </p>
                ) : (
                  <div style={{ fontSize: '0.85rem', color: '#686D63', fontStyle: 'italic' }}>
                    Clue locked. Click "Reveal Next Hint" below to decode.
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        {hasNextHint ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontSize: '0.75rem',
                color: '#E0BA7A',
                backgroundColor: 'rgba(201, 155, 85, 0.1)',
                padding: '0.5rem 0.75rem',
                borderRadius: '8px',
              }}
            >
              <AlertTriangle size={15} />
              <span>Unlocking Hint {unlockedHintCount + 1} will deduct {nextHint?.penaltyPoints || hintPenalty} points from stage score.</span>
            </div>

            <button
              onClick={onUnlockNextHint}
              className="btn btn-amber btn-lg"
              style={{ width: '100%', borderRadius: '12px' }}
            >
              <Lightbulb size={18} />
              <span>Reveal Hint {unlockedHintCount + 1} (-{nextHint?.penaltyPoints} pts)</span>
            </button>
          </div>
        ) : (
          <div
            style={{
              padding: '0.85rem',
              borderRadius: '10px',
              backgroundColor: 'rgba(114, 123, 97, 0.15)',
              color: '#DDE1D4',
              textAlign: 'center',
              fontSize: '0.875rem',
              fontWeight: 500,
            }}
          >
            All available hints for this stage have been unlocked!
          </div>
        )}
      </div>
    </div>
  );
};

