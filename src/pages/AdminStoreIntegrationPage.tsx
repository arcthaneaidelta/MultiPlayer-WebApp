import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  KeyRound,
  Mail,
  Users,
  ExternalLink,
  Code2,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminHeader } from '../components/admin/AdminHeader';
import { StorageService } from '../services/storageService';

export const AdminStoreIntegrationPage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const orders = StorageService.getAllOrders();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8F6F0' }}>
      <AdminSidebar
        isMobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <AdminHeader
          title="Shopify Commercial Pipeline"
          subtitle="Architecture blueprint for secure e-commerce webhook ingestion and automated session provisioning."
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
          actions={
            <Link to="/store-demo" className="btn btn-primary btn-sm">
              <ShoppingBag size={14} />
              <span>Launch Store Demo</span>
            </Link>
          }
        />

        <main style={{ padding: '2rem 1.75rem', flex: 1 }}>
          {/* Simulation disclaimer banner */}
          <div
            style={{
              padding: '1rem 1.25rem',
              backgroundColor: 'var(--color-sage-light)',
              border: '1px solid var(--color-olive)',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '2rem',
            }}
          >
            <ShieldCheck size={20} color="var(--color-olive-dark)" style={{ flexShrink: 0 }} />
            <div style={{ fontSize: '0.85rem', color: 'var(--color-charcoal)' }}>
              <strong>Simulated Integration:</strong> No real Shopify API keys, webhooks, or credit card processors are attached to this demo. This panel illustrates the production architecture for your client proposal.
            </div>
          </div>

          {/* 7-Step Production Workflow Flowchart */}
          <div className="card-paper" style={{ padding: '2rem', borderRadius: '20px', marginBottom: '2rem' }}>
            <h3 className="font-serif" style={{ fontSize: '1.35rem', marginBottom: '0.35rem', color: 'var(--color-charcoal)' }}>
              End-to-End Purchase-to-Game Lifecycle
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-gray)', marginBottom: '1.75rem' }}>
              How a paid customer transaction in Shopify cleanly generates an isolated, persistent game room.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                {
                  step: 1,
                  title: '1. Customer Completes Checkout',
                  desc: 'Buyer purchases "A Private QUESTROOM Experience" on the Shopify storefront or headless checkout.',
                  tag: 'Shopify Storefront',
                },
                {
                  step: 2,
                  title: '2. HMAC-Signed Webhook Received',
                  desc: 'Shopify emits an `orders/paid` webhook event to our production backend API endpoint.',
                  tag: 'Webhook Payload',
                },
                {
                  step: 3,
                  title: '3. Webhook Signature Verification & Idempotency',
                  desc: 'Server verifies X-Shopify-Hmac-Sha256 and records the Shopify Order ID to ensure zero duplicate game creations.',
                  tag: 'Security Boundary',
                },
                {
                  step: 4,
                  title: '4. Dedicated Game Session Provisioned',
                  desc: 'The game service initializes a new room code, binds the purchaser as Host, and allocates player slots (2–5).',
                  tag: 'Game Engine',
                },
                {
                  step: 5,
                  title: '5. Cryptographic Invitation Token Generated',
                  desc: 'A tamper-proof invite link (e.g., https://game.app/#/invite/ROOM_CODE) is attached to the customer record.',
                  tag: 'Token Service',
                },
                {
                  step: 6,
                  title: '6. Order Confirmation Email Delivered',
                  desc: 'Transactional email provider (SendGrid/Postmark) sends the invitation link and QR code to the customer.',
                  tag: 'Email Service',
                },
                {
                  step: 7,
                  title: '7. Organizer Session Visibility',
                  desc: 'The new room appears automatically in the admin monitoring console with order reference linked.',
                  tag: 'Admin Suite',
                },
              ].map((item) => (
                <div
                  key={item.step}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    padding: '1rem 1.25rem',
                    borderRadius: '14px',
                    backgroundColor: 'var(--color-ivory)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-charcoal)',
                      color: '#FCFBF7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      flexShrink: 0,
                    }}
                  >
                    {item.step}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-charcoal)' }}>
                        {item.title}
                      </span>
                      <span className="badge badge-olive" style={{ fontSize: '0.65rem' }}>
                        {item.tag}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#565B52', lineHeight: 1.5 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders Linked Table */}
          <div className="card-paper" style={{ padding: '1.5rem', borderRadius: '18px' }}>
            <h3 className="font-serif" style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--color-charcoal)' }}>
              Simulated Customer Orders ({orders.length})
            </h3>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--color-border)', color: 'var(--color-gray)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                    <th style={{ padding: '0.75rem 1rem' }}>Order Ref</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Customer</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Tier</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Amount</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Linked Room</th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Invite Landing</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((ord) => (
                    <tr key={ord.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td style={{ padding: '0.85rem 1rem' }}>
                        <span className="font-mono" style={{ fontWeight: 700 }}>{ord.orderNumber}</span>
                        <div style={{ fontSize: '0.7rem', color: 'var(--color-gray)' }}>{ord.id}</div>
                      </td>
                      <td style={{ padding: '0.85rem 1rem' }}>
                        <div style={{ fontWeight: 600 }}>{ord.customerName}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-gray)' }}>{ord.customerEmail}</div>
                      </td>
                      <td style={{ padding: '0.85rem 1rem', fontSize: '0.8rem' }}>
                        {ord.tierName}
                      </td>
                      <td style={{ padding: '0.85rem 1rem', fontWeight: 700 }} className="font-mono">
                        ${ord.amount.toFixed(2)}
                      </td>
                      <td style={{ padding: '0.85rem 1rem' }}>
                        <span className="badge badge-amber">{ord.roomCode}</span>
                      </td>
                      <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                        <Link
                          to={`/invite/${ord.roomCode}`}
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '0.3rem 0.65rem', fontSize: '0.75rem' }}
                        >
                          <span>Open Invite</span>
                          <ExternalLink size={12} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

