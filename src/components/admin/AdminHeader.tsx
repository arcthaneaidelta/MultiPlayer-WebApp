import React from 'react';
import { ShieldCheck, Menu, Bell, Sparkles } from 'lucide-react';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  onToggleMobileMenu?: () => void;
  actions?: React.ReactNode;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  title,
  subtitle,
  onToggleMobileMenu,
  actions,
}) => {
  return (
    <header
      style={{
        padding: '1.25rem 1.75rem',
        borderBottom: '1px solid var(--color-border)',
        backgroundColor: '#FCFBF7',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            className="btn btn-secondary btn-sm"
            style={{ padding: '0.45rem', display: 'flex' }}
            aria-label="Toggle Menu"
          >
            <Menu size={18} />
          </button>
        )}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
            <h1 className="font-serif" style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--color-charcoal)' }}>
              {title}
            </h1>
            <span
              style={{
                fontSize: '0.6875rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                backgroundColor: 'rgba(201, 155, 85, 0.15)',
                color: 'var(--color-amber-dark)',
                padding: '0.15rem 0.5rem',
                borderRadius: '9999px',
                border: '1px solid rgba(201, 155, 85, 0.3)',
              }}
            >
              Demo Sandbox
            </span>
          </div>
          {subtitle && (
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-gray)', marginTop: '0.15rem' }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {actions}
      </div>
    </header>
  );
};

