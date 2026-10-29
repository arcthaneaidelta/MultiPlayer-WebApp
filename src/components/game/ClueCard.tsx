import React from 'react';
import { FileText, Eye, ShieldCheck, Tag, Info, Stamp } from 'lucide-react';
import { PlayerClue } from '../../types/game';
import { Player } from '../../types/session';

interface ClueCardProps {
  clue: PlayerClue;
  player: Player;
  onOpenPerspectiveSwitcher?: () => void;
}

export const ClueCard: React.FC<ClueCardProps> = ({ clue, player, onOpenPerspectiveSwitcher }) => {
  return (
    <div
      className="card-dark"
      style={{
        padding: '1.5rem',
        borderRadius: '20px',
        border: '1px solid #333A35',
        backgroundColor: '#191C1A',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 12px 36px rgba(0, 0, 0, 0.45)',
      }}
    >
      {/* Top Banner: Confidential Player Dossier */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid #282E2A',
          marginBottom: '1.25rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              backgroundColor: '#262C28',
              color: '#E0BA7A',
              border: '1px solid rgba(201, 155, 85, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '1rem',
            }}
          >
            {player.avatar}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#F5F2EA' }}>
                {clue.characterName}
              </span>
              <span className="badge badge-olive" style={{ fontSize: '0.65rem', padding: '0.15rem 0.45rem' }}>
                {clue.role}
              </span>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#9FA499' }}>
              Your Private Screen & Clue
            </span>
          </div>
        </div>

        {/* Clue Type Tag */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.3rem 0.65rem',
            borderRadius: '9999px',
            backgroundColor: 'rgba(201, 155, 85, 0.12)',
            color: '#E0BA7A',
            fontSize: '0.75rem',
            fontWeight: 600,
            border: '1px solid rgba(201, 155, 85, 0.25)',
          }}
        >
          <Tag size={12} />
          <span style={{ textTransform: 'capitalize' }}>{clue.artifactType} Evidence</span>
        </div>
      </div>

      {/* Clue Header */}
      <div style={{ marginBottom: '1.25rem' }}>
        <span
          style={{
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#C99B55',
            fontWeight: 700,
          }}
        >
          Recovered Department Clue
        </span>
        <h3
          className="font-serif"
          style={{
            fontSize: '1.35rem',
            fontWeight: 700,
            color: '#F5F2EA',
            lineHeight: 1.3,
            marginTop: '0.2rem',
          }}
        >
          {clue.clueTitle}
        </h3>
      </div>

      {/* Clue Body Card / Physical Artifact simulation */}
      <div
        style={{
          backgroundColor: '#202422',
          border: '1px solid #333935',
          borderRadius: '14px',
          padding: '1.25rem',
          marginBottom: '1.25rem',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '0.75rem',
            right: '0.85rem',
            opacity: 0.15,
            pointerEvents: 'none',
          }}
        >
          <FileText size={48} color="#C99B55" />
        </div>

        <p
          style={{
            fontSize: '0.9375rem',
            color: '#E6E9E1',
            lineHeight: 1.65,
            marginBottom: '1rem',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {clue.clueText}
        </p>

        {/* Artifact Metadata footer */}
        <div
          style={{
            borderTop: '1px solid #2F3531',
            paddingTop: '0.75rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.5rem',
            fontSize: '0.75rem',
            color: '#9FA499',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <FileText size={13} color="#727B61" />
            <span className="font-mono">{clue.artifactDetails}</span>
          </div>
          <span style={{ color: '#C99B55', fontWeight: 600 }}>CONFIDENTIAL</span>
        </div>
      </div>

      {/* Synthesis Callout: Your Specific Piece */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.65rem',
          backgroundColor: 'rgba(114, 123, 97, 0.15)',
          border: '1px solid rgba(114, 123, 97, 0.35)',
          borderRadius: '12px',
          padding: '0.85rem 1rem',
        }}
      >
        <ShieldCheck size={18} color="#8E987B" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#DDE1D4', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Your Contribution to the Team:
          </span>
          <p style={{ fontSize: '0.85rem', color: '#F5F2EA', fontWeight: 500, marginTop: '0.15rem' }}>
            "{clue.keyPiece}"
          </p>
        </div>
      </div>
    </div>
  );
};

