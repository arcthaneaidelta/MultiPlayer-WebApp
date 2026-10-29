import React from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Play,
  Users,
  Shield,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Smartphone,
  Eye,
  Clock,
  KeyRound,
  FileText,
  Award,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';

export const DiscoverPage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--color-ivory)' }}>
      <Navbar />

      {/* Hero Section */}
      <section
        style={{
          paddingTop: '4.5rem',
          paddingBottom: '5rem',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, #FCFBF7 0%, #F5F2EA 100%)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div className="container-custom">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '3.5rem',
              alignItems: 'center',
            }}
          >
            {/* Left Column: Hero Narrative */}
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '9999px',
                  backgroundColor: 'var(--color-sage)',
                  color: 'var(--color-olive-dark)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '1.25rem',
                }}
              >
                <Sparkles size={14} />
                <span>A DIFFERENT KIND OF GAME NIGHT</span>
              </div>

              <h1
                className="font-serif"
                style={{
                  fontSize: 'clamp(2.3rem, 5vw, 3.6rem)',
                  fontWeight: 700,
                  lineHeight: 1.15,
                  color: 'var(--color-charcoal)',
                  marginBottom: '1.25rem',
                  letterSpacing: '-0.02em',
                }}
              >
                One mystery.<br />
                Different clues.<br />
                <span style={{ color: 'var(--color-amber-dark)' }}>One shared outcome.</span>
              </h1>

              <p
                style={{
                  fontSize: '1.125rem',
                  color: '#4A4E46',
                  lineHeight: 1.65,
                  marginBottom: '2rem',
                  maxWidth: '520px',
                }}
              >
                Bring your group together, follow the clues, and discover what happens when everyone sees a different part of the story. 2–5 players join on their phones, compare private evidence, and crack the case.
              </p>

              {/* CTAs */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', marginBottom: '2.5rem' }}>
                <Link
                  to="/play"
                  className="btn btn-primary btn-lg"
                  style={{ borderRadius: '14px', boxShadow: '0 8px 24px rgba(34, 37, 34, 0.2)' }}
                >
                  <Play size={18} fill="currentColor" />
                  <span>Enter the Experience</span>
                </Link>

                <Link
                  to="/admin"
                  className="btn btn-secondary btn-lg"
                  style={{ borderRadius: '14px' }}
                >
                  <Shield size={18} color="var(--color-olive)" />
                  <span>Explore Admin Panel</span>
                </Link>
              </div>

              {/* Quick Trust Badges */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '1.25rem',
                  fontSize: '0.8125rem',
                  color: 'var(--color-gray)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Smartphone size={15} color="var(--color-olive)" />
                  <span>Phone, Tablet & Desktop</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Users size={15} color="var(--color-olive)" />
                  <span>2–5 Players Asynchronous</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CheckCircle2 size={15} color="var(--color-olive)" />
                  <span>Instant 1-Click Guided Demo</span>
                </div>
              </div>
            </div>

            {/* Right Column: Layered Tabletop Visual Composition */}
            <div style={{ position: 'relative', minHeight: '440px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Dark Mystery Phone Frame */}
              <div
                className="card-dark glow-amber-animate"
                style={{
                  width: '100%',
                  maxWidth: '340px',
                  borderRadius: '28px',
                  padding: '1.5rem',
                  border: '2px solid rgba(201, 155, 85, 0.4)',
                  position: 'relative',
                  zIndex: 2,
                  boxShadow: '0 25px 60px rgba(0, 0, 0, 0.45)',
                }}
              >
                {/* Header in Mockup */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #2B302C', paddingBottom: '0.75rem' }}>
                  <div>
                    <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: '#E0BA7A', fontWeight: 700 }}>
                      STAGE 01 / 03
                    </span>
                    <div className="font-serif" style={{ fontSize: '1.05rem', fontWeight: 700, color: '#F5F2EA' }}>
                      The Locked Archive
                    </div>
                  </div>
                  <div className="font-mono" style={{ fontSize: '0.95rem', fontWeight: 700, color: '#C99B55' }}>
                    01:15
                  </div>
                </div>

                {/* Player Perspective Pill */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.45rem 0.75rem',
                    borderRadius: '8px',
                    backgroundColor: '#202422',
                    border: '1px solid #2F3531',
                    marginBottom: '1rem',
                  }}
                >
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#727B61', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 700 }}>
                    DH
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#DDE1D4', fontWeight: 600 }}>
                    Player 1: Detective Hayes (Private Clue)
                  </span>
                </div>

                {/* Layered Clue Card inside frame */}
                <div
                  style={{
                    backgroundColor: '#141615',
                    border: '1px solid #363C38',
                    borderRadius: '14px',
                    padding: '1rem',
                    marginBottom: '1rem',
                  }}
                >
                  <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: '#C99B55', fontWeight: 700 }}>
                    Artifact • Shift Logbook #44
                  </span>
                  <p style={{ fontSize: '0.8125rem', color: '#E4E7DF', marginTop: '0.35rem', lineHeight: 1.5 }}>
                    "Terminal #04 rebooted. The override key requires division prefix followed by 3-digit sector tag..."
                  </p>
                </div>

                {/* Input Simulation */}
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <input
                    type="text"
                    readOnly
                    value="ARC-709"
                    className="input-text input-dark font-mono"
                    style={{ fontSize: '0.8125rem', minHeight: '38px', padding: '0.4rem 0.65rem' }}
                  />
                  <div
                    className="btn btn-amber btn-sm"
                    style={{ minHeight: '38px', padding: '0 0.85rem' }}
                  >
                    Submit
                  </div>
                </div>
              </div>

              {/* Floating Layer 2: Player B's Fragment */}
              <div
                className="card-paper"
                style={{
                  position: 'absolute',
                  top: '15px',
                  right: '-10px',
                  width: '240px',
                  padding: '1rem',
                  borderRadius: '16px',
                  border: '1px solid var(--color-border)',
                  zIndex: 3,
                  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.12)',
                  animation: 'fadeIn 0.5s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'var(--color-amber)', color: '#161816', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 700 }}>
                    EV
                  </div>
                  <span style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--color-charcoal)' }}>
                    Player 2 (Dr. Vance) Sees:
                  </span>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-gray)', lineHeight: 1.4 }}>
                  "Archive division code is universally codified as <strong>ARC-</strong>"
                </p>
              </div>

              {/* Floating Layer 3: Player C's Fragment */}
              <div
                className="card-paper"
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '-15px',
                  width: '230px',
                  padding: '1rem',
                  borderRadius: '16px',
                  border: '1px solid var(--color-border)',
                  zIndex: 3,
                  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.12)',
                  animation: 'fadeIn 0.6s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'var(--color-olive)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 700 }}>
                    MC
                  </div>
                  <span style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--color-charcoal)' }}>
                    Player 3 (Marcus) Sees:
                  </span>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-gray)', lineHeight: 1.4 }}>
                  "Keypad diagnostic reveals numeric sector digits: <strong>709</strong>"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section: 3 Pillars */}
      <section style={{ padding: '5rem 0', backgroundColor: '#FCFBF7' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem' }}>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--color-olive-dark)',
              }}
            >
              Platform Architecture
            </span>
            <h2 className="font-serif" style={{ fontSize: '2.2rem', color: 'var(--color-charcoal)', marginTop: '0.35rem' }}>
              Crafted for Cooperative Mystery & Play
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--color-gray)', marginTop: '0.65rem' }}>
              A purpose-built web game engine that avoids the tropes of generic escape rooms or video trivia apps.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
            }}
          >
            {/* Pillar 1 */}
            <div
              className="card-paper"
              style={{
                padding: '2rem',
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  backgroundColor: 'var(--color-sage-light)',
                  color: 'var(--color-olive-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Eye size={24} />
              </div>
              <h3 className="font-serif" style={{ fontSize: '1.3rem', color: 'var(--color-charcoal)' }}>
                Different Perspectives
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#4A4E46', lineHeight: 1.6 }}>
                Each participant receives individual, asymmetric clues. No single screen has the whole answer—solving requires communication, discussion, and collective deduction.
              </p>
            </div>

            {/* Pillar 2 */}
            <div
              className="card-paper"
              style={{
                padding: '2rem',
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  backgroundColor: 'rgba(201, 155, 85, 0.15)',
                  color: 'var(--color-amber-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Clock size={24} />
              </div>
              <h3 className="font-serif" style={{ fontSize: '1.3rem', color: 'var(--color-charcoal)' }}>
                A Live Shared Journey
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#4A4E46', lineHeight: 1.6 }}>
                Timed stages, team progress, progressive hint penalties, in-game party chatter, and clean state feedback keep the excitement moving from first clue to final results.
              </p>
            </div>

            {/* Pillar 3 */}
            <div
              className="card-paper"
              style={{
                padding: '2rem',
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  backgroundColor: 'rgba(34, 37, 34, 0.1)',
                  color: 'var(--color-charcoal)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Shield size={24} />
              </div>
              <h3 className="font-serif" style={{ fontSize: '1.3rem', color: 'var(--color-charcoal)' }}>
                Control Behind the Scenes
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#4A4E46', lineHeight: 1.6 }}>
                Organizers edit stages, manage player-specific content, configure answers and scripted banter, monitor active sessions, and export reports to real CSV files.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works: 3 Steps */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--color-ivory)', borderTop: '1px solid var(--color-border)' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-amber-dark)' }}>
              Step-by-Step
            </span>
            <h2 className="font-serif" style={{ fontSize: '2.2rem', color: 'var(--color-charcoal)', marginTop: '0.35rem' }}>
              How It Works
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--color-gray)', marginTop: '0.5rem' }}>
              Simple to launch, accessible to every player without an app store download.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
              position: 'relative',
            }}
          >
            {[
              {
                step: '01',
                title: 'Create a Room & Invite Squad',
                desc: 'Generate a short room code or scan a QR code. 2 to 5 participants join immediately with custom roles.',
                icon: Users,
              },
              {
                step: '02',
                title: 'Compare Clues & Solve Stages',
                desc: 'Each player explores unique evidence, discusses on radio chat, uses hints if needed, and submits answers.',
                icon: KeyRound,
              },
              {
                step: '03',
                title: 'Reveal the Group’s Outcome',
                desc: 'Review final scores, speed bonuses, stage times, and shareable mystery certificates with your group.',
                icon: Award,
              },
            ].map((item) => {
              const StepIcon = item.icon;
              return (
                <div
                  key={item.step}
                  className="card-paper"
                  style={{
                    padding: '2.25rem 1.75rem',
                    borderRadius: '20px',
                    position: 'relative',
                  }}
                >
                  <span
                    className="font-serif"
                    style={{
                      fontSize: '3rem',
                      fontWeight: 700,
                      color: 'var(--color-sage)',
                      position: 'absolute',
                      top: '1.25rem',
                      right: '1.5rem',
                      lineHeight: 1,
                      pointerEvents: 'none',
                    }}
                  >
                    {item.step}
                  </span>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      backgroundColor: 'var(--color-ivory)',
                      color: 'var(--color-charcoal)',
                      border: '1px solid var(--color-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1.25rem',
                    }}
                  >
                    <StepIcon size={22} />
                  </div>
                  <h3 className="font-serif" style={{ fontSize: '1.25rem', color: 'var(--color-charcoal)', marginBottom: '0.65rem' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: '#565B52', lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Primary Entry Points Banner */}
      <section style={{ padding: '4.5rem 0', backgroundColor: '#1C201E', color: '#F5F2EA' }}>
        <div className="container-custom">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '2rem',
              backgroundColor: '#242926',
              border: '1px solid #373E39',
              borderRadius: '28px',
              padding: '3rem 2.5rem',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
            }}
          >
            <div style={{ maxWidth: '580px' }}>
              <span className="badge badge-dark-amber" style={{ marginBottom: '0.75rem' }}>
                Full Product Walkthrough
              </span>
              <h2 className="font-serif" style={{ fontSize: '2rem', color: '#F5F2EA', lineHeight: 1.25, marginBottom: '0.75rem' }}>
                Ready to experience “The Missing Hour”?
              </h2>
              <p style={{ fontSize: '0.95rem', color: '#A6ABA0', lineHeight: 1.6 }}>
                Test the complete 3-stage mystery with simulated participants, inspect the administrative panel, or run through the Shopify-to-invitation purchase flow.
              </p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem' }}>
              <Link to="/play" className="btn btn-amber btn-lg" style={{ borderRadius: '14px' }}>
                <Play size={18} fill="currentColor" />
                <span>Launch Playable Demo</span>
              </Link>
              <Link to="/store-demo" className="btn btn-secondary btn-lg" style={{ borderRadius: '14px', backgroundColor: '#2E3531', color: '#F5F2EA', borderColor: '#424B45' }}>
                <ShoppingBag size={18} color="#C99B55" />
                <span>Shopify Store Flow</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

