import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Users,
  QrCode,
  Copy,
  Check,
  Play,
  LogOut,
  Sparkles,
  ShieldAlert,
  UserCheck,
  CheckCircle2,
  Clock,
  Sliders,
  ChevronRight,
} from 'lucide-react';
import { Navbar } from '../components/common/Navbar';
import { QRCodeModal } from '../components/common/QRCodeModal';
import { DemoControlsDrawer } from '../components/common/DemoControlsDrawer';
import { GameSession, Player } from '../types/session';
import { GameService } from '../services/gameService';
import { StorageService } from '../services/storageService';

export const LobbyPage: React.FC = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<GameSession | null>(null);
  const [copied, setCopied] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);

  useEffect(() => {
    let current = StorageService.getCurrentSession();
    if (!current) {
      // Auto-create guided demo session if none exists
      current = GameService.createRoom('Detective Jordan (You)', 4, '578595');
    }
    setSession(current);
  }, []);

  if (!session) return null;

  const inviteUrl = `${window.location.origin}/#/invite/${session.roomCode}`;

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(inviteUrl);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleToggleMyReady = () => {
    const updated = GameService.togglePlayerReady(session, session.activePlayerId);
    setSession(updated);
  };

  const handleStartGame = () => {
    const updated = GameService.startGame(session);
    setSession(updated);
    navigate('/play/game');
  };

  const activePlayer = session.players.find((p) => p.id === session.activePlayerId) || session.players[0];
  const allReady = session.players.length >= 2 && session.players.every((p) => p.isReady);

  return (
    <div className="game-dark-bg" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      <main style={{ flex: 1, padding: '2.5rem 1rem 5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '540px' }}>
          {/* Lobby Box (Inspired by Image 2: "LOBBY - Waiting for players to join... LOBBY CODE 578595") */}
          <div
            className="card-dark"
            style={{
              padding: '2rem 1.75rem',
              borderRadius: '26px',
              border: '1px solid rgba(201, 155, 85, 0.4)',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), 0 0 35px rgba(201, 155, 85, 0.15)',
              textAlign: 'center',
              animation: 'fadeIn 0.3s ease',
            }}
          >
            {/* Title & Status */}
            <span
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#C99B55',
                fontWeight: 800,
              }}
            >
              INVESTIGATION LOBBY
            </span>

            <h1 className="font-serif" style={{ fontSize: '2rem', color: '#F5F2EA', marginTop: '0.2rem', marginBottom: '0.35rem' }}>
              {session.gameTitle}
            </h1>

            <p style={{ fontSize: '0.875rem', color: '#9FA499', marginBottom: '1.5rem' }}>
              {allReady
                ? 'All investigators ready! Host can initiate the investigation.'
                : 'Waiting for squad members to ready up...'}
            </p>

            {/* Room Code Card (Matching Image 2) */}
            <div
              style={{
                backgroundColor: '#202422',
                borderRadius: '16px',
                border: '1px solid #333935',
                padding: '1.25rem',
                marginBottom: '1.25rem',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '-10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: '#141615',
                  padding: '0.15rem 0.65rem',
                  borderRadius: '6px',
                  fontSize: '0.65rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#9FA499',
                  fontWeight: 700,
                  border: '1px solid #333935',
                }}
              >
                LOBBY CODE
              </div>

              <div
                className="font-mono"
                style={{
                  fontSize: '2.4rem',
                  fontWeight: 800,
                  letterSpacing: '0.16em',
                  color: '#F5F2EA',
                  margin: '0.35rem 0',
                }}
              >
                {session.roomCode}
              </div>

              {/* Action buttons: Show QR & Copy Link */}
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '0.75rem' }}>
                <button
                  onClick={() => setQrOpen(true)}
                  className="btn btn-secondary btn-sm"
                  style={{
                    backgroundColor: '#282E2B',
                    color: '#E0E3DA',
                    borderColor: '#3D4440',
                    borderRadius: '8px',
                    padding: '0.4rem 0.85rem',
                  }}
                >
                  <QrCode size={14} />
                  <span>Show QR</span>
                </button>

                <button
                  onClick={handleCopyLink}
                  className="btn btn-secondary btn-sm"
                  style={{
                    backgroundColor: '#282E2B',
                    color: '#E0E3DA',
                    borderColor: '#3D4440',
                    borderRadius: '8px',
                    padding: '0.4rem 0.85rem',
                  }}
                >
                  {copied ? <Check size={14} color="#4ADE80" /> : <Copy size={14} />}
                  <span>{copied ? 'Copied Link' : 'Copy Invite'}</span>
                </button>
              </div>
            </div>

            {/* Players Connected Bar (Matching Image 2) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 1rem',
                backgroundColor: 'rgba(114, 123, 97, 0.15)',
                border: '1px solid rgba(114, 123, 97, 0.3)',
                borderRadius: '12px',
                marginBottom: '1.25rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#DDE1D4', fontWeight: 600, fontSize: '0.875rem' }}>
                <Users size={17} color="#8E987B" />
                <span>Players Connected:</span>
              </div>
              <span className="font-mono" style={{ fontSize: '1rem', fontWeight: 700, color: '#E0BA7A' }}>
                {session.players.length} / 5
              </span>
            </div>

            {/* Player Roster Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.75rem', textAlign: 'left' }}>
              {session.players.map((p) => {
                const isMe = p.id === session.activePlayerId;
                return (
                  <div
                    key={p.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem 1rem',
                      borderRadius: '12px',
                      backgroundColor: isMe ? '#252B28' : '#1E2220',
                      border: `1px solid ${isMe ? 'rgba(201, 155, 85, 0.4)' : '#2B302D'}`,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <div
                        style={{
                          width: '34px',
                          height: '34px',
                          borderRadius: '10px',
                          backgroundColor: isMe ? '#C99B55' : '#2A302D',
                          color: isMe ? '#161816' : '#E0BA7A',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '0.8125rem',
                        }}
                      >
                        {p.avatar}
                      </div>
                      <div>
                        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#F5F2EA' }}>
                          {p.displayName} {p.isHost && <span style={{ color: '#E0BA7A', fontSize: '0.7rem' }}>(Host)</span>}
                        </div>
                        <div style={{ fontSize: '0.725rem', color: '#9FA499' }}>{p.role}</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {p.isReady ? (
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            fontSize: '0.725rem',
                            fontWeight: 600,
                            color: '#4ADE80',
                            backgroundColor: 'rgba(74, 222, 128, 0.1)',
                            padding: '0.25rem 0.55rem',
                            borderRadius: '6px',
                          }}
                        >
                          <CheckCircle2 size={13} />
                          <span>Ready</span>
                        </span>
                      ) : (
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            fontSize: '0.725rem',
                            fontWeight: 600,
                            color: '#FBBF24',
                            backgroundColor: 'rgba(251, 191, 36, 0.1)',
                            padding: '0.25rem 0.55rem',
                            borderRadius: '6px',
                          }}
                        >
                          <Clock size={13} />
                          <span>Waiting</span>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Ready Up / Start Game Primary Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {activePlayer?.isHost ? (
                <button
                  onClick={handleStartGame}
                  className="btn btn-amber btn-lg"
                  style={{
                    width: '100%',
                    borderRadius: '14px',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    boxShadow: '0 4px 20px rgba(201, 155, 85, 0.35)',
                  }}
                >
                  <Play size={20} fill="currentColor" />
                  <span>Start Game (Stage 1)</span>
                </button>
              ) : (
                <button
                  onClick={handleToggleMyReady}
                  className={`btn ${activePlayer?.isReady ? 'btn-secondary' : 'btn-amber'} btn-lg`}
                  style={{ width: '100%', borderRadius: '14px' }}
                >
                  <UserCheck size={18} />
                  <span>{activePlayer?.isReady ? 'Cancel Ready' : 'Ready Up!'}</span>
                </button>
              )}

              <Link
                to="/play"
                className="btn btn-secondary btn-sm"
                style={{
                  width: '100%',
                  backgroundColor: 'transparent',
                  color: '#9FA499',
                  borderColor: '#2F3531',
                  borderRadius: '10px',
                }}
              >
                <LogOut size={14} />
                <span>Exit Lobby</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* QR Code Modal */}
      <QRCodeModal
        isOpen={qrOpen}
        onClose={() => setQrOpen(false)}
        roomCode={session.roomCode}
        inviteUrl={inviteUrl}
      />

      {/* Discreet Demo Controls Drawer */}
      <DemoControlsDrawer
        session={session}
        onSessionUpdated={(updated) => setSession(updated)}
      />
    </div>
  );
};

