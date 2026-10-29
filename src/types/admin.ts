export interface DashboardMetrics {
  totalGames: number;
  sessionsStarted: number;
  sessionsCompleted: number;
  averageCompletionTimeMinutes: number;
  completionRatePercent: number;
  totalPlayersEngaged: number;
  averageRating: number;
}

export type SessionFilterStatus = 'all' | 'waiting' | 'in_progress' | 'completed' | 'abandoned';

export interface ReportFilter {
  dateRange: '7d' | '30d' | '90d' | 'all';
  gameId: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'game_master';
  avatar: string;
  lastLogin: string;
}

