import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Gamepad2,
  Users,
  CheckCircle2,
  Clock,
  TrendingUp,
  BarChart3,
  ExternalLink,
  Eye,
  Plus,
  RefreshCw,
  Search,
} from 'lucide-react';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminHeader } from '../components/admin/AdminHeader';
import { StatCard } from '../components/admin/StatCard';
import { ActivityChart } from '../components/admin/ActivityChart';
import { SessionDetailDrawer } from '../components/admin/SessionDetailDrawer';
import { GameSession } from '../types/session';
import { StorageService } from '../services/storageService';

export const AdminDashboardPage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<GameSession | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const sessions = StorageService.getAllSessions();
  const game = StorageService.getGame();

  const filteredSessions = sessions.filter(
    (s) =>
      s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.roomCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.gameTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8F6F0' }}>
      {/* Sidebar */}
      <AdminSidebar
        isMobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <AdminHeader
          title="Executive Overview"
          subtitle="Real-time telemetry and game session metrics across the platform."
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
          actions={
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Link to="/admin/games/game-missing-hour" className="btn btn-amber btn-sm">
                <span>Edit "The Missing Hour"</span>
              </Link>
            </div>
          }
        />

        <main style={{ padding: '2rem 1.75rem', flex: 1 }}>
          {/* Key Metric Stat Cards (Inspired by Image 4) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
              gap: '1.25rem',
              marginBottom: '2rem',
            }}
          >
            <StatCard
              title="Active Game Titles"
              value="4 Games"
              changePercent={12.5}
              icon={Gamepad2}
              iconColor="var(--color-olive)"
            />
            <StatCard
              title="Sessions Initiated"
              value="1,847"
              changePercent={8.2}
              icon={Users}
              iconColor="var(--color-amber-dark)"
            />
            <StatCard
              title="Completed Clears"
              value="1,492"
              changePercent={5.3}
              icon={CheckCircle2}
              iconColor="var(--color-success)"
            />
            <StatCard
              title="Average Completion Time"
              value="11.4 min"
              changePercent={-3.1}
              changeLabel="faster vs last week"
              icon={Clock}
              iconColor="var(--color-olive-dark)"
            />
          </div>

          {/* Activity Curves & Stage Success Bars */}
          <ActivityChart />

          {/* Recent Sessions Table */}
          <div className="card-paper" style={{ padding: '1.5rem', borderRadius: '18px' }}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                marginBottom: '1.25rem',
              }}
            >
              <div>
                <h3 className="font-serif" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-charcoal)' }}>
                  Live & Recent Game Sessions
                </h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-gray)' }}>
                  Inspect real participant logs, submitted answers, and timestamps.
                </span>
              </div>

              {/* Search input */}
              <div style={{ position: 'relative', width: '220px' }}>
                <input
                  type="text"
                  placeholder="Filter sessions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-text"
                  style={{ minHeight: '36px', fontSize: '0.8125rem', paddingLeft: '2rem' }}
                />
                <Search size={14} color="var(--color-gray)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            {/* Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--color-border)', color: 'var(--color-gray)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <th style={{ padding: '0.75rem 1rem' }}>Room / ID</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Game Title</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Players</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Status</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Current Stage</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Score</th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSessions.length === 0 ? (
                    <tr>
                      <td colSpan={7} style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-gray)' }}>
                        No sessions match the current search.
                      </td>
                    </tr>
                  ) : (
                    filteredSessions.map((s) => (
                      <tr
                        key={s.id}
                        style={{
                          borderBottom: '1px solid var(--color-border)',
                          cursor: 'pointer',
                          transition: 'background-color 0.15s',
                        }}
                        onClick={() => setSelectedSession(s)}
                      >
                        <td style={{ padding: '0.85rem 1rem' }}>
                          <span className="font-mono" style={{ fontWeight: 700, color: 'var(--color-charcoal)' }}>
                            {s.roomCode}
                          </span>
                          <div style={{ fontSize: '0.725rem', color: 'var(--color-gray)' }}>{s.id}</div>
                        </td>
                        <td style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>
                          {s.gameTitle}
                        </td>
                        <td style={{ padding: '0.85rem 1rem' }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                            <Users size={14} color="var(--color-olive)" />
                            <span>{s.players.length}/5</span>
                          </span>
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
                            style={{ fontSize: '0.675rem' }}
                          >
                            {s.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td style={{ padding: '0.85rem 1rem' }}>
                          Stage {s.currentStageIndex + 1} of {s.totalStages}
                        </td>
                        <td style={{ padding: '0.85rem 1rem', fontWeight: 700 }} className="font-mono">
                          {s.score > 0 ? s.score : '—'}
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

      {/* Session Detail Drawer */}
      <SessionDetailDrawer
        session={selectedSession}
        onClose={() => setSelectedSession(null)}
      />
    </div>
  );
};

