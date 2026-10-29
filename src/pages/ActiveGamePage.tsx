import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  StageProgress,
} from '../components/game/StageProgress';
import { ClueCard } from '../components/game/ClueCard';
import { PartyChat } from '../components/game/PartyChat';
import { AnswerSubmission } from '../components/game/AnswerSubmission';
import { HintsDrawer } from '../components/game/HintsDrawer';
import { StageTransitionModal } from '../components/game/StageTransitionModal';
import { DemoControlsDrawer } from '../components/common/DemoControlsDrawer';
import { GameSession, StageScoreResult } from '../types/session';
import { GameService } from '../services/gameService';
import { StorageService } from '../services/storageService';
import { Navbar } from '../components/common/Navbar';
import { Eye, Shield, Sparkles } from 'lucide-react';
import { PlayerPerspectiveKey } from '../types/game';

export const ActiveGamePage: React.FC = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<GameSession | null>(null);
  const [hintsModalOpen, setHintsModalOpen] = useState(false);
  const [transitionModalOpen, setTransitionModalOpen] = useState(false);
  const [lastStageResult, setLastStageResult] = useState<StageScoreResult | null>(null);
  const [lastFeedback, setLastFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [unlockedHintsPerStage, setUnlockedHintsPerStage] = useState<Record<number, number>>({ 0: 0, 1: 0, 2: 0 });

  const game = StorageService.getGame();

  useEffect(() => {
    let current = StorageService.getCurrentSession();
    if (!current || current.status === 'completed') {
      current = GameService.createRoom('Detective Hayes (You)', 4, '578595');
      current = GameService.startGame(current);
    }
    setSession(current);
    setSpeedMultiplier(StorageService.getDemoSpeedMultiplier());
  }, []);

  if (!session) return null;

  const currentStage = game.stages[session.currentStageIndex] || game.stages[0];
  const activePlayer = session.players.find((p) => p.id === session.activePlayerId) || session.players[0];
  const perspectiveKey = activePlayer.perspectiveKey || 'player_a';
  const playerClue = currentStage.playerClues[perspectiveKey] || currentStage.playerClues.player_a;

  const currentStageUnlockedHints = unlockedHintsPerStage[session.currentStageIndex] || 0;

  // Handle countdown tick
  const handleTick = (newRemaining: number) => {
    if (!session) return;
    session.remainingTime = newRemaining;
  };

  // Handle time up
  const handleTimeUp = () => {
    setLastFeedback({
      isCorrect: false,
      message: 'Time elapsed on this stage! Compare your clues and submit the code to proceed.',
    });
  };

  // Toggle pause
  const handleTogglePause = () => {
    const updated = { ...session, paused: !session.paused };
    setSession(updated);
    StorageService.saveCurrentSession(updated);
  };

  // Submit Answer
  const handleSubmitAnswer = (submittedAnswer: string) => {
    const timeSpent = Math.max(5, currentStage.durationSeconds - session.remainingTime);
    const result = GameService.checkAnswer(
      session,
      submittedAnswer,
      currentStage,
      timeSpent,
      currentStageUnlockedHints
    );

    if (result.isCorrect && result.result) {
      setLastFeedback({ isCorrect: true, message: result.feedback });
      setLastStageResult(result.result);
      setTransitionModalOpen(true);
    } else {
      setLastFeedback({ isCorrect: false, message: result.feedback });
    }
  };

  // Instant solve from demo controls
  const handleInstantSolve = () => {
    handleSubmitAnswer(currentStage.expectedAnswer);
  };

  // Advance stage after transition modal
  const handleProceedNextStage = () => {
    if (!lastStageResult) return;
    setTransitionModalOpen(false);
    setLastFeedback(null);

    const isFinal = session.currentStageIndex >= game.stages.length - 1;
    const updated = GameService.advanceStage(session, lastStageResult);
    setSession(updated);

    if (isFinal) {
      navigate('/play/results');
    }
  };

  // Unlock next hint
  const handleUnlockNextHint = () => {
    const currentCount = currentStageUnlockedHints;
    if (currentCount < currentStage.hints.length) {
      const nextCount = currentCount + 1;
      setUnlockedHintsPerStage((prev) => ({
        ...prev,
        [session.currentStageIndex]: nextCount,
      }));

      // Add to session hints used
      const updated = { ...session, hintsUsed: session.hintsUsed + 1 };
      setSession(updated);
      StorageService.saveCurrentSession(updated);
    }
  };

  // Send message in party radio chat
  const handleSendChatMessage = (text: string) => {
    const updated = GameService.addChatMessage(session, activePlayer.displayName, text);
    setSession(updated);
  };

  const isFinalStage = session.currentStageIndex >= game.stages.length - 1;
  const nextStage = game.stages[session.currentStageIndex + 1];

  return (
    <div className="game-dark-bg" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      {/* Sticky Stage Progress & Live Timer Bar */}
      <StageProgress
        currentStageIndex={session.currentStageIndex}
        totalStages={game.stages.length}
        stageTitle={currentStage.title}
        stageLocation={currentStage.location}
        durationSeconds={currentStage.durationSeconds}
        remainingSeconds={session.remainingTime}
        isPaused={session.paused}
        score={session.score}
        speedMultiplier={speedMultiplier}
        onTick={handleTick}
        onTimeUp={handleTimeUp}
        onTogglePause={handleTogglePause}
      />

      {/* Main Investigation Canvas */}
      <main style={{ flex: 1, padding: '2rem 1.25rem 5rem' }}>
        <div className="container-custom" style={{ maxWidth: '860px' }}>
          {/* Quick Perspective Switcher Banner */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.75rem',
              backgroundColor: '#1C201E',
              border: '1px solid #2E3430',
              borderRadius: '14px',
              padding: '0.65rem 1rem',
              marginBottom: '1.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', color: '#DDE1D4' }}>
              <Eye size={16} color="#C99B55" />
              <span>
                Viewing as <strong>{activePlayer.displayName}</strong> ({playerClue.role})
              </span>
            </div>

            {/* Quick perspective pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {[
                { key: 'player_a' as PlayerPerspectiveKey, label: 'Player A' },
                { key: 'player_b' as PlayerPerspectiveKey, label: 'Player B' },
                { key: 'player_c' as PlayerPerspectiveKey, label: 'Player C' },
                { key: 'player_d' as PlayerPerspectiveKey, label: 'Player D' },
                { key: 'player_e' as PlayerPerspectiveKey, label: 'Player E' },
              ].map((p) => {
                const isSelected = perspectiveKey === p.key;
                return (
                  <button
                    key={p.key}
                    onClick={() => {
                      const updated = { ...session };
                      const target = updated.players.find((pl) => pl.perspectiveKey === p.key);
                      if (target) {
                        updated.activePlayerId = target.id;
                      } else {
                        activePlayer.perspectiveKey = p.key;
                      }
                      setSession(updated);
                      StorageService.saveCurrentSession(updated);
                    }}
                    style={{
                      padding: '0.25rem 0.55rem',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      backgroundColor: isSelected ? '#C99B55' : '#262C28',
                      color: isSelected ? '#161816' : '#9FA499',
                      border: `1px solid ${isSelected ? '#C99B55' : '#333B36'}`,
                    }}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stage Narrative Callout */}
          <div
            style={{
              padding: '1.25rem 1.5rem',
              backgroundColor: '#1E2320',
              borderRadius: '16px',
              borderLeft: '4px solid #C99B55',
              marginBottom: '1.75rem',
            }}
          >
            <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#E0BA7A', fontWeight: 700 }}>
              Mission Directive
            </span>
            <p style={{ fontSize: '0.9375rem', color: '#E4E7DF', marginTop: '0.35rem', lineHeight: 1.6 }}>
              {currentStage.narrative}
            </p>
          </div>

          {/* Clue Card (Private Evidence) */}
          <div style={{ marginBottom: '1.75rem' }}>
            <ClueCard clue={playerClue} player={activePlayer} />
          </div>

          {/* Solution Submission Form */}
          <div style={{ marginBottom: '1.75rem' }}>
            <AnswerSubmission
              onSubmitAnswer={handleSubmitAnswer}
              onOpenHints={() => setHintsModalOpen(true)}
              hintsAvailable={currentStage.hints.length}
              unlockedHintCount={currentStageUnlockedHints}
              lastFeedback={lastFeedback}
              placeholder={`Enter ${currentStage.title.split(':')[1]?.trim() || 'code'}...`}
            />
          </div>

          {/* In-Game Party Radio Chat (Simulated squad reactions) */}
          <PartyChat
            messages={session.chatMessages}
            onSendMessage={handleSendChatMessage}
            activePlayerName={activePlayer.displayName}
          />
        </div>
      </main>

      {/* Hints Modal */}
      <HintsDrawer
        isOpen={hintsModalOpen}
        onClose={() => setHintsModalOpen(false)}
        hints={currentStage.hints}
        unlockedHintCount={currentStageUnlockedHints}
        onUnlockNextHint={handleUnlockNextHint}
        hintPenalty={game.scoringRules.hintPenalty}
      />

      {/* Stage Cleared Transition Modal */}
      <StageTransitionModal
        isOpen={transitionModalOpen}
        stageResult={lastStageResult}
        nextStageTitle={nextStage?.title}
        isFinalStage={isFinalStage}
        onProceed={handleProceedNextStage}
      />

      {/* Reviewer Toolkit Drawer */}
      <DemoControlsDrawer
        session={session}
        onSessionUpdated={(updated) => setSession(updated)}
        onInstantCompleteStage={handleInstantSolve}
        onSpeedMultiplierChange={(mult) => setSpeedMultiplier(mult)}
      />
    </div>
  );
};

