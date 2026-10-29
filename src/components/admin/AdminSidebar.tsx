import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Gamepad2,
  Users,
  BarChart3,
  ShoppingBag,
  Settings,
  LogOut,
  ExternalLink,
  Shield,
  Layers,
} from 'lucide-react';
import { StorageService } from '../../services/storageService';

interface AdminSidebarProps {
  onSignOut?: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  onSignOut,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const location = useLocation();

  const handleSignOut = () => {
    StorageService.setAdminAuthenticated(false);
    if (onSignOut) {
      onSignOut();
    } else {
      window.location.href = '/#/admin/login';
    }
  };

  const navItems = [
    { label: 'Overview', path: '/admin', icon: LayoutDashboard },
    { label: 'Game Management', path: '/admin/games', icon: Gamepad2 },
    { label: 'Session Monitor', path: '/admin/sessions', icon: Users },
    { label: 'Reports & Export', path: '/admin/reports', icon: BarChart3 },
    { label: 'Shopify Integration', path: '/admin/store-integration', icon: ShoppingBag },
    { label: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <aside
      style={{
        width: '260px',
        backgroundColor: '#FCFBF7',
        borderRight: '1px solid var(--color-border)',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        flexShrink: 0,
      }}
      className={`admin-sidebar ${isMobileOpen ? 'mobile-open' : ''}`}
    >
      {/* Brand Header */}
      <div
        style={{
          padding: '1.5rem',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
        }}
      >
        <div
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '9px',
            backgroundColor: 'var(--color-charcoal)',
            color: '#FCFBF7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '1rem',
          }}
        >
          Q
        </div>
        <div>
          <div className="font-serif" style={{ fontSize: '1.15rem', fontWeight: 700, lineHeight: 1.1 }}>
            QUESTROOM
          </div>
          <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--color-gray)', fontWeight: 600, letterSpacing: '0.06em' }}>
            Operations Suite
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <nav style={{ padding: '1.25rem 0.85rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', flex: 1 }}>
        <div style={{ fontSize: '0.6875rem', textTransform: 'uppercase', color: 'var(--color-gray)', fontWeight: 700, letterSpacing: '0.07em', padding: '0 0.65rem 0.5rem' }}>
          Platform Management
        </div>

        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
          const IconComponent = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onCloseMobile}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.65rem 0.85rem',
                borderRadius: '10px',
                fontSize: '0.875rem',
                fontWeight: isActive ? 600 : 500,
                color: isActive ? 'var(--color-charcoal)' : 'var(--color-gray)',
                backgroundColor: isActive ? 'var(--color-sage-light)' : 'transparent',
                borderLeft: isActive ? '3px solid var(--color-olive)' : '3px solid transparent',
                transition: 'all 0.15s ease',
              }}
            >
              <IconComponent size={18} color={isActive ? 'var(--color-olive-dark)' : 'var(--color-gray)'} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Admin User & Sign Out Footer */}
      <div
        style={{
          padding: '1.25rem',
          borderTop: '1px solid var(--color-border)',
          backgroundColor: '#F7F4EC',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-charcoal)',
              color: '#F5F2EA',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.85rem',
            }}
          >
            AD
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-charcoal)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              Lead Administrator
            </div>
            <div style={{ fontSize: '0.725rem', color: 'var(--color-gray)' }}>
              admin@questroom.demo
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Link
            to="/play"
            className="btn btn-secondary btn-sm"
            style={{ flex: 1, padding: '0.4rem', fontSize: '0.75rem', justifyContent: 'center' }}
            title="Preview Game"
          >
            <ExternalLink size={13} />
            <span>Game Preview</span>
          </Link>
          <button
            onClick={handleSignOut}
            className="btn btn-secondary btn-sm"
            style={{ padding: '0.4rem 0.65rem', fontSize: '0.75rem', color: 'var(--color-error)' }}
            title="Sign Out"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
};

