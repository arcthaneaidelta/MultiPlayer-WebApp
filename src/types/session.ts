import { PlayerPerspectiveKey } from './game';

export interface Player {
  id: string;
  displayName: string;
  role: string;
  avatar: string;
  isHost: boolean;
  isReady: boolean;
  isSimulated: boolean;
  perspectiveKey: PlayerPerspectiveKey;
  connectedAt: string;
}

export interface ActivityEvent {
  id: string;
  sessionId: string;
  type: 'player_joined' | 'player_left' | 'player_ready' | 'stage_started' | 'answer_submitted' | 'hint_used' | 'stage_completed' | 'game_completed' | 'game_paused' | 'game_resumed';
  timestamp: string;
  message: string;
  playerId?: string;
  playerName?: string;
  stageIndex?: number;
  data?: Record<string, unknown>;
}

export interface ChatMessage {
  id: string;
  sessionId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  senderRole?: string;
  text: string;
  timestamp: string;
  isSystem?: boolean;
  isScripted?: boolean;
}

export interface StageScoreResult {
  stageIndex: number;
  stageTitle: string;
  baseScore: number;
  speedBonus: number;
  hintDeduction: number;
  totalScore: number;
  timeSpentSeconds: number;
  hintsUsedCount: number;
  attemptsCount: number;
  solved: boolean;
}

export interface GameSession {
  id: string;
  roomCode: string;
  gameId: string;
  gameTitle: string;
  status: 'waiting' | 'in_progress' | 'completed' | 'paused' | 'abandoned';
  players: Player[];
  activePlayerId: string; // The local visitor's assigned player
  currentStageIndex: number;
  totalStages: number;
  startTime: number;
  endTime?: number;
  paused: boolean;
  remainingTime: number;
  score: number;
  stageResults: StageScoreResult[];
  hintsUsed: number;
  activityEvents: ActivityEvent[];
  chatMessages: ChatMessage[];
  orderRef?: string;
  createdAt: string;
  updatedAt: string;
}

