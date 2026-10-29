import React, { useState } from 'react';
import { X, Copy, Check, QrCode, Smartphone, ExternalLink } from 'lucide-react';
import { QrService } from '../../services/qrService';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomCode: string;
  inviteUrl: string;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({
  isOpen,
  onClose,
  roomCode,
  inviteUrl,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(inviteUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    } else {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const svgContent = QrService.generateSvg(inviteUrl, 210);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(10, 12, 11, 0.85)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <div
        className="card-paper"
        style={{
          width: '100%',
          maxWidth: '420px',
          padding: '2rem',
          position: 'relative',
          textAlign: 'center',
          animation: 'fadeIn 0.25s ease',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
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
            color: 'var(--color-gray)',
            padding: '0.4rem',
            borderRadius: '8px',
          }}
          aria-label="Close QR Modal"
        >
          <X size={20} />
        </button>

        <div
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            backgroundColor: 'var(--color-sage-light)',
            color: 'var(--color-olive-dark)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
          }}
        >
          <QrCode size={24} />
        </div>

        <h3 className="font-serif" style={{ fontSize: '1.4rem', marginBottom: '0.35rem' }}>
          Scan to Join Room
        </h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-gray)', marginBottom: '1.5rem' }}>
          Players can point their phone camera at this QR code to jump straight into the lobby.
        </p>

        {/* QR Code Container */}
        <div
          style={{
            padding: '1.25rem',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '2px solid var(--color-border)',
            display: 'inline-block',
            boxShadow: '0 6px 18px rgba(0, 0, 0, 0.06)',
            marginBottom: '1.5rem',
          }}
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />

        {/* Room Code Callout */}
        <div
          style={{
            backgroundColor: 'var(--color-ivory)',
            border: '1px solid var(--color-border)',
            borderRadius: '12px',
            padding: '0.85rem 1rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ textAlign: 'left' }}>
            <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--color-gray)', fontWeight: 700, letterSpacing: '0.05em' }}>
              Room Access Code
            </span>
            <div className="font-mono" style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--color-charcoal)' }}>
              {roomCode}
            </div>
          </div>
          <div
            style={{
              padding: '0.4rem 0.75rem',
              borderRadius: '8px',
              backgroundColor: 'var(--color-sage)',
              color: 'var(--color-olive-dark)',
              fontSize: '0.75rem',
              fontWeight: 600,
            }}
          >
            2–5 Players
          </div>
        </div>

        {/* Copy Link Input & Button */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          <input
            type="text"
            readOnly
            value={inviteUrl}
            className="input-text font-mono"
            style={{ fontSize: '0.8125rem', color: 'var(--color-charcoal)' }}
          />
          <button
            onClick={handleCopy}
            className={`btn ${copied ? 'btn-secondary' : 'btn-primary'} btn-sm`}
            style={{ padding: '0 1rem', display: 'flex', gap: '0.35rem' }}
          >
            {copied ? <Check size={16} color="green" /> : <Copy size={16} />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--color-gray)' }}>
          <Smartphone size={14} />
          <span>Interactive Prototype: Multiplayer is locally simulated</span>
        </div>
      </div>
    </div>
  );
};

