import React, { useEffect, useState } from 'react';
import { Clock, Pause, Play, AlertCircle } from 'lucide-react';

interface CountdownTimerProps {
  durationSeconds: number;
  remainingSeconds: number;
  isPaused: boolean;
  speedMultiplier?: number;
  onTick: (newRemaining: number) => void;
  onTimeUp: () => void;
  onTogglePause: () => void;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  durationSeconds,
  remainingSeconds,
  isPaused,
  speedMultiplier = 1,
  onTick,
  onTimeUp,
  onTogglePause,
}) => {
  const [seconds, setSeconds] = useState(remainingSeconds);

  useEffect(() => {
    setSeconds(remainingSeconds);
  }, [remainingSeconds]);

  useEffect(() => {
    if (isPaused) return;
    if (seconds <= 0) {
      onTimeUp();
      return;
    }

    const intervalMs = Math.max(100, Math.round(1000 / speedMultiplier));
    const timer = setInterval(() => {
      setSeconds((prev) => {
        const next = Math.max(0, prev - 1);
        onTick(next);
        if (next === 0) {
          clearInterval(timer);
          onTimeUp();
        }
        return next;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPaused, seconds, speedMultiplier, onTick, onTimeUp]);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const formatted = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  const isLowTime = seconds <= 15;
  const progressPercent = Math.max(0, Math.min(100, (seconds / durationSeconds) * 100));

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.65rem',
        backgroundColor: isLowTime ? 'rgba(184, 74, 57, 0.2)' : 'rgba(34, 37, 34, 0.85)',
        border: `1px solid ${isLowTime ? 'var(--color-error)' : 'rgba(201, 155, 85, 0.3)'}`,
        borderRadius: '9999px',
        padding: '0.35rem 0.85rem 0.35rem 0.65rem',
        backdropFilter: 'blur(8px)',
        boxShadow: isLowTime ? '0 0 15px rgba(184, 74, 57, 0.4)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <button
        onClick={onTogglePause}
        style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          backgroundColor: isPaused ? '#C99B55' : 'rgba(255, 255, 255, 0.1)',
          color: isPaused ? '#161816' : '#E0BA7A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
        title={isPaused ? 'Resume Timer' : 'Pause Timer'}
      >
        {isPaused ? <Play size={13} fill="currentColor" /> : <Pause size={13} fill="currentColor" />}
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <Clock size={15} color={isLowTime ? '#F77F6E' : '#E0BA7A'} />
        <span
          className="font-mono"
          style={{
            fontSize: '1.05rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
            color: isLowTime ? '#FF8777' : '#F5F2EA',
          }}
        >
          {formatted}
        </span>
      </div>

      {isLowTime && (
        <span
          style={{
            fontSize: '0.65rem',
            fontWeight: 700,
            color: '#FF8777',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            animation: 'fadeIn 0.2s',
          }}
        >
          Hurry!
        </span>
      )}
    </div>
  );
};

