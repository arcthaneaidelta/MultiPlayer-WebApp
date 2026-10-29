import { Game } from '../types/game';
import { GameSession } from '../types/session';
import { DemoOrder } from '../types/store';
import { INITIAL_GAME } from '../data/initialGame';
import { INITIAL_MOCK_SESSIONS } from '../data/mockSessions';
import { INITIAL_MOCK_ORDERS } from '../data/mockOrders';

const KEYS = {
  GAME: 'questroom_game_data_v1',
  CURRENT_SESSION: 'questroom_current_session_v1',
  SESSIONS_LIST: 'questroom_all_sessions_v1',
  ORDERS_LIST: 'questroom_orders_v1',
  ADMIN_AUTH: 'questroom_admin_auth_v1',
  DEMO_SPEED: 'questroom_demo_speed_v1',
};

export const StorageService = {
  // Game Management
  getGame(): Game {
    try {
      const data = localStorage.getItem(KEYS.GAME);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn('Failed to parse stored game, falling back to initial', e);
    }
    return INITIAL_GAME;
  },

  saveGame(game: Game): void {
    try {
      game.updatedAt = new Date().toISOString();
      localStorage.setItem(KEYS.GAME, JSON.stringify(game));
    } catch (e) {
      console.error('Failed to save game to localStorage', e);
    }
  },

  resetGame(): Game {
    try {
      localStorage.removeItem(KEYS.GAME);
    } catch (e) {
      console.warn(e);
    }
    return INITIAL_GAME;
  },

  // Active Session
  getCurrentSession(): GameSession | null {
    try {
      const data = localStorage.getItem(KEYS.CURRENT_SESSION);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn('Failed to parse current session', e);
    }
    return null;
  },

  saveCurrentSession(session: GameSession | null): void {
    try {
      if (!session) {
        localStorage.removeItem(KEYS.CURRENT_SESSION);
        return;
      }
      session.updatedAt = new Date().toISOString();
      localStorage.setItem(KEYS.CURRENT_SESSION, JSON.stringify(session));

      // Also sync into all sessions list
      const all = this.getAllSessions();
      const idx = all.findIndex((s) => s.id === session.id);
      if (idx >= 0) {
        all[idx] = session;
      } else {
        all.unshift(session);
      }
      this.saveAllSessions(all);
    } catch (e) {
      console.error('Failed to save current session', e);
    }
  },

  // All Sessions
  getAllSessions(): GameSession[] {
    try {
      const data = localStorage.getItem(KEYS.SESSIONS_LIST);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn(e);
    }
    return INITIAL_MOCK_SESSIONS;
  },

  saveAllSessions(sessions: GameSession[]): void {
    try {
      localStorage.setItem(KEYS.SESSIONS_LIST, JSON.stringify(sessions));
    } catch (e) {
      console.error(e);
    }
  },

  // Orders
  getAllOrders(): DemoOrder[] {
    try {
      const data = localStorage.getItem(KEYS.ORDERS_LIST);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn(e);
    }
    return INITIAL_MOCK_ORDERS;
  },

  saveOrder(order: DemoOrder): void {
    try {
      const orders = this.getAllOrders();
      orders.unshift(order);
      localStorage.setItem(KEYS.ORDERS_LIST, JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  },

  // Admin Auth (Simulated)
  isAdminAuthenticated(): boolean {
    return localStorage.getItem(KEYS.ADMIN_AUTH) === 'true';
  },

  setAdminAuthenticated(auth: boolean): void {
    if (auth) {
      localStorage.setItem(KEYS.ADMIN_AUTH, 'true');
    } else {
      localStorage.removeItem(KEYS.ADMIN_AUTH);
    }
  },

  // Speed Mode for testing
  getDemoSpeedMultiplier(): number {
    const val = localStorage.getItem(KEYS.DEMO_SPEED);
    return val ? parseFloat(val) : 1;
  },

  setDemoSpeedMultiplier(multiplier: number): void {
    localStorage.setItem(KEYS.DEMO_SPEED, multiplier.toString());
  },

  // Total Reset
  resetAllDemoData(): void {
    localStorage.clear();
  },
};

