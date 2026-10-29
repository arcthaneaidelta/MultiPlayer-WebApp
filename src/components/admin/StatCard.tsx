import React from 'react';
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  changePercent?: number;
  changeLabel?: string;
  icon: LucideIcon;
  iconColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  changePercent,
  changeLabel = 'vs last week',
  icon: Icon,
  iconColor = 'var(--color-olive)',
}) => {
  const isPositive = changePercent !== undefined && changePercent >= 0;

  return (
    <div
      className="card-paper"
      style={{
        padding: '1.5rem',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow-sm)',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-gray)' }}>
          {title}
        </span>
        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            backgroundColor: 'var(--color-sage-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon size={20} color={iconColor} />
        </div>
      </div>

      <div>
        <div
          className="font-serif"
          style={{
            fontSize: '1.85rem',
            fontWeight: 700,
            color: 'var(--color-charcoal)',
            lineHeight: 1.1,
            marginBottom: '0.5rem',
          }}
        >
          {value}
        </div>

        {changePercent !== undefined && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.2rem',
                fontWeight: 600,
                color: isPositive ? 'var(--color-success)' : 'var(--color-error)',
              }}
            >
              {isPositive ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
              {isPositive ? `+${changePercent}%` : `${changePercent}%`}
            </span>
            <span style={{ color: 'var(--color-gray)' }}>{changeLabel}</span>
          </div>
        )}
      </div>
    </div>
  );
};

