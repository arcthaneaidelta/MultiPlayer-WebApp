import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, Zap, HelpCircle, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { StageScoreResult } from '../../types/session';

interface StageTransitionModalProps {
  isOpen: boolean;
  stageResult: StageScoreResult | null;
  nextStageTitle?: string;
  isFinalStage: boolean;
  onProceed: () => void;
}

export const StageTransitionModal: React.FC<StageTransitionModalProps> = ({
  isOpen,
  stageResult,
  nextStageTitle,
  isFinalStage,
  onProceed,
}) => {
  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#C99B55', '#727B61', '#E0BA7A', '#FFFFFF'],
        });
      } catch (e) {
        // Fallback gracefully
      }
    }
  }, [isOpen]);

  if (!isOpen || !stageResult) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem',
      }}
    >
      <div
        className="card-dark"
        style={{
          width: '100%',
          maxWidth: '480px',
          padding: '2.25rem',
          textAlign: 'center',
          borderRadius: '24px',
          border: '1px solid rgba(201, 155, 85, 0.45)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(201, 155, 85, 0.2)',
          animation: 'fadeIn 0.3s ease',
        }}
      >
        {/* Success Icon */}
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '20px',
            backgroundColor: 'rgba(201, 155, 85, 0.2)',
            color: '#E0BA7A',
            border: '1px solid rgba(201, 155, 85, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem',
          }}
        >
          <Award size={36} />
        </div>

        <span className="badge badge-dark-amber" style={{ marginBottom: '0.5rem' }}>
          {isFinalStage ? 'Investigation Concluded' : 'Stage Cleared'}
        </span>

        <h2 className="font-serif" style={{ fontSize: '1.75rem', color: '#F5F2EA', marginBottom: '0.35rem' }}>
          {stageResult.stageTitle}
        </h2>
        <p style={{ fontSize: '0.875rem', color: '#9FA499', marginBottom: '1.75rem' }}>
          Your squad reconciled the clues and cracked the solution in {stageResult.timeSpentSeconds} seconds!
        </p>

        {/* Score Breakdown Table */}
        <div
          style={{
            backgroundColor: '#202522',
            border: '1px solid #323834',
            borderRadius: '16px',
            padding: '1.25rem',
            marginBottom: '1.75rem',
            textAlign: 'left',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.65rem', fontSize: '0.875rem' }}>
            <span style={{ color: '#D2D6CC' }}>Base Stage Value</span>
            <span className="font-mono" style={{ fontWeight: 600, color: '#F5F2EA' }}>+{stageResult.baseScore}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.65rem', fontSize: '0.875rem' }}>
            <span style={{ color: '#D2D6CC', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Zap size={14} color="#C99B55" />
              <span>Speed Bonus ({stageResult.timeSpentSeconds}s elapsed)</span>
            </span>
            <span className="font-mono" style={{ fontWeight: 600, color: '#4ADE80' }}>+{stageResult.speedBonus}</span>
          </div>

          {stageResult.hintDeduction > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.65rem', fontSize: '0.875rem' }}>
              <span style={{ color: '#D2D6CC', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <HelpCircle size={14} color="#FF7B69" />
                <span>Hints Deduction ({stageResult.hintsUsedCount} used)</span>
              </span>
              <span className="font-mono" style={{ fontWeight: 600, color: '#FF7B69' }}>-{stageResult.hintDeduction}</span>
            </div>
          )}

          <div
            style={{
              borderTop: '1px solid #333A36',
              paddingTop: '0.75rem',
              marginTop: '0.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{ fontWeight: 700, color: '#F5F2EA', fontSize: '0.95rem' }}>Stage Total Earned</span>
            <span className="font-mono" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#E0BA7A' }}>
              +{stageResult.totalScore.toLocaleString()} pts
            </span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onProceed}
          className="btn btn-amber btn-lg"
          style={{ width: '100%', borderRadius: '14px', fontSize: '1.05rem' }}
        >
          <span>{isFinalStage ? 'View Final Results & Accolades' : `Proceed to ${nextStageTitle || 'Next Stage'}`}</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

