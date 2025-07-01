import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';

const STORAGE_KEY = '@game_settings';

interface GameSettings {
  roundTime: number;
  cardCount: number | 'unlimited';
  soundEnabled: boolean;
}

const DEFAULT_SETTINGS: GameSettings = {
  roundTime: 60,
  cardCount: 10,
  soundEnabled: true,
};

export function useGameSettings() {
  const [settings, setSettings] = useState<GameSettings>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);
  const [correctSound, setCorrectSound] = useState<Audio.Sound | null>(null);
  const [skipSound, setSkipSound] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    loadSettings();
    loadSounds();
    return () => {
      unloadSounds();
    };
  }, []);

  const loadSounds = async () => {
    const { sound: correct } = await Audio.Sound.createAsync(
      { uri: 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3' },
      { volume: 1 }
    );
    const { sound: skip } = await Audio.Sound.createAsync(
      { uri: 'https://assets.mixkit.co/active_storage/sfx/2868/2868-preview.mp3' },
      { volume: 1 }
    );
    setCorrectSound(correct);
    setSkipSound(skip);
  };

  const unloadSounds = async () => {
    if (correctSound) {
      await correctSound.unloadAsync();
    }
    if (skipSound) {
      await skipSound.unloadAsync();
    }
  };

  const playCorrectSound = async () => {
    if (settings.soundEnabled && correctSound) {
      try {
        await correctSound.replayAsync();
      } catch (error) {
        console.error('Error playing correct sound:', error);
      }
    }
  };

  const playSkipSound = async () => {
    if (settings.soundEnabled && skipSound) {
      try {
        await skipSound.replayAsync();
      } catch (error) {
        console.error('Error playing skip sound:', error);
      }
    }
  };

  const loadSettings = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSettings(JSON.parse(stored));
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading settings:', error);
      setIsLoading(false);
    }
  };

  const updateSettings = async (newSettings: Partial<GameSettings>) => {
    try {
      const updated = { ...settings, ...newSettings };
      setSettings(updated);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  const setRoundTime = (time: number) => {
    updateSettings({ roundTime: time });
  };

  const setCardCount = (count: number | 'unlimited') => {
    updateSettings({ cardCount: count });
  };

  const setSoundEnabled = (enabled: boolean) => {
    updateSettings({ soundEnabled: enabled });
  };

  return {
    settings,
    isLoading,
    setRoundTime,
    setCardCount,
    setSoundEnabled,
    playCorrectSound,
    playSkipSound,
  };
}