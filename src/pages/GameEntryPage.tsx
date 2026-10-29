import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Compass,
  Play,
  Users,
  QrCode,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Smartphone,
  Lock,
  Clock,
  KeyRound,
  FileQuestion,
  HelpCircle,
} from 'lucide-react';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { QRCodeModal } from '../components/common/QRCodeModal';
import { GameService } from '../services/gameService';
import { StorageService } from '../services/storageService';

export const GameEntryPage: React.FC = () => {
  const navigate = useNavigate();
  const game = StorageService.getGame();

  const [activeTab, setActiveTab] = useState<'guided' | 'create' | 'join'>('guided');
  const [hostName, setHostName] = useState('Detective Jordan');
  const [playerCount, setPlayerCount] = useState(4);
  const [joinCode, setJoinCode] = useState('');
  const [joinName, setJoinName] = useState('Agent Morgan');
  const [joinError, setJoinError] = useState<string | null>(null);

  // QR Modal
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [createdRoomCode, setCreatedRoomCode] = useState('578595');

  // Guided 1-Click Launch
  const handleLaunchGuidedDemo = () => {
    const session = GameService.createRoom('Detective Hayes (You)', 4, '578595');
    navigate('/play/lobby');
  };

  // Create Room
  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    const code = GameService.generateRoomCode();
    setCreatedRoomCode(code);
    const session = GameService.createRoom(hostName, playerCount, code);
    setQrModalOpen(true);
  };

  // Join Room
  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinCode.trim()) {
      setJoinError('Please enter a 6-digit room code.');
      return;
    }
    if (!joinName.trim()) {
      setJoinError('Please enter your display name.');
      return;
    }

    try {
      setJoinError(null);
      GameService.joinRoom(joinCode.trim(), joinName.trim());
      navigate('/play/lobby');
    } catch (err: any) {
      setJoinError(err.message || 'Unable to connect to room.');
    }
  };

  const inviteUrl = `${window.location.origin}/#/invite/${createdRoomCode}`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--color-ivory)' }}>
      <Navbar />

      <main style={{ flex: 1, padding: '3.5rem 0 5rem' }}>
        <div className="container-custom" style={{ maxWidth: '820px' }}>
          {/* Game Title & Header Card */}
          <div
            className="card-paper"
            style={{
              padding: '2.5rem',
              borderRadius: '24px',
              marginBottom: '2rem',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-md)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="badge badge-amber">Interactive Mystery</span>
                <span className="badge badge-olive">Case File 01</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.8125rem', color: 'var(--color-gray)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Users size={15} color="var(--color-olive)" />
                  <span>{game.minimumPlayers}–{game.maximumPlayers} Players</span>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Clock size={15} color="var(--color-olive)" />
                  <span>{game.estimatedDuration}</span>
                </span>
              </div>
            </div>

            <h1 className="font-serif" style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 700, color: 'var(--color-charcoal)', lineHeight: 1.15, marginBottom: '0.75rem' }}>
              {game.title}
            </h1>
            <p style={{ fontSize: '1.05rem', color: '#4A4E46', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {game.premise}
            </p>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.75rem 1rem',
                backgroundColor: 'var(--color-ivory)',
                borderRadius: '12px',
                border: '1px solid var(--color-border)',
                fontSize: '0.8125rem',
                color: 'var(--color-gray)',
              }}
            >
              <Smartphone size={16} color="var(--color-amber-dark)" style={{ flexShrink: 0 }} />
              <span>
                <strong>Multiplayer Simulation:</strong> Designed to test seamlessly on your phone, tablet, or desktop with believable simulated squadmates.
              </span>
            </div>
          </div>

          {/* Action Tabs: Guided Demo vs Create Room vs Join Room */}
          <div
            style={{
              display: 'flex',
              backgroundColor: '#EDE9DE',
              padding: '0.35rem',
              borderRadius: '14px',
              marginBottom: '1.75rem',
            }}
          >
            {[
              { id: 'guided', label: '⚡ Try Guided Demo (Recommended)' },
              { id: 'create', label: 'Create a Room' },
              { id: 'join', label: 'Join Room' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  flex: 1,
                  padding: '0.75rem 0.5rem',
                  borderRadius: '10px',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  backgroundColor: activeTab === tab.id ? '#FCFBF7' : 'transparent',
                  color: activeTab === tab.id ? 'var(--color-charcoal)' : 'var(--color-gray)',
                  boxShadow: activeTab === tab.id ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                  transition: 'all 0.2s',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content 1: Guided Demo (The easiest path!) */}
          {activeTab === 'guided' && (
            <div
              className="card-paper"
              style={{
                padding: '2.25rem',
                borderRadius: '20px',
                textAlign: 'center',
                animation: 'fadeIn 0.2s ease',
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(201, 155, 85, 0.15)',
                  color: 'var(--color-amber-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem',
                }}
              >
                <Sparkles size={28} />
              </div>

              <h2 className="font-serif" style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>
                Instant Solo Walkthrough
              </h2>
              <p style={{ fontSize: '0.9375rem', color: 'var(--color-gray)', maxWidth: '520px', margin: '0 auto 1.75rem', lineHeight: 1.6 }}>
                Launch a pre-configured lobby with 4 simulated squadmates (Dr. Elena Vance, Marcus Chen, Sarah Jenkins). You can inspect different player clues and submit answers immediately.
              </p>

              <button
                onClick={handleLaunchGuidedDemo}
                className="btn btn-amber btn-lg"
                style={{ borderRadius: '16px', fontSize: '1.1rem', padding: '1rem 2.25rem' }}
              >
                <Play size={20} fill="currentColor" />
                <span>Launch Guided Demo (Room 578595)</span>
              </button>

              <div style={{ marginTop: '1.5rem', fontSize: '0.775rem', color: 'var(--color-gray)' }}>
                No second device required. Includes reviewer perspective switching.
              </div>
            </div>
          )}

          {/* Tab Content 2: Create a Room */}
          {activeTab === 'create' && (
            <form
              onSubmit={handleCreateRoom}
              className="card-paper"
              style={{
                padding: '2.25rem',
                borderRadius: '20px',
                animation: 'fadeIn 0.2s ease',
              }}
            >
              <h2 className="font-serif" style={{ fontSize: '1.45rem', marginBottom: '0.5rem' }}>
                Create a Private Game Room
              </h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-gray)', marginBottom: '1.5rem' }}>
                Generate an invitation code and share the link or QR code with your team.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                    Your Host Display Name
                  </label>
                  <input
                    type="text"
                    required
                    value={hostName}
                    onChange={(e) => setHostName(e.target.value)}
                    className="input-text"
                    placeholder="e.g. Detective Jordan"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                    Group Size: {playerCount} Participants
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {[2, 3, 4, 5].map((cnt) => (
                      <button
                        type="button"
                        key={cnt}
                        onClick={() => setPlayerCount(cnt)}
                        style={{
                          flex: 1,
                          padding: '0.65rem',
                          borderRadius: '10px',
                          border: `1px solid ${playerCount === cnt ? 'var(--color-amber-dark)' : 'var(--color-border)'}`,
                          backgroundColor: playerCount === cnt ? 'var(--color-sage-light)' : '#FFFFFF',
                          fontWeight: 700,
                          fontSize: '0.9rem',
                          color: playerCount === cnt ? 'var(--color-charcoal)' : 'var(--color-gray)',
                        }}
                      >
                        {cnt} Players
                      </button>
                    ))}
                  </div>
                  <span style={{ fontSize: '0.725rem', color: 'var(--color-gray)', marginTop: '0.25rem', display: 'block' }}>
                    Unassigned slots will be filled with realistic simulated investigators.
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg"
                style={{ width: '100%', borderRadius: '14px' }}
              >
                <KeyRound size={18} />
                <span>Create Room & Generate QR Invitation</span>
              </button>
            </form>
          )}

          {/* Tab Content 3: Join a Room */}
          {activeTab === 'join' && (
            <form
              onSubmit={handleJoinRoom}
              className="card-paper"
              style={{
                padding: '2.25rem',
                borderRadius: '20px',
                animation: 'fadeIn 0.2s ease',
              }}
            >
              <h2 className="font-serif" style={{ fontSize: '1.45rem', marginBottom: '0.5rem' }}>
                Join an Existing Room
              </h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-gray)', marginBottom: '1.5rem' }}>
                Enter the 6-character room code provided by your session organizer.
              </p>

              {joinError && (
                <div style={{ padding: '0.75rem 1rem', borderRadius: '10px', backgroundColor: 'var(--color-error-bg)', color: 'var(--color-error)', fontSize: '0.8125rem', marginBottom: '1.25rem' }}>
                  {joinError}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                    Room Access Code
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={8}
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                    className="input-text font-mono"
                    placeholder="e.g. 578595"
                    style={{ fontSize: '1.25rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}
                  />
                  <span style={{ fontSize: '0.725rem', color: 'var(--color-gray)', marginTop: '0.25rem', display: 'block' }}>
                    Tip: Enter "578595" to connect to the active demo room.
                  </span>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                    Your Display Name
                  </label>
                  <input
                    type="text"
                    required
                    value={joinName}
                    onChange={(e) => setJoinName(e.target.value)}
                    className="input-text"
                    placeholder="e.g. Agent Morgan"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg"
                style={{ width: '100%', borderRadius: '14px' }}
              >
                <span>Join Lobby</span>
                <ArrowRight size={18} />
              </button>
            </form>
          )}
        </div>
      </main>

      {/* QR Code Modal after Room Creation */}
      <QRCodeModal
        isOpen={qrModalOpen}
        onClose={() => {
          setQrModalOpen(false);
          navigate('/play/lobby');
        }}
        roomCode={createdRoomCode}
        inviteUrl={inviteUrl}
      />

      <Footer />
    </div>
  );
};

