import React from 'react';
import { MapPin, ShieldAlert } from 'lucide-react';
import { CountdownTimer } from './CountdownTimer';

interface StageProgressProps {
  currentStageIndex: number;
  totalStages: number;
  stageTitle: string;
  stageLocation: string;
  durationSeconds: number;
  remainingSeconds: number;
  isPaused: boolean;
  score: number;
  speedMultiplier?: number;
  onTick: (newRemaining: number) => void;
  onTimeUp: () => void;
  onTogglePause: () => void;
}

export const StageProgress: React.FC<StageProgressProps> = ({
  currentStageIndex,
  totalStages,
  stageTitle,
  stageLocation,
  durationSeconds,
  remainingSeconds,
  isPaused,
  score,
  speedMultiplier = 1,
  onTick,
  onTimeUp,
  onTogglePause,
}) => {
  const currentNum = currentStageIndex + 1;
  const stageFormatted = `0${currentNum} / 0${totalStages}`;

  return (
    <div
      style={{
        backgroundColor: '#161917',
        borderBottom: '1px solid #282E2A',
        padding: '0.85rem 1.25rem',
        position: 'sticky',
        top: '68px',
        zIndex: 40,
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
      }}
    >
      <div
        className="container-custom"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
        }}
      >
        {/* Left: Stage number & title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div
            style={{
              padding: '0.25rem 0.65rem',
              borderRadius: '8px',
              backgroundColor: 'rgba(201, 155, 85, 0.15)',
              border: '1px solid rgba(201, 155, 85, 0.3)',
              color: '#E0BA7A',
              fontWeight: 700,
              fontSize: '0.8125rem',
              letterSpacing: '0.06em',
            }}
          >
            STAGE {stageFormatted}
          </div>

          <div>
            <div
              className="font-serif"
              style={{
                fontSize: '1.05rem',
                fontWeight: 700,
                color: '#F5F2EA',
                lineHeight: 1.2,
              }}
            >
              {stageTitle}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.725rem',
                color: '#9FA499',
              }}
            >
              <MapPin size={12} color="#727B61" />
              <span>{stageLocation}</span>
            </div>
          </div>
        </div>

        {/* Right: Score and Timer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          {/* Score Counter */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
            }}
          >
            <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: '#9FA499', letterSpacing: '0.05em' }}>
              Team Score
            </span>
            <span className="font-mono" style={{ fontSize: '1.15rem', fontWeight: 700, color: '#C99B55' }}>
              {score.toLocaleString()}
            </span>
          </div>

          {/* Countdown Clock */}
          <CountdownTimer
            durationSeconds={durationSeconds}
            remainingSeconds={remainingSeconds}
            isPaused={isPaused}
            speedMultiplier={speedMultiplier}
            onTick={onTick}
            onTimeUp={onTimeUp}
            onTogglePause={onTogglePause}
          />
        </div>
      </div>

      {/* Thin linear progress bar across bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '3px',
          backgroundColor: '#262C28',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${(currentNum / totalStages) * 100}%`,
            backgroundColor: '#C99B55',
            transition: 'width 0.4s ease',
          }}
        />
      </div>
    </div>
  );
};

