import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Mail, Copy, Check, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import { DemoOrder } from '../../types/store';

interface EmailPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: DemoOrder | null;
}

export const EmailPreviewModal: React.FC<EmailPreviewModalProps> = ({
  isOpen,
  onClose,
  order,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !order) return null;

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(order.invitationUrl);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(20, 23, 21, 0.75)',
        backdropFilter: 'blur(6px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem',
      }}
      onClick={onClose}
    >
      <div
        className="card-paper"
        style={{
          width: '100%',
          maxWidth: '560px',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
          borderRadius: '24px',
          padding: 0,
          animation: 'fadeIn 0.25s ease',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Email Client Top Bar */}
        <div
          style={{
            backgroundColor: '#1E211F',
            color: '#E4E7DF',
            padding: '1rem 1.5rem',
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Mail size={18} color="#C99B55" />
            <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>
              Order Confirmation Email Preview
            </span>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', color: '#9DA298', padding: '0.2rem' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Email Header Metadata */}
        <div
          style={{
            padding: '1rem 1.5rem',
            borderBottom: '1px solid var(--color-border)',
            backgroundColor: '#F8F6F0',
            fontSize: '0.8125rem',
            lineHeight: 1.6,
          }}
        >
          <div><strong>From:</strong> orders@questroom.experience</div>
          <div><strong>To:</strong> {order.customerEmail}</div>
          <div><strong>Subject:</strong> Your QUESTROOM Experience Access Code ({order.orderNumber})</div>
        </div>

        {/* Email Body (Card Layout from Image 5) */}
        <div style={{ padding: '2rem 1.75rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '16px',
                backgroundColor: 'var(--color-sage-light)',
                color: 'var(--color-olive-dark)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 0.75rem',
              }}
            >
              <CheckCircle2 size={26} />
            </div>
            <h2 className="font-serif" style={{ fontSize: '1.6rem', color: 'var(--color-charcoal)', marginBottom: '0.35rem' }}>
              Thank you for your purchase!
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-gray)' }}>
              You now have access to a private QUESTROOM session. Below is your personal invite code and direct lobby link.
            </p>
          </div>

          {/* Product & Access Type Badge (Inspired by Image 5) */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.85rem 1.25rem',
              backgroundColor: 'var(--color-ivory)',
              border: '1px solid var(--color-border)',
              borderRadius: '12px',
              marginBottom: '1.25rem',
            }}
          >
            <div>
              <span style={{ fontSize: '0.6875rem', textTransform: 'uppercase', color: 'var(--color-gray)', fontWeight: 700, letterSpacing: '0.05em' }}>
                EXPERIENCE
              </span>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-charcoal)' }}>
                {order.productName}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.6875rem', textTransform: 'uppercase', color: 'var(--color-gray)', fontWeight: 700, letterSpacing: '0.05em' }}>
                ACCESS TYPE
              </span>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-olive-dark)' }}>
                Private Group (2–5)
              </div>
            </div>
          </div>

          {/* Large Invite Code Box (Inspired by Image 5) */}
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-gray)', fontWeight: 700, letterSpacing: '0.08em' }}>
              YOUR INVITE CODE
            </span>
            <div
              className="font-mono"
              style={{
                fontSize: '1.85rem',
                fontWeight: 800,
                letterSpacing: '0.14em',
                color: 'var(--color-olive-dark)',
                backgroundColor: 'var(--color-sage-light)',
                border: '2px dashed var(--color-olive)',
                borderRadius: '16px',
                padding: '0.85rem 1.5rem',
                marginTop: '0.35rem',
              }}
            >
              {order.activationCode}
            </div>
          </div>

          {/* How to activate steps */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--color-charcoal)' }}>
              How to launch your game:
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8125rem', color: '#444843' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <span style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: 'var(--color-sage)', color: 'var(--color-olive-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.75rem' }}>1</span>
                <span>Click the button below or share the invite link with your 2–5 players.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <span style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: 'var(--color-sage)', color: 'var(--color-olive-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.75rem' }}>2</span>
                <span>Each player enters on their phone and connects to Room <strong>{order.roomCode}</strong>.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <span style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: 'var(--color-sage)', color: 'var(--color-olive-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.75rem' }}>3</span>
                <span>Once everyone hits Ready in the lobby, the investigation unlocks!</span>
              </div>
            </div>
          </div>

          {/* Buttons: Open Game & Copy Link */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <Link
              to={`/invite/${order.roomCode}`}
              onClick={onClose}
              className="btn btn-primary btn-lg"
              style={{ width: '100%', borderRadius: '14px', fontSize: '1rem' }}
            >
              <span>Open the Platform & Enter Lobby</span>
              <ExternalLink size={16} />
            </Link>

            <button
              onClick={handleCopyLink}
              className="btn btn-secondary"
              style={{ width: '100%', borderRadius: '12px' }}
            >
              {copied ? <Check size={16} color="green" /> : <Copy size={16} />}
              <span>{copied ? 'Invite Link Copied!' : 'Copy Invitation Link'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

