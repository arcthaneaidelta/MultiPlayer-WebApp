import { GameSession, Player, ActivityEvent, ChatMessage, StageScoreResult } from '../types/session';
import { Game, Stage, PlayerPerspectiveKey } from '../types/game';
import { StorageService } from './storageService';

export const SAMPLE_NAMES = [
  { name: 'Dr. Elena Vance', role: 'Chief Archivist', avatar: 'EV', key: 'player_b' as PlayerPerspectiveKey },
  { name: 'Marcus Chen', role: 'Security Specialist', avatar: 'MC', key: 'player_c' as PlayerPerspectiveKey },
  { name: 'Sarah Jenkins', role: 'Forensics Specialist', avatar: 'SJ', key: 'player_d' as PlayerPerspectiveKey },
  { name: 'Alex Rivera', role: 'Systems Engineer', avatar: 'AR', key: 'player_e' as PlayerPerspectiveKey },
];

export const GameService = {
  generateRoomCode(): string {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  },

  createRoom(hostName = 'Detective Hayes (You)', playerCount = 4, customRoomCode?: string): GameSession {
    const game = StorageService.getGame();
    const roomCode = customRoomCode || '578595'; // default familiar code or random
    const sessionId = 'sess-' + Math.floor(1000 + Math.random() * 9000);

    const hostPlayer: Player = {
      id: 'p-host',
      displayName: hostName.trim() || 'Detective (Host)',
      role: 'Lead Detective',
      avatar: 'DH',
      isHost: true,
      isReady: true,
      isSimulated: false,
      perspectiveKey: 'player_a',
      connectedAt: new Date().toISOString(),
    };

    const players: Player[] = [hostPlayer];

    // Add simulated players up to playerCount
    const needed = Math.min(Math.max(playerCount - 1, 1), 4);
    for (let i = 0; i < needed; i++) {
      const sample = SAMPLE_NAMES[i];
      players.push({
        id: `p-sim-${i + 1}`,
        displayName: sample.name,
        role: sample.role,
        avatar: sample.avatar,
        isHost: false,
        isReady: true,
        isSimulated: true,
        perspectiveKey: sample.key,
        connectedAt: new Date().toISOString(),
      });
    }

    const firstStage = game.stages[0];

    const session: GameSession = {
      id: sessionId,
      roomCode,
      gameId: game.id,
      gameTitle: game.title,
      status: 'waiting',
      players,
      activePlayerId: 'p-host',
      currentStageIndex: 0,
      totalStages: game.stages.length,
      startTime: Date.now(),
      paused: false,
      remainingTime: firstStage ? firstStage.durationSeconds : 75,
      score: 0,
      stageResults: [],
      hintsUsed: 0,
      activityEvents: [
        {
          id: 'ev-' + Date.now(),
          sessionId,
          type: 'player_joined',
          timestamp: new Date().toISOString(),
          message: `${hostPlayer.displayName} created room ${roomCode}.`,
          playerId: hostPlayer.id,
          playerName: hostPlayer.displayName,
        },
      ],
      chatMessages: [
        {
          id: 'msg-init-1',
          sessionId,
          senderId: 'system',
          senderName: 'QUESTROOM System',
          senderAvatar: 'QR',
          text: `Welcome to "${game.title}". Room code: ${roomCode}. Coordinate with your team to solve each stage!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isSystem: true,
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    StorageService.saveCurrentSession(session);
    return session;
  },

  joinRoom(roomCode: string, playerName: string): GameSession {
    const code = roomCode.trim().toUpperCase();
    const all = StorageService.getAllSessions();
    const existing = all.find((s) => s.roomCode.toUpperCase() === code);

    if (existing && existing.status !== 'completed' && existing.status !== 'abandoned') {
      // Check if player name already joined
      let player = existing.players.find((p) => p.displayName.toLowerCase() === playerName.toLowerCase());
      if (!player) {
        if (existing.players.length >= 5) {
          throw new Error('This room has reached the maximum of 5 players.');
        }
        const perspectiveKeys: PlayerPerspectiveKey[] = ['player_a', 'player_b', 'player_c', 'player_d', 'player_e'];
        const assignedKey = perspectiveKeys[existing.players.length % perspectiveKeys.length];
        player = {
          id: 'p-' + Date.now(),
          displayName: playerName,
          role: 'Investigator',
          avatar: playerName.slice(0, 2).toUpperCase(),
          isHost: false,
          isReady: true,
          isSimulated: false,
          perspectiveKey: assignedKey,
          connectedAt: new Date().toISOString(),
        };
        existing.players.push(player);
        existing.activityEvents.unshift({
          id: 'ev-' + Date.now(),
          sessionId: existing.id,
          type: 'player_joined',
          timestamp: new Date().toISOString(),
          message: `${playerName} joined the room.`,
          playerId: player.id,
          playerName,
        });
      }
      existing.activePlayerId = player.id;
      StorageService.saveCurrentSession(existing);
      return existing;
    }

    // If demo code doesn't exist, create an active one for the guided demo
    return this.createRoom(playerName, 4, code);
  },

  togglePlayerReady(session: GameSession, playerId: string): GameSession {
    const updated = { ...session };
    const p = updated.players.find((x) => x.id === playerId);
    if (p) {
      p.isReady = !p.isReady;
      updated.activityEvents.unshift({
        id: 'ev-' + Date.now(),
        sessionId: session.id,
        type: 'player_ready',
        timestamp: new Date().toISOString(),
        message: `${p.displayName} is ${p.isReady ? 'ready' : 'not ready'}.`,
        playerId: p.id,
        playerName: p.displayName,
      });
      StorageService.saveCurrentSession(updated);
    }
    return updated;
  },

  addSimulatedPlayer(session: GameSession): GameSession {
    if (session.players.length >= 5) return session;
    const updated = { ...session };
    const nextIdx = updated.players.length - 1;
    const sample = SAMPLE_NAMES[nextIdx] || {
      name: `Agent ${nextIdx + 1}`,
      role: 'Investigator',
      avatar: `A${nextIdx + 1}`,
      key: 'player_e' as PlayerPerspectiveKey,
    };

    const newPlayer: Player = {
      id: `p-sim-${Date.now()}`,
      displayName: sample.name,
      role: sample.role,
      avatar: sample.avatar,
      isHost: false,
      isReady: true,
      isSimulated: true,
      perspectiveKey: sample.key,
      connectedAt: new Date().toISOString(),
    };

    updated.players.push(newPlayer);
    updated.activityEvents.unshift({
      id: 'ev-' + Date.now(),
      sessionId: session.id,
      type: 'player_joined',
      timestamp: new Date().toISOString(),
      message: `${newPlayer.displayName} (${newPlayer.role}) joined the lobby.`,
      playerId: newPlayer.id,
      playerName: newPlayer.displayName,
    });

    StorageService.saveCurrentSession(updated);
    return updated;
  },

  removeSimulatedPlayer(session: GameSession, playerId: string): GameSession {
    if (session.players.length <= 2) return session;
    const updated = { ...session };
    const target = updated.players.find((p) => p.id === playerId && !p.isHost);
    if (target) {
      updated.players = updated.players.filter((p) => p.id !== playerId);
      updated.activityEvents.unshift({
        id: 'ev-' + Date.now(),
        sessionId: session.id,
        type: 'player_left',
        timestamp: new Date().toISOString(),
        message: `${target.displayName} left the room.`,
        playerId: target.id,
        playerName: target.displayName,
      });
      StorageService.saveCurrentSession(updated);
    }
    return updated;
  },

  startGame(session: GameSession): GameSession {
    const game = StorageService.getGame();
    const updated = { ...session };
    updated.status = 'in_progress';
    updated.currentStageIndex = 0;
    const stage = game.stages[0];
    updated.remainingTime = stage ? stage.durationSeconds : 75;
    updated.startTime = Date.now();
    updated.paused = false;

    updated.activityEvents.unshift({
      id: 'ev-' + Date.now(),
      sessionId: session.id,
      type: 'stage_started',
      timestamp: new Date().toISOString(),
      message: `Game started! Stage 1: "${stage?.title || 'Investigation'}" has begun.`,
    });

    // Populate initial scripted banter for stage 1
    if (stage && stage.scriptedMessages) {
      const activeMsgs = stage.scriptedMessages.filter((m) => m.enabled && m.trigger === 'stage_start');
      activeMsgs.forEach((m, idx) => {
        updated.chatMessages.push({
          id: `chat-${stage.id}-${m.id}-${idx}`,
          sessionId: session.id,
          senderId: 'sim-' + m.senderAvatar,
          senderName: m.senderName,
          senderAvatar: m.senderAvatar,
          senderRole: m.senderRole,
          text: m.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isScripted: true,
        });
      });
    }

    StorageService.saveCurrentSession(updated);
    return updated;
  },

  normalizeAnswer(raw: string): string {
    return raw
      .trim()
      .toUpperCase()
      .replace(/\s+/g, ' ')
      .replace(/["'“”]/g, '');
  },

  checkAnswer(
    session: GameSession,
    submittedAnswer: string,
    currentStage: Stage,
    timeSpentSeconds: number,
    hintsUsedInStage: number
  ): { isCorrect: boolean; feedback: string; result?: StageScoreResult } {
    const cleanSubmission = this.normalizeAnswer(submittedAnswer);
    const cleanExpected = this.normalizeAnswer(currentStage.expectedAnswer);
    const acceptable = (currentStage.acceptableAnswers || []).map((a) => this.normalizeAnswer(a));

    const isMatch =
      cleanSubmission === cleanExpected ||
      acceptable.includes(cleanSubmission) ||
      cleanSubmission.replace(/[-_:\s]/g, '') === cleanExpected.replace(/[-_:\s]/g, '');

    if (isMatch) {
      // Calculate Stage Score
      const game = StorageService.getGame();
      const rules = game.scoringRules;
      const base = rules.baseStageScore;
      const timeRemaining = Math.max(0, currentStage.durationSeconds - timeSpentSeconds);
      const speedBonus = Math.round((timeRemaining / currentStage.durationSeconds) * rules.speedBonusMax);
      const hintDeduction = hintsUsedInStage * rules.hintPenalty;
      const stageTotal = Math.max(200, base + speedBonus - hintDeduction);

      const result: StageScoreResult = {
        stageIndex: session.currentStageIndex,
        stageTitle: currentStage.title,
        baseScore: base,
        speedBonus,
        hintDeduction,
        totalScore: stageTotal,
        timeSpentSeconds,
        hintsUsedCount: hintsUsedInStage,
        attemptsCount: 1,
        solved: true,
      };

      return {
        isCorrect: true,
        feedback: `Verified! ${currentStage.answerExplanation}`,
        result,
      };
    } else {
      return {
        isCorrect: false,
        feedback: 'Incorrect code or timestamp. Compare your clue cards with your team and check formatting.',
      };
    }
  },

  advanceStage(session: GameSession, stageResult: StageScoreResult): GameSession {
    const game = StorageService.getGame();
    const updated = { ...session };
    updated.stageResults.push(stageResult);
    updated.score += stageResult.totalScore;

    const nextIndex = updated.currentStageIndex + 1;
    if (nextIndex < game.stages.length) {
      updated.currentStageIndex = nextIndex;
      const nextStage = game.stages[nextIndex];
      updated.remainingTime = nextStage.durationSeconds;
      updated.paused = false;

      updated.activityEvents.unshift({
        id: 'ev-' + Date.now(),
        sessionId: session.id,
        type: 'stage_completed',
        timestamp: new Date().toISOString(),
        message: `${stageResult.stageTitle} cleared! Score +${stageResult.totalScore}. Advanced to Stage ${nextIndex + 1}.`,
      });

      // Add scripted banter for next stage
      if (nextStage.scriptedMessages) {
        const startMsgs = nextStage.scriptedMessages.filter((m) => m.enabled && m.trigger === 'stage_start');
        startMsgs.forEach((m, idx) => {
          updated.chatMessages.push({
            id: `chat-${nextStage.id}-${m.id}-${idx}`,
            sessionId: session.id,
            senderId: 'sim-' + m.senderAvatar,
            senderName: m.senderName,
            senderAvatar: m.senderAvatar,
            senderRole: m.senderRole,
            text: m.text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isScripted: true,
          });
        });
      }
    } else {
      // Completed full game
      updated.status = 'completed';
      updated.endTime = Date.now();
      updated.activityEvents.unshift({
        id: 'ev-' + Date.now(),
        sessionId: session.id,
        type: 'game_completed',
        timestamp: new Date().toISOString(),
        message: `All stages completed! Final Score: ${updated.score}. Mystery solved!`,
      });
    }

    StorageService.saveCurrentSession(updated);
    return updated;
  },

  addChatMessage(session: GameSession, senderName: string, text: string): GameSession {
    const updated = { ...session };
    const activePlayer = updated.players.find((p) => p.id === updated.activePlayerId);
    const newMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sessionId: session.id,
      senderId: activePlayer?.id || 'player',
      senderName: senderName || activePlayer?.displayName || 'Detective Hayes',
      senderAvatar: activePlayer?.avatar || 'DH',
      senderRole: activePlayer?.role || 'Investigator',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    updated.chatMessages.push(newMsg);
    StorageService.saveCurrentSession(updated);
    return updated;
  },
};

