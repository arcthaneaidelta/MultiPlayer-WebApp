import React from 'react';
import { Activity, BarChart2 } from 'lucide-react';

export const ActivityChart: React.FC = () => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem',
      }}
    >
      {/* 1. Platform Activity Curve (SVG) */}
      <div className="card-paper" style={{ padding: '1.5rem', borderRadius: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity size={18} color="var(--color-olive)" />
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-charcoal)' }}>
              Platform Session Activity
            </h3>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-gray)' }}>Past 7 Days</span>
        </div>

        {/* Responsive SVG Chart */}
        <div style={{ width: '100%', height: '170px' }}>
          <svg viewBox="0 0 500 170" width="100%" height="100%" preserveAspectRatio="none">
            <defs>
              <linearGradient id="curveGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C99B55" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#C99B55" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="subGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#727B61" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#727B61" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            <line x1="0" y1="30" x2="500" y2="30" stroke="#EAE7DF" strokeDasharray="3 3" />
            <line x1="0" y1="75" x2="500" y2="75" stroke="#EAE7DF" strokeDasharray="3 3" />
            <line x1="0" y1="120" x2="500" y2="120" stroke="#EAE7DF" strokeDasharray="3 3" />

            {/* Area Fill Curve */}
            <path
              d="M 20 120 Q 80 110, 140 85 T 260 45 T 380 75 T 480 50 L 480 150 L 20 150 Z"
              fill="url(#curveGrad)"
            />

            {/* Line 1 (Sessions Started - Amber) */}
            <path
              d="M 20 120 Q 80 110, 140 85 T 260 45 T 380 75 T 480 50"
              fill="none"
              stroke="#C99B55"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Line 2 (Sessions Completed - Olive) */}
            <path
              d="M 20 135 Q 80 125, 140 100 T 260 65 T 380 92 T 480 70"
              fill="none"
              stroke="#727B61"
              strokeWidth="2.5"
              strokeDasharray="4 2"
              strokeLinecap="round"
            />

            {/* Dots */}
            <circle cx="260" cy="45" r="4" fill="#C99B55" />
            <circle cx="480" cy="50" r="4" fill="#C99B55" />
          </svg>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-gray)', marginTop: '0.5rem', padding: '0 0.5rem' }}>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </div>

      {/* 2. Mystery Genre / Stage Success Rates */}
      <div className="card-paper" style={{ padding: '1.5rem', borderRadius: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BarChart2 size={18} color="var(--color-olive)" />
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-charcoal)' }}>
              Stage Completion Performance
            </h3>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-gray)' }}>Historical</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            { label: 'Stage 1: Locked Archive', percent: 94, count: '1,420 clears', color: '#727B61' },
            { label: 'Stage 2: Security Glitch', percent: 86, count: '1,298 clears', color: '#C99B55' },
            { label: 'Stage 3: Celestial Vault', percent: 79, count: '1,192 clears', color: '#222522' },
            { label: 'Overall First-Attempt Clears', percent: 71, count: '1,072 clears', color: '#8E987B' },
          ].map((item) => (
            <div key={item.label}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '0.35rem' }}>
                <span style={{ fontWeight: 600, color: 'var(--color-charcoal)' }}>{item.label}</span>
                <span style={{ color: 'var(--color-gray)' }}>{item.count} ({item.percent}%)</span>
              </div>
              <div style={{ height: '8px', backgroundColor: 'var(--color-sage-light)', borderRadius: '9999px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${item.percent}%`,
                    backgroundColor: item.color,
                    borderRadius: '9999px',
                    transition: 'width 0.6s ease',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

