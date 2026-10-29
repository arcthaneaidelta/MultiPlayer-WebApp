import React, { useState } from 'react';
import {
  Settings,
  RotateCcw,
  CheckCircle2,
  Sliders,
  Globe,
  Users,
  Clock,
  ShieldAlert,
} from 'lucide-react';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminHeader } from '../components/admin/AdminHeader';
import { StorageService } from '../services/storageService';

export const AdminSettingsPage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminName, setAdminName] = useState('Lead Administrator');
  const [defaultDuration, setDefaultDuration] = useState(75);
  const [defaultPlayers, setDefaultPlayers] = useState(4);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleResetAllData = () => {
    if (window.confirm('WARNING: Reset all demo data (customized stages, created sessions, simulated orders) to factory defaults?')) {
      StorageService.resetAllDemoData();
      window.location.href = '/#/';
      window.location.reload();
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8F6F0' }}>
      <AdminSidebar
        isMobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <AdminHeader
          title="Platform & Demo Settings"
          subtitle="Configure default timers, localization rules, and local storage state persistence."
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        />

        <main style={{ padding: '2rem 1.75rem', flex: 1, maxWidth: '780px' }}>
          {saved && (
            <div
              style={{
                padding: '0.85rem 1.25rem',
                borderRadius: '12px',
                backgroundColor: 'var(--color-success-bg)',
                color: 'var(--color-success)',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <CheckCircle2 size={18} />
              <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Preferences successfully saved!</span>
            </div>
          )}

          <form onSubmit={handleSave} className="card-paper" style={{ padding: '2rem', borderRadius: '20px', marginBottom: '2rem' }}>
            <h3 className="font-serif" style={{ fontSize: '1.3rem', marginBottom: '1.25rem', color: 'var(--color-charcoal)' }}>
              Operator Configuration
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.75rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  Operator Display Name
                </label>
                <input
                  type="text"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  className="input-text"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  Platform Interface Language
                </label>
                <select className="input-text" disabled style={{ backgroundColor: 'var(--color-ivory)', cursor: 'not-allowed' }}>
                  <option value="en">English (United States) — Standard</option>
                </select>
                <span style={{ fontSize: '0.725rem', color: 'var(--color-gray)', marginTop: '0.25rem', display: 'block' }}>
                  Demo language is fixed to English per PRD specifications.
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                    Default Stage Countdown (Sec)
                  </label>
                  <input
                    type="number"
                    min={30}
                    max={300}
                    value={defaultDuration}
                    onChange={(e) => setDefaultDuration(parseInt(e.target.value) || 75)}
                    className="input-text font-mono"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                    Default Squad Capacity
                  </label>
                  <select
                    value={defaultPlayers}
                    onChange={(e) => setDefaultPlayers(parseInt(e.target.value))}
                    className="input-text"
                  >
                    <option value={2}>2 Players (Minimum)</option>
                    <option value={3}>3 Players</option>
                    <option value={4}>4 Players (Default)</option>
                    <option value={5}>5 Players (Maximum)</option>
                  </select>
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              <span>Save Preferences</span>
            </button>
          </form>

          {/* Danger Zone: Reset All Demo Data */}
          <div
            className="card-paper"
            style={{
              padding: '2rem',
              borderRadius: '20px',
              border: '1px solid var(--color-error)',
              backgroundColor: '#FFFBFB',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <ShieldAlert size={20} color="var(--color-error)" />
              <h3 className="font-serif" style={{ fontSize: '1.25rem', color: 'var(--color-error)' }}>
                Reset Demo Sandbox
              </h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#6E6B65', lineHeight: 1.5, marginBottom: '1.25rem' }}>
              Erase all edited stages, player clues, custom simulated orders, and historical session logs from browser local storage and restore original default mystery data.
            </p>

            <button
              type="button"
              onClick={handleResetAllData}
              className="btn btn-danger"
              style={{ borderRadius: '10px' }}
            >
              <RotateCcw size={16} />
              <span>Reset Entire Application State</span>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

