import React, { useState } from 'react';
import {
  BarChart3,
  Download,
  Calendar,
  Filter,
  CheckCircle2,
  FileSpreadsheet,
  TrendingUp,
  Clock,
  HelpCircle,
  Award,
} from 'lucide-react';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminHeader } from '../components/admin/AdminHeader';
import { StorageService } from '../services/storageService';
import { CsvExportService } from '../services/csvExportService';

export const AdminReportsPage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState<'7d' | '30d' | '90d' | 'all'>('30d');
  const [exportFeedback, setExportFeedback] = useState<string | null>(null);

  const sessions = StorageService.getAllSessions();

  const handleExportCsv = () => {
    const filename = `questroom-telemetry-report-${dateFilter}-${new Date().toISOString().slice(0, 10)}.csv`;
    const res = CsvExportService.exportSessionsToCsv(sessions, filename);
    if (res.success) {
      setExportFeedback(`Successfully generated and downloaded ${filename} (${res.rowCount} records)`);
      setTimeout(() => setExportFeedback(null), 4000);
    }
  };

  const completedSessions = sessions.filter((s) => s.status === 'completed');
  const completionRate = Math.round((completedSessions.length / Math.max(1, sessions.length)) * 100);
  const totalScore = sessions.reduce((acc, curr) => acc + curr.score, 0);
  const totalHints = sessions.reduce((acc, curr) => acc + curr.hintsUsed, 0);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8F6F0' }}>
      <AdminSidebar
        isMobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <AdminHeader
          title="Telemetry & Analytics Reports"
          subtitle="Aggregate player completion statistics, hint usage rates, and client-side CSV data exports."
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
          actions={
            <button
              onClick={handleExportCsv}
              className="btn btn-primary btn-sm"
              style={{ borderRadius: '10px' }}
            >
              <Download size={15} />
              <span>Export Real CSV</span>
            </button>
          }
        />

        <main style={{ padding: '2rem 1.75rem', flex: 1 }}>
          {/* Export feedback toast */}
          {exportFeedback && (
            <div
              style={{
                padding: '0.85rem 1.25rem',
                borderRadius: '12px',
                backgroundColor: 'var(--color-success-bg)',
                color: 'var(--color-success)',
                border: '1px solid var(--color-success)',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                animation: 'fadeIn 0.25s ease',
              }}
            >
              <CheckCircle2 size={18} />
              <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{exportFeedback}</span>
            </div>
          )}

          {/* Date Range Selector Card */}
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={18} color="var(--color-olive)" />
              <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Report Sampling Period:</span>
            </div>

            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {[
                { id: '7d', label: 'Last 7 Days' },
                { id: '30d', label: 'Last 30 Days' },
                { id: '90d', label: 'Last Quarter' },
                { id: 'all', label: 'All-Time' },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setDateFilter(p.id as any)}
                  style={{
                    padding: '0.4rem 0.85rem',
                    borderRadius: '8px',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    backgroundColor: dateFilter === p.id ? 'var(--color-charcoal)' : 'var(--color-ivory)',
                    color: dateFilter === p.id ? '#FCFBF7' : 'var(--color-gray)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Aggregate Performance Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
              gap: '1.25rem',
              marginBottom: '2rem',
            }}
          >
            <div className="card-paper" style={{ padding: '1.5rem', borderRadius: '16px' }}>
              <span style={{ fontSize: '0.8125rem', color: 'var(--color-gray)', fontWeight: 600 }}>Total Sampled Sessions</span>
              <div className="font-mono" style={{ fontSize: '1.85rem', fontWeight: 800, marginTop: '0.25rem', color: 'var(--color-charcoal)' }}>
                {sessions.length}
              </div>
              <div style={{ fontSize: '0.725rem', color: 'var(--color-gray)', marginTop: '0.35rem' }}>
                Active in LocalStorage Demo
              </div>
            </div>

            <div className="card-paper" style={{ padding: '1.5rem', borderRadius: '16px' }}>
              <span style={{ fontSize: '0.8125rem', color: 'var(--color-gray)', fontWeight: 600 }}>Completion Success Rate</span>
              <div className="font-mono" style={{ fontSize: '1.85rem', fontWeight: 800, marginTop: '0.25rem', color: 'var(--color-olive-dark)' }}>
                {completionRate}%
              </div>
              <div style={{ fontSize: '0.725rem', color: 'var(--color-gray)', marginTop: '0.35rem' }}>
                {completedSessions.length} rooms solved all 3 stages
              </div>
            </div>

            <div className="card-paper" style={{ padding: '1.5rem', borderRadius: '16px' }}>
              <span style={{ fontSize: '0.8125rem', color: 'var(--color-gray)', fontWeight: 600 }}>Total Hints Deducted</span>
              <div className="font-mono" style={{ fontSize: '1.85rem', fontWeight: 800, marginTop: '0.25rem', color: 'var(--color-amber-dark)' }}>
                {totalHints} Hints
              </div>
              <div style={{ fontSize: '0.725rem', color: 'var(--color-gray)', marginTop: '0.35rem' }}>
                Avg { (totalHints / Math.max(1, sessions.length)).toFixed(1) } per game
              </div>
            </div>

            <div className="card-paper" style={{ padding: '1.5rem', borderRadius: '16px' }}>
              <span style={{ fontSize: '0.8125rem', color: 'var(--color-gray)', fontWeight: 600 }}>Aggregate Score Generated</span>
              <div className="font-mono" style={{ fontSize: '1.85rem', fontWeight: 800, marginTop: '0.25rem', color: 'var(--color-charcoal)' }}>
                {totalScore.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.725rem', color: 'var(--color-gray)', marginTop: '0.35rem' }}>
                Points accrued across teams
              </div>
            </div>
          </div>

          {/* Stage Completion Analysis Card */}
          <div className="card-paper" style={{ padding: '1.75rem', borderRadius: '18px', marginBottom: '2rem' }}>
            <h3 className="font-serif" style={{ fontSize: '1.25rem', marginBottom: '1.25rem', color: 'var(--color-charcoal)' }}>
              Stage Completion & Difficulty Breakdown
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
              <div style={{ backgroundColor: 'var(--color-ivory)', padding: '1.25rem', borderRadius: '14px', border: '1px solid var(--color-border)' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                  Stage 1: The Locked Archive
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-gray)', marginBottom: '0.75rem' }}>
                  Overriding keypad terminal with division prefix
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '0.35rem' }}>
                  <span>Pass Rate:</span>
                  <span style={{ fontWeight: 700, color: 'var(--color-olive-dark)' }}>94%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem' }}>
                  <span>Avg Duration:</span>
                  <span className="font-mono">36 seconds</span>
                </div>
              </div>

              <div style={{ backgroundColor: 'var(--color-ivory)', padding: '1.25rem', borderRadius: '14px', border: '1px solid var(--color-border)' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                  Stage 2: Security Feed Glitch
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-gray)', marginBottom: '0.75rem' }}>
                  Calculating the exact minute of blackout
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '0.35rem' }}>
                  <span>Pass Rate:</span>
                  <span style={{ fontWeight: 700, color: 'var(--color-olive-dark)' }}>86%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem' }}>
                  <span>Avg Duration:</span>
                  <span className="font-mono">48 seconds</span>
                </div>
              </div>

              <div style={{ backgroundColor: 'var(--color-ivory)', padding: '1.25rem', borderRadius: '14px', border: '1px solid var(--color-border)' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                  Stage 3: The Celestial Safe
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-gray)', marginBottom: '0.75rem' }}>
                  Cross-stage synthesis formula
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '0.35rem' }}>
                  <span>Pass Rate:</span>
                  <span style={{ fontWeight: 700, color: 'var(--color-olive-dark)' }}>79%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem' }}>
                  <span>Avg Duration:</span>
                  <span className="font-mono">54 seconds</span>
                </div>
              </div>
            </div>
          </div>

          {/* Export Action Card */}
          <div
            className="card-paper"
            style={{
              padding: '2rem',
              borderRadius: '20px',
              backgroundColor: '#FCFBF7',
              border: '2px dashed var(--color-olive)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.5rem',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <FileSpreadsheet size={22} color="var(--color-olive)" />
                <h3 className="font-serif" style={{ fontSize: '1.3rem', color: 'var(--color-charcoal)' }}>
                  Download Raw Session CSV Telemetry
                </h3>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-gray)', maxWidth: '580px', lineHeight: 1.5 }}>
                Generates a clean RFC 4180 compliant CSV including session ID, room code, participant rosters, current stages, scores, timestamps, and order references.
              </p>
            </div>

            <button
              onClick={handleExportCsv}
              className="btn btn-primary btn-lg"
              style={{ borderRadius: '14px' }}
            >
              <Download size={18} />
              <span>Export CSV File Now</span>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

