import React from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw, Shield, Sparkles, Smartphone, ArrowUpRight } from 'lucide-react';
import { StorageService } from '../../services/storageService';

export const Footer: React.FC = () => {
  const handleReset = () => {
    if (window.confirm('Reset all demo sessions, orders, and game modifications back to pristine initial state?')) {
      StorageService.resetAllDemoData();
      window.location.href = '/#/';
      window.location.reload();
    }
  };

  return (
    <footer
      style={{
        backgroundColor: '#1E211F',
        color: '#E4E7DF',
        borderTop: '1px solid #2F3330',
        paddingTop: '3.5rem',
        paddingBottom: '3.5rem',
        marginTop: 'auto',
      }}
    >
      <div className="container-custom">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2.5rem',
            marginBottom: '3rem',
          }}
        >
          {/* Brand Col */}
          <div style={{ maxWidth: '340px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: '#C99B55',
                  color: '#141715',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                }}
              >
                Q
              </div>
              <span className="font-serif" style={{ fontSize: '1.2rem', fontWeight: 700, letterSpacing: '0.04em' }}>
                QUESTROOM
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', color: '#9DA298', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              High-fidelity prototype demonstration of a custom multiplayer stage-based game night platform. Designed for 2–5 players on phones, tablets, and desktop.
            </p>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontSize: '0.75rem',
                color: '#C99B55',
                backgroundColor: 'rgba(201, 155, 85, 0.12)',
                padding: '0.35rem 0.75rem',
                borderRadius: '9999px',
                border: '1px solid rgba(201, 155, 85, 0.25)',
              }}
            >
              <Smartphone size={14} />
              <span>Mobile-First Responsive Prototype</span>
            </div>
          </div>

          {/* Nav Quick Links */}
          <div>
            <h4
              style={{
                fontSize: '0.8125rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#C99B55',
                marginBottom: '1rem',
              }}
            >
              Interactive Experiences
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li>
                <Link to="/play" style={{ color: '#D2D6CC', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Sparkles size={14} color="#C99B55" />
                  <span>Launch Mystery ("The Missing Hour")</span>
                </Link>
              </li>
              <li>
                <Link to="/play/lobby" style={{ color: '#D2D6CC', fontSize: '0.875rem' }}>
                  Multiplayer Lobby Preview
                </Link>
              </li>
              <li>
                <Link to="/store-demo" style={{ color: '#D2D6CC', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span>Shopify Purchase Journey Demo</span>
                  <ArrowUpRight size={13} color="#9DA298" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Admin & Operations */}
          <div>
            <h4
              style={{
                fontSize: '0.8125rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#C99B55',
                marginBottom: '1rem',
              }}
            >
              Operator Preview
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li>
                <Link to="/admin" style={{ color: '#D2D6CC', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Shield size={14} color="#727B61" />
                  <span>Admin Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/games/game-missing-hour" style={{ color: '#D2D6CC', fontSize: '0.875rem' }}>
                  Interactive Game & Clue Editor
                </Link>
              </li>
              <li>
                <Link to="/admin/sessions" style={{ color: '#D2D6CC', fontSize: '0.875rem' }}>
                  Live Session Monitor & Timeline
                </Link>
              </li>
              <li>
                <Link to="/admin/reports" style={{ color: '#D2D6CC', fontSize: '0.875rem' }}>
                  Reports & Real CSV Export
                </Link>
              </li>
            </ul>
          </div>

          {/* Developer / Demo Controls */}
          <div>
            <h4
              style={{
                fontSize: '0.8125rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#C99B55',
                marginBottom: '1rem',
              }}
            >
              Demo Maintenance
            </h4>
            <p style={{ fontSize: '0.8125rem', color: '#9DA298', lineHeight: 1.5, marginBottom: '1rem' }}>
              All game progress, edited stages, orders, and sessions are safely saved in browser storage.
            </p>
            <button
              onClick={handleReset}
              className="btn btn-secondary btn-sm"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: '#E4E7DF',
                borderColor: '#3C423E',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <RefreshCw size={14} />
              <span>Reset Demo State</span>
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid #2F3330',
            paddingTop: '1.75rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.8125rem',
            color: '#848880',
          }}
        >
          <div>
            © 2026 QUESTROOM Concept Prototype. Multi-stage asynchronous simulation architecture.
          </div>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <span>Target Deployment: Hatchable</span>
            <span>Zero External API Dependency</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

