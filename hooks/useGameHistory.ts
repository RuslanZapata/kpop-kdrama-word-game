import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface PlayerScore {
  player: string;
  score: number;
  total: number;
  skippedCount: number;
}

export interface GameResult {
  id: string;
  date: Date;
  mode: 'single' | 'multiplayer';
  scores: PlayerScore[];
  category: string;
}

const STORAGE_KEY = '@game_history';

export function useGameHistory() {
  const [gameHistory, setGameHistory] = useState<GameResult[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Convert string dates back to Date objects
        const history = parsed.map((game: any) => ({
          ...game,
          date: new Date(game.date)
        }));
        setGameHistory(history);
      }
    } catch (error) {
      console.error('Error loading game history:', error);
    }
  };

  const addGame = async (game: GameResult) => {
    try {
      const newHistory = [game, ...gameHistory].slice(0, 50); // Keep last 50 games
      setGameHistory(newHistory);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
    } catch (error) {
      console.error('Error saving game:', error);
    }
  };

  const clearHistory = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setGameHistory([]);
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  };

  return {
    gameHistory,
    addGame,
    clearHistory,
  };
}