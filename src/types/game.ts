export type PlayerPerspectiveKey = 'player_a' | 'player_b' | 'player_c' | 'player_d' | 'player_e';

export interface PlayerClue {
  label: string;
  role: string;
  characterName: string;
  clueTitle: string;
  clueText: string;
  artifactType: 'document' | 'timestamp' | 'witness' | 'blueprint' | 'evidence';
  artifactTitle: string;
  artifactDetails: string;
  keyPiece: string;
}

export interface Hint {
  id: string;
  order: number;
  text: string;
  penaltyPoints: number;
}

export interface ScriptedMessage {
  id: string;
  trigger: 'stage_start' | 'half_time' | 'low_time' | 'hint_used' | 'incorrect_attempt' | 'random_banter';
  senderName: string;
  senderRole: string;
  senderAvatar: string;
  text: string;
  delaySeconds: number;
  enabled: boolean;
}

export interface ScoringRules {
  baseStageScore: number;
  hintPenalty: number;
  speedBonusMax: number;
  incorrectPenalty: number;
}

export interface Stage {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  narrative: string;
  location: string;
  durationSeconds: number;
  playerClues: Record<PlayerPerspectiveKey, PlayerClue>;
  expectedAnswer: string;
  acceptableAnswers: string[];
  answerExplanation: string;
  hints: Hint[];
  scriptedMessages: ScriptedMessage[];
}

export interface Game {
  id: string;
  title: string;
  tagline: string;
  description: string;
  premise: string;
  minimumPlayers: number;
  maximumPlayers: number;
  estimatedDuration: string;
  status: 'active' | 'draft' | 'archived';
  stages: Stage[];
  scoringRules: ScoringRules;
  updatedAt: string;
  createdAt: string;
  version: string;
}

