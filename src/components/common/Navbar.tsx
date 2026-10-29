import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, Shield, ShoppingBag, Play, Menu, X, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Dark navigation for the immersive game screens
  const isGameRoute = location.pathname.startsWith('/play/game') || location.pathname.startsWith('/play/lobby');

  const navLinks = [
    { label: 'The Experience', path: '/' },
    { label: 'Play Mystery', path: '/play' },
    { label: 'Admin Dashboard', path: '/admin' },
    { label: 'Store Journey', path: '/store-demo' },
  ];

  return (
    <header
      style={{
        backgroundColor: isGameRoute ? '#141715' : 'rgba(252, 251, 247, 0.94)',
        backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${isGameRoute ? '#262B28' : 'var(--color-border)'}`,
        color: isGameRoute ? '#F5F2EA' : 'var(--color-charcoal)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        className="container-custom"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '68px',
        }}
      >
        {/* Brand */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: isGameRoute ? '#C99B55' : 'var(--color-charcoal)',
              color: isGameRoute ? '#141715' : '#FCFBF7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '1.05rem',
              letterSpacing: '0.05em',
            }}
          >
            Q
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              className="font-serif"
              style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                lineHeight: 1.1,
              }}
            >
              QUESTROOM
            </span>
            <span
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: isGameRoute ? '#A8AC9E' : 'var(--color-gray)',
                fontWeight: 600,
              }}
            >
              Interactive Multiplayer
            </span>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '1.75rem',
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  fontSize: '0.9375rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive
                    ? isGameRoute
                      ? '#E0BA7A'
                      : 'var(--color-charcoal)'
                    : isGameRoute
                    ? '#A8AC9E'
                    : 'var(--color-gray)',
                  transition: 'color 0.2s',
                  position: 'relative',
                  padding: '0.25rem 0',
                }}
              >
                {link.label}
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '-4px',
                      left: 0,
                      right: 0,
                      height: '2px',
                      backgroundColor: isGameRoute ? '#C99B55' : 'var(--color-charcoal)',
                      borderRadius: '2px',
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Link
            to="/play"
            className={`btn ${isGameRoute ? 'btn-amber' : 'btn-primary'} btn-sm`}
            style={{ borderRadius: '9999px', padding: '0.55rem 1.15rem' }}
          >
            <Play size={15} fill="currentColor" />
            <span>Play Demo</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              backgroundColor: isGameRoute ? '#222624' : '#EFECE2',
              color: 'inherit',
            }}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            borderTop: `1px solid ${isGameRoute ? '#282E2A' : 'var(--color-border)'}`,
            backgroundColor: isGameRoute ? '#171B18' : '#FCFBF7',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: '1.05rem',
                fontWeight: 600,
                padding: '0.5rem 0',
                color: isGameRoute ? '#F5F2EA' : 'var(--color-charcoal)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}
            >
              {link.path === '/' && <Compass size={18} color="#C99B55" />}
              {link.path === '/play' && <Sparkles size={18} color="#C99B55" />}
              {link.path === '/admin' && <Shield size={18} color="#727B61" />}
              {link.path === '/store-demo' && <ShoppingBag size={18} color="#C99B55" />}
              {link.label}
            </Link>
          ))}
        </div>
      )}

      {/* CSS Helper for Responsive Nav */}
      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </header>
  );
};

