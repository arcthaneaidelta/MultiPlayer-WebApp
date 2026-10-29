import React, { useState } from 'react';
import { X, CreditCard, ShieldCheck, Lock, ShoppingBag, Check } from 'lucide-react';
import { DemoOrder, CheckoutFormState } from '../../types/store';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  tier: 'standard' | 'deluxe';
  onCompletePurchase: (formData: CheckoutFormState) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  tier,
  onCompletePurchase,
}) => {
  const [formData, setFormData] = useState<CheckoutFormState>({
    fullName: 'Detective Jordan',
    email: 'jordan.investigates@example.com',
    tier,
    cardNumber: '4242 •••• •••• 4242',
    expiry: '12/28',
    cvv: '883',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const price = formData.tier === 'deluxe' ? 49.0 : 29.0;
  const productName = formData.tier === 'deluxe'
    ? 'A Private QUESTROOM Experience (Deluxe Pack)'
    : 'A Private QUESTROOM Experience (Standard)';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim()) {
      setError('Please provide your name and email to receive the invitation link.');
      return;
    }

    setIsProcessing(true);
    setError(null);

    // Simulate swift payment gateway authorization
    setTimeout(() => {
      setIsProcessing(false);
      onCompletePurchase(formData);
    }, 700);
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
          maxWidth: '520px',
          padding: '2.25rem',
          position: 'relative',
          borderRadius: '24px',
          animation: 'fadeIn 0.25s ease',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3)',
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
          aria-label="Close Checkout Modal"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              backgroundColor: 'var(--color-sage-light)',
              color: 'var(--color-olive-dark)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ShoppingBag size={22} />
          </div>
          <div>
            <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--color-amber-dark)', fontWeight: 700, letterSpacing: '0.06em' }}>
              Simulated Shopify Checkout
            </span>
            <h2 className="font-serif" style={{ fontSize: '1.45rem', fontWeight: 700, lineHeight: 1.2 }}>
              Secure Order Confirmation
            </h2>
          </div>
        </div>

        {/* Order Summary Box */}
        <div
          style={{
            backgroundColor: 'var(--color-ivory)',
            border: '1px solid var(--color-border)',
            borderRadius: '14px',
            padding: '1rem 1.25rem',
            marginBottom: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
            <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{productName}</span>
            <span className="font-mono" style={{ fontWeight: 700, fontSize: '1.15rem', color: 'var(--color-charcoal)' }}>
              ${price.toFixed(2)}
            </span>
          </div>
          <div style={{ fontSize: '0.775rem', color: 'var(--color-gray)' }}>
            Includes dedicated game room session, up to 5 player phone invites, and automatic room provisioning.
          </div>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {error && (
            <div style={{ padding: '0.65rem 0.85rem', borderRadius: '8px', backgroundColor: 'var(--color-error-bg)', color: 'var(--color-error)', fontSize: '0.8125rem' }}>
              {error}
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              Customer Full Name
            </label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="input-text"
              placeholder="e.g. Jordan Hayes"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              Email Address (For Invitation Delivery)
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="input-text"
              placeholder="jordan@example.com"
            />
          </div>

          {/* Simulated Card Info */}
          <div style={{ backgroundColor: '#F8F6F0', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '0.85rem 1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-gray)' }}>
                Demo Payment Method
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: 'var(--color-olive-dark)' }}>
                <Lock size={12} />
                <span>Sandbox Mode (No Real Charge)</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <div style={{ flex: 2, position: 'relative' }}>
                <input
                  type="text"
                  readOnly
                  value={formData.cardNumber}
                  className="input-text"
                  style={{ backgroundColor: '#FFFFFF', fontSize: '0.85rem' }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <input
                  type="text"
                  readOnly
                  value={formData.expiry}
                  className="input-text"
                  style={{ backgroundColor: '#FFFFFF', fontSize: '0.85rem' }}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="btn btn-primary btn-lg"
            style={{ width: '100%', borderRadius: '14px', marginTop: '0.5rem' }}
          >
            {isProcessing ? (
              <span>Authorizing Demo Payment...</span>
            ) : (
              <>
                <ShieldCheck size={18} />
                <span>Complete Demo Purchase (${price.toFixed(2)})</span>
              </>
            )}
          </button>
        </form>

        <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.725rem', color: 'var(--color-gray)' }}>
          Simulation Boundary: Generates an automatic game session ID and order confirmation email preview.
        </div>
      </div>
    </div>
  );
};

