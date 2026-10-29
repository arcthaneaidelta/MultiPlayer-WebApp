import React, { useState } from 'react';
import { KeyRound, HelpCircle, ArrowRight, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

interface AnswerSubmissionProps {
  onSubmitAnswer: (answer: string) => void;
  onOpenHints: () => void;
  hintsAvailable: number;
  unlockedHintCount: number;
  lastFeedback: { isCorrect: boolean; message: string } | null;
  placeholder?: string;
  isSubmitting?: boolean;
}

export const AnswerSubmission: React.FC<AnswerSubmissionProps> = ({
  onSubmitAnswer,
  onOpenHints,
  hintsAvailable,
  unlockedHintCount,
  lastFeedback,
  placeholder = 'Enter group answer...',
  isSubmitting = false,
}) => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim() || isSubmitting) return;
    onSubmitAnswer(answer.trim());
  };

  return (
    <div
      className="card-dark"
      style={{
        padding: '1.35rem',
        borderRadius: '18px',
        border: '1px solid #333A35',
        backgroundColor: '#191C1A',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <KeyRound size={17} color="#C99B55" />
          <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#F5F2EA', letterSpacing: '0.02em' }}>
            Submit Group Solution
          </span>
        </div>

        <button
          type="button"
          onClick={onOpenHints}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: 'none',
            color: '#E0BA7A',
            fontSize: '0.775rem',
            fontWeight: 600,
            padding: '0.3rem 0.55rem',
            borderRadius: '6px',
            backgroundColor: 'rgba(201, 155, 85, 0.12)',
            border: '1px solid rgba(201, 155, 85, 0.25)',
          }}
        >
          <HelpCircle size={13} />
          <span>Need a Hint? ({unlockedHintCount}/{hintsAvailable})</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.65rem' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder={placeholder}
            className="input-text input-dark font-mono"
            style={{
              fontSize: '1rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              minHeight: '48px',
              paddingLeft: '1rem',
              paddingRight: '1rem',
              borderColor: lastFeedback && !lastFeedback.isCorrect ? 'var(--color-error)' : undefined,
            }}
            disabled={isSubmitting}
            autoComplete="off"
            autoCapitalize="characters"
          />
        </div>

        <button
          type="submit"
          disabled={!answer.trim() || isSubmitting}
          className="btn btn-amber btn-lg"
          style={{
            minHeight: '48px',
            padding: '0 1.5rem',
            borderRadius: '12px',
            opacity: !answer.trim() || isSubmitting ? 0.5 : 1,
          }}
        >
          <span>Submit</span>
          <ArrowRight size={16} />
        </button>
      </form>

      {/* Instant Feedback Message */}
      {lastFeedback && (
        <div
          style={{
            marginTop: '0.85rem',
            padding: '0.75rem 1rem',
            borderRadius: '10px',
            backgroundColor: lastFeedback.isCorrect ? 'rgba(59, 122, 87, 0.2)' : 'rgba(184, 74, 57, 0.2)',
            border: `1px solid ${lastFeedback.isCorrect ? 'var(--color-success)' : 'var(--color-error)'}`,
            display: 'flex',
            alignItems: 'center',
            gap: '0.55rem',
            animation: 'fadeIn 0.25s ease',
          }}
        >
          {lastFeedback.isCorrect ? (
            <CheckCircle2 size={18} color="#4ADE80" style={{ flexShrink: 0 }} />
          ) : (
            <AlertCircle size={18} color="#FF7B69" style={{ flexShrink: 0 }} />
          )}
          <span
            style={{
              fontSize: '0.85rem',
              color: lastFeedback.isCorrect ? '#E6F4EA' : '#FFD9D4',
              lineHeight: 1.4,
            }}
          >
            {lastFeedback.message}
          </span>
        </div>
      )}

      {/* Helpful note */}
      <div style={{ marginTop: '0.65rem', fontSize: '0.725rem', color: '#7E8478', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
        <Sparkles size={11} color="#C99B55" />
        <span>Answers are case-insensitive and allow flexible spacing or hyphens.</span>
      </div>
    </div>
  );
};

