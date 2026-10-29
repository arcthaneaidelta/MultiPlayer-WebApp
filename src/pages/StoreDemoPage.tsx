import React, { useState } from 'react';
import {
  ShoppingBag,
  Check,
  Sparkles,
  Users,
  Clock,
  ShieldCheck,
  HelpCircle,
  ArrowRight,
  Mail,
  Zap,
} from 'lucide-react';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { CheckoutModal } from '../components/store/CheckoutModal';
import { EmailPreviewModal } from '../components/store/EmailPreviewModal';
import { CheckoutFormState, DemoOrder } from '../types/store';
import { StorageService } from '../services/storageService';
import { GameService } from '../services/gameService';

export const StoreDemoPage: React.FC = () => {
  const [checkoutTier, setCheckoutTier] = useState<'standard' | 'deluxe' | null>(null);
  const [completedOrder, setCompletedOrder] = useState<DemoOrder | null>(null);
  const [emailModalOpen, setEmailModalOpen] = useState(false);

  const handleOpenCheckout = (tier: 'standard' | 'deluxe') => {
    setCheckoutTier(tier);
  };

  const handleCompletePurchase = (form: CheckoutFormState) => {
    const roomCode = GameService.generateRoomCode();
    const orderNum = '#' + Math.floor(1090 + Math.random() * 50);
    const orderId = 'ORD-' + Math.floor(8930 + Math.random() * 900);
    const activationCode = 'QUEST-' + Math.floor(1000 + Math.random() * 9000) + '-Z' + Math.floor(10 + Math.random() * 89);

    // Create the dedicated game session linked to this order
    const session = GameService.createRoom(form.fullName + ' (Host)', 4, roomCode);
    session.orderRef = orderId;
    StorageService.saveCurrentSession(session);

    const newOrder: DemoOrder = {
      id: orderId,
      orderNumber: orderNum,
      productName: form.tier === 'deluxe'
        ? 'A Private QUESTROOM Experience (Deluxe Pack)'
        : 'A Private QUESTROOM Experience (Standard)',
      tierName: form.tier === 'deluxe' ? 'Deluxe Pack' : 'Standard Game Night',
      playerCapacity: 5,
      customerName: form.fullName,
      customerEmail: form.email,
      amount: form.tier === 'deluxe' ? 49.0 : 29.0,
      currency: 'USD',
      status: 'paid',
      createdAt: new Date().toISOString(),
      gameSessionId: session.id,
      roomCode,
      invitationUrl: `${window.location.origin}/#/invite/${roomCode}`,
      activationCode,
      notes: 'Auto-provisioned via simulated Shopify checkout',
    };

    StorageService.saveOrder(newOrder);
    setCheckoutTier(null);
    setCompletedOrder(newOrder);
    setEmailModalOpen(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--color-ivory)' }}>
      <Navbar />

      <main style={{ flex: 1, padding: '3.5rem 1rem 5rem' }}>
        <div className="container-custom" style={{ maxWidth: '960px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3rem' }}>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--color-amber-dark)',
              }}
            >
              Simulated Commercial Journey
            </span>
            <h1 className="font-serif" style={{ fontSize: 'clamp(2.1rem, 4vw, 2.85rem)', color: 'var(--color-charcoal)', marginTop: '0.35rem', marginBottom: '0.75rem' }}>
              Shopify Purchase Experience
            </h1>
            <p style={{ fontSize: '1.05rem', color: 'var(--color-gray)', lineHeight: 1.6 }}>
              Demonstrating how a commercial transaction on your storefront creates a unique multiplayer session and delivers immediate email invitations to the buyer.
            </p>
          </div>

          {/* Product Tier Selection Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
              marginBottom: '3rem',
            }}
          >
            {/* Standard Tier */}
            <div
              className="card-paper"
              style={{
                padding: '2.5rem',
                borderRadius: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div>
                <span className="badge badge-charcoal" style={{ marginBottom: '0.85rem' }}>
                  Standard Edition
                </span>
                <h3 className="font-serif" style={{ fontSize: '1.6rem', color: 'var(--color-charcoal)', marginBottom: '0.35rem' }}>
                  A Private QUESTROOM Experience
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-gray)', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                  Host a dedicated investigation room with up to 5 players. Ideal for remote team socials and dinner party game nights.
                </p>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem', marginBottom: '1.5rem' }}>
                  <span className="font-mono" style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-charcoal)' }}>
                    $29
                  </span>
                  <span style={{ fontSize: '0.875rem', color: 'var(--color-gray)' }}>one-time private room</span>
                </div>

                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.25rem', marginBottom: '1.75rem' }}>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-charcoal)', marginBottom: '0.75rem' }}>
                    What is included:
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem', color: '#444843' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Check size={16} color="var(--color-olive)" />
                      <span>Dedicated private game room for 2–5 players</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Check size={16} color="var(--color-olive)" />
                      <span>Instant invitation link & scannable QR code</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Check size={16} color="var(--color-olive)" />
                      <span>The complete 3-stage mystery: "The Missing Hour"</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Check size={16} color="var(--color-olive)" />
                      <span>Automated order confirmation email with access code</span>
                    </li>
                  </ul>
                </div>
              </div>

              <button
                onClick={() => handleOpenCheckout('standard')}
                className="btn btn-primary btn-lg"
                style={{ width: '100%', borderRadius: '14px', fontSize: '1rem' }}
              >
                <span>Purchase Demo ($29.00)</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Deluxe Tier */}
            <div
              className="card-paper"
              style={{
                padding: '2.5rem',
                borderRadius: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '2px solid var(--color-amber)',
                boxShadow: '0 12px 35px rgba(201, 155, 85, 0.2)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '2rem',
                  backgroundColor: 'var(--color-amber)',
                  color: '#161816',
                  padding: '0.2rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Popular Choice
              </div>

              <div>
                <span className="badge badge-amber" style={{ marginBottom: '0.85rem' }}>
                  Deluxe Game Night
                </span>
                <h3 className="font-serif" style={{ fontSize: '1.6rem', color: 'var(--color-charcoal)', marginBottom: '0.35rem' }}>
                  Deluxe Detective Package
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-gray)', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                  Everything in Standard plus unrestricted hints, customizable investigator character avatars, and digital certificates.
                </p>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem', marginBottom: '1.5rem' }}>
                  <span className="font-mono" style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-charcoal)' }}>
                    $49
                  </span>
                  <span style={{ fontSize: '0.875rem', color: 'var(--color-gray)' }}>all-inclusive party pack</span>
                </div>

                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.25rem', marginBottom: '1.75rem' }}>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-charcoal)', marginBottom: '0.75rem' }}>
                    What is included:
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem', color: '#444843' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Check size={16} color="var(--color-amber-dark)" />
                      <span>Dedicated private game room for 2–5 players</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Check size={16} color="var(--color-amber-dark)" />
                      <span>Zero-penalty progressive hint pack</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Check size={16} color="var(--color-amber-dark)" />
                      <span>Priority audio radio chatter transcripts</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Check size={16} color="var(--color-amber-dark)" />
                      <span>High-resolution commemorative case certificate PDF</span>
                    </li>
                  </ul>
                </div>
              </div>

              <button
                onClick={() => handleOpenCheckout('deluxe')}
                className="btn btn-amber btn-lg"
                style={{ width: '100%', borderRadius: '14px', fontSize: '1rem', fontWeight: 700 }}
              >
                <Sparkles size={18} />
                <span>Purchase Deluxe ($49.00)</span>
              </button>
            </div>
          </div>

          {/* Last Created Order Notice */}
          {completedOrder && (
            <div
              className="card-paper"
              style={{
                padding: '1.75rem',
                borderRadius: '18px',
                backgroundColor: 'var(--color-sage-light)',
                border: '1px solid var(--color-olive)',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
              }}
            >
              <div>
                <span className="badge badge-olive" style={{ marginBottom: '0.35rem' }}>
                  Latest Purchase: {completedOrder.orderNumber}
                </span>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-charcoal)' }}>
                  Room {completedOrder.roomCode} Ready for Play!
                </h4>
                <p style={{ fontSize: '0.8125rem', color: 'var(--color-gray)' }}>
                  Provisioned for {completedOrder.customerName} ({completedOrder.customerEmail}).
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => setEmailModalOpen(true)}
                  className="btn btn-secondary btn-sm"
                >
                  <Mail size={14} />
                  <span>View Email Preview</span>
                </button>

                <a
                  href={completedOrder.invitationUrl}
                  className="btn btn-primary btn-sm"
                >
                  <span>Open Room</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Checkout Modal */}
      {checkoutTier && (
        <CheckoutModal
          isOpen={true}
          tier={checkoutTier}
          onClose={() => setCheckoutTier(null)}
          onCompletePurchase={handleCompletePurchase}
        />
      )}

      {/* Order Confirmation Email Preview Modal */}
      <EmailPreviewModal
        isOpen={emailModalOpen}
        order={completedOrder}
        onClose={() => setEmailModalOpen(false)}
      />

      <Footer />
    </div>
  );
};

