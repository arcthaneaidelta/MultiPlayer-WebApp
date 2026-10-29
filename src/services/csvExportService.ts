import { GameSession } from '../types/session';

function escapeCSVCell(val: unknown): string {
  if (val === null || val === undefined) return '""';
  const str = String(val);
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return `"${str}"`;
}

export const CsvExportService = {
  exportSessionsToCsv(sessions: GameSession[], filename = 'questroom-sessions-report.csv'): { success: boolean; rowCount: number } {
    if (!sessions || sessions.length === 0) {
      return { success: false, rowCount: 0 };
    }

    const headers = [
      'Session ID',
      'Room Code',
      'Game Title',
      'Status',
      'Player Count',
      'Participants',
      'Current Stage',
      'Total Stages',
      'Final Score',
      'Hints Used',
      'Start Time (UTC)',
      'End Time (UTC)',
      'Duration (Seconds)',
      'Order Reference',
    ];

    const rows = sessions.map((s) => {
      const participantNames = s.players.map((p) => `${p.displayName} (${p.role})`).join('; ');
      const durationSeconds = s.endTime && s.startTime ? Math.round((s.endTime - s.startTime) / 1000) : 0;

      return [
        escapeCSVCell(s.id),
        escapeCSVCell(s.roomCode),
        escapeCSVCell(s.gameTitle),
        escapeCSVCell(s.status),
        escapeCSVCell(s.players.length),
        escapeCSVCell(participantNames),
        escapeCSVCell(s.currentStageIndex + 1),
        escapeCSVCell(s.totalStages),
        escapeCSVCell(s.score),
        escapeCSVCell(s.hintsUsed),
        escapeCSVCell(new Date(s.startTime).toISOString()),
        escapeCSVCell(s.endTime ? new Date(s.endTime).toISOString() : 'N/A'),
        escapeCSVCell(durationSeconds > 0 ? durationSeconds : 'Active'),
        escapeCSVCell(s.orderRef || 'None'),
      ].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\r\n');
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    return { success: true, rowCount: sessions.length };
  },
};

