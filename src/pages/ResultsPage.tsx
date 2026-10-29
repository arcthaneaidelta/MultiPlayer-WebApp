import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  Award,
  Clock,
  HelpCircle,
  Share2,
  Copy,
  Check,
  RotateCcw,
  Shield,
  ShoppingBag,
  ExternalLink,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { GameSession } from '../types/session';
import { StorageService } from '../services/storageService';
import { GameService } from '../services/gameService';

export const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<GameSession | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const current = StorageService.getCurrentSession();
    setSession(current);

    // Launch celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.55 },
        colors: ['#C99B55', '#727B61', '#E0BA7A', '#FFFFFF'],
      });
    } catch (e) {
      // Fallback
    }
  }, []);

  if (!session) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--color-ivory)' }}>
        <Navbar />
        <main style={{ flex: 1, padding: '4rem 1rem', textAlign: 'center' }}>
          <h2>No active game session found.</h2>
          <Link to="/play" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Start a Game
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const durationSec = session.endTime && session.startTime
    ? Math.round((session.endTime - session.startTime) / 1000)
    : 184;

  const mins = Math.floor(durationSec / 60);
  const secs = durationSec % 60;

  const shareText = `🕵️‍♂️ We just solved "The Missing Hour" on QUESTROOM! Final Score: ${session.score.toLocaleString()} pts in ${mins}m ${secs}s (Room: ${session.roomCode}). Try the multiplayer mystery: ${window.location.origin}/#/play`;

  const handleCopySummary = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePlayAgain = () => {
    // Reset session and go to lobby
    const newSession = GameService.createRoom('Detective Hayes (You)', 4, GameService.generateRoomCode());
    navigate('/play/lobby');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--color-ivory)' }}>
      <Navbar />

      <main style={{ flex: 1, padding: '3.5rem 1rem 5rem' }}>
        <div className="container-custom" style={{ maxWidth: '780px' }}>
          {/* Hero Celebration Card */}
          <div
            className="card-paper"
            style={{
              padding: '2.5rem',
              borderRadius: '26px',
              textAlign: 'center',
              marginBottom: '2rem',
              boxShadow: 'var(--shadow-md)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '24px',
                backgroundColor: 'rgba(201, 155, 85, 0.15)',
                color: 'var(--color-amber-dark)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
                border: '1px solid rgba(201, 155, 85, 0.3)',
              }}
            >
              <Award size={40} />
            </div>

            <span className="badge badge-amber" style={{ marginBottom: '0.65rem' }}>
              Investigation Solved • Room {session.roomCode}
            </span>

            <h1 className="font-serif" style={{ fontSize: 'clamp(2rem, 4.5vw, 2.75rem)', fontWeight: 700, color: 'var(--color-charcoal)', marginBottom: '0.5rem' }}>
              Case Closed: The Missing Hour
            </h1>
            <p style={{ fontSize: '1rem', color: 'var(--color-gray)', maxWidth: '540px', margin: '0 auto 1.75rem', lineHeight: 1.6 }}>
              Congratulations! Your investigative squad synthesized individual archive logs, pinpointed the exact blackout timestamp, and cracked the celestial safe before system purge.
            </p>

            {/* Score Highlight Box */}
            <div
              style={{
                backgroundColor: 'var(--color-ivory)',
                border: '1px solid var(--color-border)',
                borderRadius: '18px',
                padding: '1.5rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '1rem',
                marginBottom: '1.75rem',
              }}
            >
              <div>
                <span style={{ fontSize: '0.725rem', textTransform: 'uppercase', color: 'var(--color-gray)', fontWeight: 700 }}>
                  Total Final Score
                </span>
                <div className="font-mono" style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-amber-dark)' }}>
                  {session.score.toLocaleString()}
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.725rem', textTransform: 'uppercase', color: 'var(--color-gray)', fontWeight: 700 }}>
                  Investigation Time
                </span>
                <div className="font-mono" style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-charcoal)' }}>
                  {mins}m {secs}s
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.725rem', textTransform: 'uppercase', color: 'var(--color-gray)', fontWeight: 700 }}>
                  Stages Cleared
                </span>
                <div className="font-mono" style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-olive-dark)' }}>
                  {session.stageResults.length || 3} / 3
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.725rem', textTransform: 'uppercase', color: 'var(--color-gray)', fontWeight: 700 }}>
                  Hints Used
                </span>
                <div className="font-mono" style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-gray)' }}>
                  {session.hintsUsed}
                </div>
              </div>
            </div>

            {/* Copy Shareable Summary */}
            <button
              onClick={handleCopySummary}
              className="btn btn-secondary"
              style={{ borderRadius: '12px', padding: '0.65rem 1.25rem', margin: '0 auto' }}
            >
              {copied ? <Check size={16} color="green" /> : <Copy size={16} />}
              <span>{copied ? 'Summary Copied to Clipboard!' : 'Copy Shareable Results Summary'}</span>
            </button>
          </div>

          {/* Stage Performance Breakdown Cards */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 className="font-serif" style={{ fontSize: '1.35rem', marginBottom: '1rem', color: 'var(--color-charcoal)' }}>
              Stage-by-Stage Performance
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {(session.stageResults.length > 0 ? session.stageResults : [
                { stageIndex: 0, stageTitle: 'Stage 1: The Locked Archive', totalScore: 1350, timeSpentSeconds: 34, hintsUsedCount: 0, solved: true },
                { stageIndex: 1, stageTitle: 'Stage 2: The Security Feed Glitch', totalScore: 1250, timeSpentSeconds: 42, hintsUsedCount: 1, solved: true },
                { stageIndex: 2, stageTitle: 'Stage 3: The Celestial Vault Safe', totalScore: 1400, timeSpentSeconds: 38, hintsUsedCount: 0, solved: true },
              ]).map((stg, idx) => (
                <div
                  key={idx}
                  className="card-paper"
                  style={{
                    padding: '1.25rem 1.5rem',
                    borderRadius: '16px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        backgroundColor: 'var(--color-sage)',
                        color: 'var(--color-olive-dark)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '0.875rem',
                      }}
                    >
                      0{idx + 1}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{stg.stageTitle}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-gray)' }}>
                        Cleared in {stg.timeSpentSeconds}s • {stg.hintsUsedCount} hints used
                      </div>
                    </div>
                  </div>

                  <div className="font-mono" style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-olive-dark)' }}>
                    +{stg.totalScore.toLocaleString()} pts
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Choices: Play Again vs Admin vs Store */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1rem',
            }}
          >
            <button
              onClick={handlePlayAgain}
              className="btn btn-primary btn-lg"
              style={{ borderRadius: '14px', justifyContent: 'center' }}
            >
              <RotateCcw size={18} />
              <span>Play Again</span>
            </button>

            <Link
              to="/admin"
              className="btn btn-secondary btn-lg"
              style={{ borderRadius: '14px', justifyContent: 'center' }}
            >
              <Shield size={18} color="var(--color-olive)" />
              <span>Inspect Admin Panel</span>
            </Link>

            <Link
              to="/store-demo"
              className="btn btn-secondary btn-lg"
              style={{ borderRadius: '14px', justifyContent: 'center' }}
            >
              <ShoppingBag size={18} color="var(--color-amber-dark)" />
              <span>Simulate Shopify Store</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

