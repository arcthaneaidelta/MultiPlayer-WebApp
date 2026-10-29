import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Eye,
  Clock,
  Sparkles,
  Activity,
  Plus,
} from 'lucide-react';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminHeader } from '../components/admin/AdminHeader';
import { SessionDetailDrawer } from '../components/admin/SessionDetailDrawer';
import { GameSession } from '../types/session';
import { StorageService } from '../services/storageService';

export const AdminSessionsPage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [selectedSession, setSelectedSession] = useState<GameSession | null>(null);

  const [sessions, setSessions] = useState<GameSession[]>(() => StorageService.getAllSessions());

  const filtered = sessions.filter((s) => {
    const matchesStatus = filterStatus === 'all' || s.status === filterStatus;
    const matchesSearch =
      s.roomCode.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase()) ||
      s.gameTitle.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleSimulateEvent = (sessionId: string) => {
    const updated = sessions.map((s) => {
      if (s.id === sessionId) {
        const newEv = {
          id: 'ev-' + Date.now(),
          sessionId: s.id,
          type: 'answer_submitted' as const,
          timestamp: new Date().toISOString(),
          message: 'Simulated squad lead submitted a partial coordinate attempt.',
        };
        return {
          ...s,
          activityEvents: [newEv, ...s.activityEvents],
        };
      }
      return s;
    });
    setSessions(updated);
    StorageService.saveAllSessions(updated);
    const updatedSelected = updated.find((x) => x.id === sessionId);
    if (updatedSelected) setSelectedSession(updatedSelected);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8F6F0' }}>
      <AdminSidebar
        isMobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <AdminHeader
          title="Session Monitoring"
          subtitle="Real-time telemetry and state inspection for active and historical multiplayer rooms."
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        />

        <main style={{ padding: '2rem 1.75rem', flex: 1 }}>
          {/* Filters & Search Toolbar */}
          <div
            className="card-paper"
            style={{
              padding: '1.25rem 1.5rem',
              borderRadius: '16px',
              marginBottom: '1.75rem',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
            }}
          >
            {/* Status Filter Tabs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {[
                { id: 'all', label: 'All Sessions' },
                { id: 'in_progress', label: 'In Progress' },
                { id: 'waiting', label: 'Waiting Lobby' },
                { id: 'completed', label: 'Completed' },
                { id: 'abandoned', label: 'Abandoned' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilterStatus(tab.id)}
                  style={{
                    padding: '0.45rem 0.85rem',
                    borderRadius: '8px',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    backgroundColor: filterStatus === tab.id ? 'var(--color-charcoal)' : 'var(--color-ivory)',
                    color: filterStatus === tab.id ? '#FCFBF7' : 'var(--color-gray)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div style={{ position: 'relative', width: '240px' }}>
              <input
                type="text"
                placeholder="Search by code or ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-text"
                style={{ minHeight: '38px', fontSize: '0.8125rem', paddingLeft: '2rem' }}
              />
              <Search size={14} color="var(--color-gray)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          {/* Sessions List Table */}
          <div className="card-paper" style={{ padding: '1.5rem', borderRadius: '18px' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--color-border)', color: 'var(--color-gray)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <th style={{ padding: '0.75rem 1rem' }}>Room Code</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Session ID</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Status</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Players</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Progress</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Score</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Started</th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={8} style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--color-gray)' }}>
                        No sessions found matching this filter criteria.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((s) => (
                      <tr
                        key={s.id}
                        style={{
                          borderBottom: '1px solid var(--color-border)',
                          cursor: 'pointer',
                        }}
                        onClick={() => setSelectedSession(s)}
                      >
                        <td style={{ padding: '0.85rem 1rem' }}>
                          <span className="font-mono" style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--color-charcoal)' }}>
                            {s.roomCode}
                          </span>
                        </td>
                        <td style={{ padding: '0.85rem 1rem', color: 'var(--color-gray)', fontSize: '0.8rem' }} className="font-mono">
                          {s.id}
                        </td>
                        <td style={{ padding: '0.85rem 1rem' }}>
                          <span
                            className={`badge ${
                              s.status === 'completed'
                                ? 'badge-olive'
                                : s.status === 'in_progress'
                                ? 'badge-amber'
                                : 'badge-charcoal'
                            }`}
                            style={{ fontSize: '0.7rem' }}
                          >
                            {s.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td style={{ padding: '0.85rem 1rem' }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                            <Users size={14} color="var(--color-olive)" />
                            <span>{s.players.length}/5</span>
                          </span>
                        </td>
                        <td style={{ padding: '0.85rem 1rem' }}>
                          Stage {s.currentStageIndex + 1} of {s.totalStages}
                        </td>
                        <td style={{ padding: '0.85rem 1rem', fontWeight: 700 }} className="font-mono">
                          {s.score > 0 ? s.score : '—'}
                        </td>
                        <td style={{ padding: '0.85rem 1rem', color: 'var(--color-gray)', fontSize: '0.775rem' }}>
                          {new Date(s.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedSession(s);
                            }}
                            className="btn btn-secondary btn-sm"
                            style={{ padding: '0.3rem 0.65rem', fontSize: '0.75rem' }}
                          >
                            <Eye size={13} />
                            <span>Inspect</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      <SessionDetailDrawer
        session={selectedSession}
        onClose={() => setSelectedSession(null)}
        onTriggerSimulatedEvent={handleSimulateEvent}
      />
    </div>
  );
};

