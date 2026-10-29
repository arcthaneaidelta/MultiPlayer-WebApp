import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Gamepad2,
  Plus,
  Edit3,
  Users,
  Clock,
  Layers,
  Sparkles,
  ExternalLink,
  Trash2,
} from 'lucide-react';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminHeader } from '../components/admin/AdminHeader';
import { StorageService } from '../services/storageService';
import { Game } from '../types/game';

export const AdminGamesPage: React.FC = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeGame = StorageService.getGame();

  const gamesList = [
    activeGame,
    {
      id: 'game-alchemist-study',
      title: 'The Alchemist’s Study',
      tagline: 'A hidden Victorian laboratory holds a formula that bends the laws of physics.',
      description: 'Historical puzzle game where investigators analyze chemical reagents and celestial astrological charts.',
      premise: 'Explore the locked laboratory of Dr. Thaddeus Vance.',
      minimumPlayers: 2,
      maximumPlayers: 5,
      estimatedDuration: '20–25 min',
      status: 'draft' as const,
      stages: activeGame.stages,
      scoringRules: activeGame.scoringRules,
      updatedAt: '2026-10-14T11:20:00Z',
      createdAt: '2026-09-01T10:00:00Z',
      version: '0.8.0',
    },
    {
      id: 'game-midnight-express',
      title: 'Midnight Express',
      tagline: 'A high-speed train mystery across the snow-covered alpine pass.',
      description: 'Passengers with conflicting alibis and missing baggage tags.',
      premise: 'Solve the missing courier briefcase before the train arrives at the terminal.',
      minimumPlayers: 3,
      maximumPlayers: 5,
      estimatedDuration: '15–20 min',
      status: 'archived' as const,
      stages: activeGame.stages,
      scoringRules: activeGame.scoringRules,
      updatedAt: '2026-08-20T16:45:00Z',
      createdAt: '2026-07-10T14:00:00Z',
      version: '1.1.0',
    },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8F6F0' }}>
      <AdminSidebar
        isMobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <AdminHeader
          title="Game Experience Catalog"
          subtitle="Manage mystery titles, configure stage mechanics, and customize player clues."
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        />

        <main style={{ padding: '2rem 1.75rem', flex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {gamesList.map((g) => {
              const isEditable = g.id === activeGame.id;
              return (
                <div
                  key={g.id}
                  className="card-paper"
                  style={{
                    padding: '1.75rem',
                    borderRadius: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    border: isEditable ? '2px solid var(--color-amber)' : '1px solid var(--color-border)',
                    boxShadow: isEditable ? '0 10px 30px rgba(201, 155, 85, 0.15)' : 'var(--shadow-sm)',
                    position: 'relative',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                      <span
                        className={`badge ${
                          g.status === 'active'
                            ? 'badge-olive'
                            : g.status === 'draft'
                            ? 'badge-amber'
                            : 'badge-charcoal'
                        }`}
                      >
                        {g.status}
                      </span>
                      <span style={{ fontSize: '0.725rem', color: 'var(--color-gray)' }}>
                        v{g.version}
                      </span>
                    </div>

                    <h3 className="font-serif" style={{ fontSize: '1.4rem', color: 'var(--color-charcoal)', marginBottom: '0.45rem' }}>
                      {g.title}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-gray)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                      {g.description}
                    </p>

                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '0.5rem',
                        backgroundColor: 'var(--color-ivory)',
                        padding: '0.75rem',
                        borderRadius: '12px',
                        marginBottom: '1.5rem',
                        textAlign: 'center',
                      }}
                    >
                      <div>
                        <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--color-gray)', fontWeight: 600 }}>Stages</span>
                        <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>{g.stages.length}</div>
                      </div>
                      <div>
                        <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--color-gray)', fontWeight: 600 }}>Players</span>
                        <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>{g.minimumPlayers}–{g.maximumPlayers}</div>
                      </div>
                      <div>
                        <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--color-gray)', fontWeight: 600 }}>Duration</span>
                        <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>{g.estimatedDuration}</div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '0.65rem' }}>
                    <Link
                      to={`/admin/games/${g.id}`}
                      className="btn btn-primary"
                      style={{ flex: 1, borderRadius: '10px', fontSize: '0.85rem', justifyContent: 'center' }}
                    >
                      <Edit3 size={15} />
                      <span>{isEditable ? 'Open Live Editor' : 'Inspect Structure'}</span>
                    </Link>

                    {isEditable && (
                      <Link
                        to="/play"
                        className="btn btn-secondary"
                        style={{ borderRadius: '10px', padding: '0.5rem 0.85rem' }}
                        title="Play in Game Mode"
                      >
                        <ExternalLink size={16} />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
};

