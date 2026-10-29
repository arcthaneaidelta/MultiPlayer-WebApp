import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Save,
  RotateCcw,
  Plus,
  Trash2,
  ExternalLink,
  CheckCircle2,
  Clock,
  KeyRound,
  FileText,
  Lightbulb,
  MessageSquare,
  Users,
  Eye,
  AlertTriangle,
  ArrowLeft,
} from 'lucide-react';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminHeader } from '../components/admin/AdminHeader';
import { Game, Stage, PlayerPerspectiveKey, Hint, ScriptedMessage } from '../types/game';
import { StorageService } from '../services/storageService';

export const AdminGameEditorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [game, setGame] = useState<Game>(() => StorageService.getGame());
  const [selectedStageIndex, setSelectedStageIndex] = useState(0);
  const [selectedPerspective, setSelectedPerspective] = useState<PlayerPerspectiveKey>('player_a');
  const [savedNotification, setSavedNotification] = useState(false);

  const currentStage = game.stages[selectedStageIndex] || game.stages[0];

  const handleSave = () => {
    StorageService.saveGame(game);
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 3000);
  };

  const handleResetToDefault = () => {
    if (window.confirm('Reset all stages, clues, hints, and expected answers back to original default?')) {
      const reset = StorageService.resetGame();
      setGame(reset);
      setSelectedStageIndex(0);
      setSavedNotification(true);
      setTimeout(() => setSavedNotification(false), 3000);
    }
  };

  const handleStageFieldChange = (field: keyof Stage, value: any) => {
    const updatedStages = [...game.stages];
    updatedStages[selectedStageIndex] = {
      ...updatedStages[selectedStageIndex],
      [field]: value,
    };
    setGame({ ...game, stages: updatedStages });
  };

  const handleClueChange = (field: string, value: string) => {
    const updatedStages = [...game.stages];
    const stage = { ...updatedStages[selectedStageIndex] };
    const clues = { ...stage.playerClues };
    clues[selectedPerspective] = {
      ...clues[selectedPerspective],
      [field]: value,
    };
    stage.playerClues = clues;
    updatedStages[selectedStageIndex] = stage;
    setGame({ ...game, stages: updatedStages });
  };

  const handleAddStage = () => {
    const newStageOrder = game.stages.length + 1;
    const newStage: Stage = {
      id: `stage-${newStageOrder}`,
      order: newStageOrder,
      title: `Stage ${newStageOrder}: The New Mystery Sector`,
      subtitle: 'Coordinate Clues to Unlock Sector',
      location: 'Sub-Level Sector 4B',
      durationSeconds: 75,
      narrative: 'A newly added investigation stage. Squad members must correlate individual logs to solve the passcode.',
      playerClues: {
        player_a: {
          label: 'Player A',
          role: 'Lead Detective',
          characterName: 'Detective Hayes',
          clueTitle: 'Sector Gate Telemetry',
          clueText: 'The security gate accepts a 4-digit numeric code. Prefix is 90.',
          artifactType: 'document',
          artifactTitle: 'Gate Log',
          artifactDetails: 'Doc: GATE-04',
          keyPiece: 'First 2 digits are 90.',
        },
        player_b: {
          label: 'Player B',
          role: 'Chief Archivist',
          characterName: 'Dr. Elena Vance',
          clueTitle: 'Logbook Suffix Note',
          clueText: 'The remaining 2 digits match the vault charter year: 26.',
          artifactType: 'blueprint',
          artifactTitle: 'Charter Memo',
          artifactDetails: 'Memo: 2026',
          keyPiece: 'Last 2 digits are 26.',
        },
        player_c: {
          label: 'Player C',
          role: 'Security Specialist',
          characterName: 'Marcus Chen',
          clueTitle: 'Keypad Suffix Memo',
          clueText: 'Total code is 4 digits without spaces.',
          artifactType: 'timestamp',
          artifactTitle: 'Keypad Buffer',
          artifactDetails: 'Format: ####',
          keyPiece: '4 digits numeric: 9026',
        },
        player_d: {
          label: 'Player D',
          role: 'Forensics Specialist',
          characterName: 'Sarah Jenkins',
          clueTitle: 'Terminal Sensor',
          clueText: 'Verification confirmation confirms code: 9026.',
          artifactType: 'evidence',
          artifactTitle: 'Sensor Test',
          artifactDetails: 'Status: Ready',
          keyPiece: 'Code is 9026.',
        },
        player_e: {
          label: 'Player E',
          role: 'Systems Engineer',
          characterName: 'Alex Rivera',
          clueTitle: 'Systems Diagnostic',
          clueText: 'Code 9026 bypasses the sector interlock.',
          artifactType: 'witness',
          artifactTitle: 'Diagnostic Packet',
          artifactDetails: 'Bypass: Active',
          keyPiece: '9026',
        },
      },
      expectedAnswer: '9026',
      acceptableAnswers: ['9026'],
      answerExplanation: 'Combining the 90 prefix with 26 suffix yields the bypass code 9026.',
      hints: [
        {
          id: `hint-${newStageOrder}-1`,
          order: 1,
          text: 'Combine Player A’s first two digits (90) with Player B’s last two digits (26).',
          penaltyPoints: 100,
        },
      ],
      scriptedMessages: [
        {
          id: `msg-${newStageOrder}-1`,
          trigger: 'stage_start',
          senderName: 'Dr. Elena Vance',
          senderRole: 'Archivist',
          senderAvatar: 'EV',
          text: 'New stage unlocked! Let us examine our clue cards.',
          delaySeconds: 3,
          enabled: true,
        },
      ],
    };

    const updatedStages = [...game.stages, newStage];
    setGame({ ...game, stages: updatedStages });
    setSelectedStageIndex(updatedStages.length - 1);
  };

  const handleDeleteStage = (index: number) => {
    if (game.stages.length <= 1) {
      alert('A game must have at least one stage.');
      return;
    }
    if (window.confirm(`Delete Stage ${index + 1}: "${game.stages[index].title}"?`)) {
      const updatedStages = game.stages.filter((_, idx) => idx !== index);
      setGame({ ...game, stages: updatedStages });
      setSelectedStageIndex(Math.max(0, index - 1));
    }
  };

  const handleAddHint = () => {
    const stage = { ...game.stages[selectedStageIndex] };
    const newHint: Hint = {
      id: `hint-${stage.id}-${Date.now()}`,
      order: stage.hints.length + 1,
      text: 'New investigator hint instruction...',
      penaltyPoints: 150,
    };
    stage.hints = [...stage.hints, newHint];
    handleStageFieldChange('hints', stage.hints);
  };

  const handleUpdateHint = (hintIndex: number, field: keyof Hint, val: any) => {
    const stage = { ...game.stages[selectedStageIndex] };
    const updatedHints = [...stage.hints];
    updatedHints[hintIndex] = { ...updatedHints[hintIndex], [field]: val };
    handleStageFieldChange('hints', updatedHints);
  };

  const handleDeleteHint = (hintIndex: number) => {
    const stage = { ...game.stages[selectedStageIndex] };
    stage.hints = stage.hints.filter((_, idx) => idx !== hintIndex);
    handleStageFieldChange('hints', stage.hints);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8F6F0' }}>
      <AdminSidebar
        isMobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <AdminHeader
          title={`Editing: ${game.title}`}
          subtitle="Modifying stages, player-specific asymmetric clues, answers, and scripted chatter."
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
          actions={
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              {savedNotification && (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.8125rem',
                    color: 'var(--color-success)',
                    fontWeight: 600,
                  }}
                >
                  <CheckCircle2 size={16} />
                  <span>Saved to Local Storage!</span>
                </span>
              )}

              <button
                onClick={handleSave}
                className="btn btn-primary btn-sm"
                style={{ borderRadius: '10px' }}
              >
                <Save size={15} />
                <span>Save Changes</span>
              </button>

              <Link
                to="/play"
                className="btn btn-amber btn-sm"
                style={{ borderRadius: '10px' }}
                title="Test Playable Experience"
              >
                <ExternalLink size={15} />
                <span>Play Test</span>
              </Link>

              <button
                onClick={handleResetToDefault}
                className="btn btn-secondary btn-sm"
                style={{ borderRadius: '10px' }}
                title="Reset to Sample Data"
              >
                <RotateCcw size={15} />
                <span>Reset Default</span>
              </button>
            </div>
          }
        />

        {/* 2-Column Desktop Layout */}
        <main style={{ padding: '2rem 1.75rem', flex: 1 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(260px, 320px) 1fr',
              gap: '1.75rem',
            }}
            className="editor-grid"
          >
            {/* Left Column: Stages Navigation & Game Overview */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Game Metadata Card */}
              <div className="card-paper" style={{ padding: '1.25rem', borderRadius: '16px' }}>
                <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--color-gray)', fontWeight: 700 }}>
                  Game Properties
                </span>
                <div style={{ marginTop: '0.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.2rem' }}>
                    Title
                  </label>
                  <input
                    type="text"
                    value={game.title}
                    onChange={(e) => setGame({ ...game, title: e.target.value })}
                    className="input-text"
                    style={{ fontSize: '0.85rem', minHeight: '36px' }}
                  />
                </div>
                <div style={{ marginTop: '0.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.2rem' }}>
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={game.tagline}
                    onChange={(e) => setGame({ ...game, tagline: e.target.value })}
                    className="input-text"
                    style={{ fontSize: '0.85rem', minHeight: '36px' }}
                  />
                </div>
              </div>

              {/* Stages List */}
              <div className="card-paper" style={{ padding: '1.25rem', borderRadius: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-charcoal)' }}>
                    Stages ({game.stages.length})
                  </span>
                  <button
                    onClick={handleAddStage}
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
                  >
                    <Plus size={13} />
                    <span>Add Stage</span>
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {game.stages.map((stg, idx) => {
                    const isSelected = selectedStageIndex === idx;
                    return (
                      <div
                        key={stg.id}
                        onClick={() => setSelectedStageIndex(idx)}
                        style={{
                          padding: '0.75rem',
                          borderRadius: '10px',
                          backgroundColor: isSelected ? 'var(--color-sage-light)' : 'var(--color-ivory)',
                          border: `1px solid ${isSelected ? 'var(--color-olive)' : 'var(--color-border)'}`,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          transition: 'all 0.15s',
                        }}
                      >
                        <div>
                          <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: isSelected ? 'var(--color-olive-dark)' : 'var(--color-charcoal)' }}>
                            0{idx + 1}. {stg.title}
                          </div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--color-gray)' }}>
                            {stg.durationSeconds}s • Answer: {stg.expectedAnswer}
                          </div>
                        </div>

                        {game.stages.length > 1 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteStage(idx);
                            }}
                            style={{ background: 'none', color: 'var(--color-gray)', padding: '0.25rem' }}
                            title="Delete Stage"
                          >
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Active Stage Detail & Clue Editor */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Stage General Settings */}
              <div className="card-paper" style={{ padding: '1.5rem', borderRadius: '18px' }}>
                <h3 className="font-serif" style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--color-charcoal)' }}>
                  Stage Configuration: Stage {selectedStageIndex + 1}
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                      Stage Title
                    </label>
                    <input
                      type="text"
                      value={currentStage.title}
                      onChange={(e) => handleStageFieldChange('title', e.target.value)}
                      className="input-text"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                      Location Tag
                    </label>
                    <input
                      type="text"
                      value={currentStage.location}
                      onChange={(e) => handleStageFieldChange('location', e.target.value)}
                      className="input-text"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                      Stage Timer (Seconds)
                    </label>
                    <input
                      type="number"
                      min={10}
                      max={300}
                      value={currentStage.durationSeconds}
                      onChange={(e) => handleStageFieldChange('durationSeconds', parseInt(e.target.value) || 60)}
                      className="input-text font-mono"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                      Expected Correct Demo Answer
                    </label>
                    <input
                      type="text"
                      value={currentStage.expectedAnswer}
                      onChange={(e) => handleStageFieldChange('expectedAnswer', e.target.value)}
                      className="input-text font-mono"
                      style={{ fontWeight: 700, color: 'var(--color-olive-dark)' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                    Narrative Directive
                  </label>
                  <textarea
                    rows={2}
                    value={currentStage.narrative}
                    onChange={(e) => handleStageFieldChange('narrative', e.target.value)}
                    className="input-text"
                    style={{ resize: 'vertical' }}
                  />
                </div>
              </div>

              {/* Player-Specific Clues Editor (Asymmetric Clues!) */}
              <div className="card-paper" style={{ padding: '1.5rem', borderRadius: '18px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div>
                    <h3 className="font-serif" style={{ fontSize: '1.2rem', color: 'var(--color-charcoal)' }}>
                      Player Perspective Clue Dossiers
                    </h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-gray)' }}>
                      Each player views only their assigned dossier. Modify the clues below.
                    </p>
                  </div>

                  {/* Perspective Pills */}
                  <div style={{ display: 'flex', gap: '0.35rem' }}>
                    {(['player_a', 'player_b', 'player_c', 'player_d', 'player_e'] as PlayerPerspectiveKey[]).map((pkey) => {
                      const isSelected = selectedPerspective === pkey;
                      const clueObj = currentStage.playerClues[pkey];
                      return (
                        <button
                          key={pkey}
                          onClick={() => setSelectedPerspective(pkey)}
                          style={{
                            padding: '0.35rem 0.65rem',
                            borderRadius: '8px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            backgroundColor: isSelected ? 'var(--color-charcoal)' : 'var(--color-ivory)',
                            color: isSelected ? '#FCFBF7' : 'var(--color-charcoal)',
                            border: '1px solid var(--color-border)',
                          }}
                        >
                          {pkey.replace('player_', 'Player ').toUpperCase()}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Active Perspective Clue Fields */}
                {(() => {
                  const activeClue = currentStage.playerClues[selectedPerspective];
                  return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: 'var(--color-ivory)', padding: '1.25rem', borderRadius: '14px', border: '1px solid var(--color-border)' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                            Character / Investigator Name
                          </label>
                          <input
                            type="text"
                            value={activeClue.characterName}
                            onChange={(e) => handleClueChange('characterName', e.target.value)}
                            className="input-text"
                            style={{ fontSize: '0.85rem' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                            Specialty Role
                          </label>
                          <input
                            type="text"
                            value={activeClue.role}
                            onChange={(e) => handleClueChange('role', e.target.value)}
                            className="input-text"
                            style={{ fontSize: '0.85rem' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                            Artifact Title
                          </label>
                          <input
                            type="text"
                            value={activeClue.clueTitle}
                            onChange={(e) => handleClueChange('clueTitle', e.target.value)}
                            className="input-text"
                            style={{ fontSize: '0.85rem' }}
                          />
                        </div>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                          Confidential Clue Narrative
                        </label>
                        <textarea
                          rows={3}
                          value={activeClue.clueText}
                          onChange={(e) => handleClueChange('clueText', e.target.value)}
                          className="input-text"
                          style={{ fontSize: '0.85rem', resize: 'vertical' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                          Key Piece / Synthesis Contribution
                        </label>
                        <input
                          type="text"
                          value={activeClue.keyPiece}
                          onChange={(e) => handleClueChange('keyPiece', e.target.value)}
                          className="input-text"
                          style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-amber-dark)' }}
                        />
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Hints Editor */}
              <div className="card-paper" style={{ padding: '1.5rem', borderRadius: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h3 className="font-serif" style={{ fontSize: '1.2rem', color: 'var(--color-charcoal)' }}>
                    Progressive Stage Hints ({currentStage.hints.length})
                  </h3>
                  <button
                    onClick={handleAddHint}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '0.75rem' }}
                  >
                    <Plus size={13} />
                    <span>Add Hint</span>
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {currentStage.hints.map((hint, hidx) => (
                    <div
                      key={hint.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        backgroundColor: 'var(--color-ivory)',
                        padding: '0.75rem 1rem',
                        borderRadius: '12px',
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      <span className="font-mono" style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--color-amber-dark)' }}>
                        #{hidx + 1}
                      </span>
                      <input
                        type="text"
                        value={hint.text}
                        onChange={(e) => handleUpdateHint(hidx, 'text', e.target.value)}
                        className="input-text"
                        style={{ flex: 1, minHeight: '36px', fontSize: '0.8125rem' }}
                      />
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-gray)' }}>Penalty:</span>
                        <input
                          type="number"
                          value={hint.penaltyPoints}
                          onChange={(e) => handleUpdateHint(hidx, 'penaltyPoints', parseInt(e.target.value) || 100)}
                          className="input-text font-mono"
                          style={{ width: '70px', minHeight: '36px', fontSize: '0.8125rem' }}
                        />
                      </div>
                      <button
                        onClick={() => handleDeleteHint(hidx)}
                        style={{ background: 'none', color: 'var(--color-error)', padding: '0.35rem' }}
                        title="Delete Hint"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .editor-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

