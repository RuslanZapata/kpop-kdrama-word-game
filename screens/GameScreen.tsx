import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  Animated, 
  Text, 
  BackHandler,
  Platform,
  ScrollView
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { COLORS, FONT, SIZES } from '@/constants/theme';
import GameCard from '@/components/GameCard';
import Timer from '@/components/Timer';
import ScoreCounter from '@/components/ScoreCounter';
import GameControls from '@/components/GameControls';
import ResultsSummary from '@/components/ResultsSummary';
import Button from '@/components/Button';
import { 
  getCategoryById, 
  getRandomWordsFromCategory, 
  getRandomWordsFromAllCategories 
} from '@/data/categories';
import { ArrowLeft, Trophy, X as Skip, Check } from 'lucide-react-native';
import { useGameHistory } from '@/hooks/useGameHistory';
import { useGameSettings } from '@/hooks/useGameSettings';

interface PlayerData {
  name: string;
  score: number;
  words: any[];
  skippedCount: number;
}

export default function GameScreen() {
  const params = useLocalSearchParams();
  const categoryId = params.category as string;
  const playerNames = JSON.parse(params.players as string) || [];
  const isMultiplayer = playerNames.length > 1;
  
  const { addGame } = useGameHistory();
  const { settings } = useGameSettings();
  
  const [gameStatus, setGameStatus] = useState<'ready' | 'playing' | 'between' | 'ended'>('ready');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [players, setPlayers] = useState<PlayerData[]>(
    playerNames.map((name: string) => ({ 
      name, 
      score: 0,
      words: [],
      skippedCount: 0
    }))
  );
  const [words, setWords] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const gameStartTime = useRef<Date | null>(null);

  useEffect(() => {
    const backAction = () => {
      if (gameStatus === 'playing') {
        setGameStatus('ready');
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [gameStatus]);

  useEffect(() => {
    loadNewWords();
  }, [categoryId, settings.cardCount]);

  const loadNewWords = () => {
    const wordCount = settings.cardCount === 'unlimited' 
      ? Math.max(100, Math.floor(settings.roundTime * 2))
      : settings.cardCount;

    let gameWords;
    if (categoryId === 'all') {
      gameWords = getRandomWordsFromAllCategories(wordCount);
    } else {
      gameWords = getRandomWordsFromCategory(categoryId, wordCount);
      const category = getCategoryById(categoryId);
      if (category) {
        gameWords = gameWords.map(word => ({
          ...word,
          category: category.name,
          categoryColor: category.color
        }));
      }
    }
    setWords(gameWords);
  };

  const startGame = () => {
    setGameStatus('playing');
    setCurrentWordIndex(0);
    setIsVisible(true);
    gameStartTime.current = new Date();
    
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handleCorrect = () => {
    const updatedPlayers = [...players];
    updatedPlayers[currentPlayerIndex].score += 1;
    updatedPlayers[currentPlayerIndex].words.push({
      ...words[currentWordIndex],
      correct: true
    });
    setPlayers(updatedPlayers);
    moveToNextWord();
  };

  const handleSkip = () => {
    const updatedPlayers = [...players];
    updatedPlayers[currentPlayerIndex].skippedCount += 1;
    updatedPlayers[currentPlayerIndex].words.push({
      ...words[currentWordIndex],
      correct: false
    });
    setPlayers(updatedPlayers);
    moveToNextWord();
  };

  const moveToNextWord = () => {
    setIsVisible(false);
    
    setTimeout(() => {
      if (currentWordIndex < words.length - 1) {
        setCurrentWordIndex(prevIndex => prevIndex + 1);
        setIsVisible(true);
      } else {
        if (isMultiplayer && currentPlayerIndex < players.length - 1) {
          setGameStatus('between');
        } else {
          endGame();
        }
      }
    }, 300);
  };

  const handleTimeUp = () => {
    if (isMultiplayer && currentPlayerIndex < players.length - 1) {
      setGameStatus('between');
    } else {
      endGame();
    }
  };

  const endGame = () => {
    setGameStatus('ended');
    
    // Save game to history
    const category = getCategoryById(categoryId);
    const gameResult = {
      id: Date.now().toString(),
      date: gameStartTime.current || new Date(),
      mode: isMultiplayer ? 'multiplayer' : 'single',
      scores: players.map(player => ({
        player: player.name,
        score: player.score,
        total: words.length,
        skippedCount: player.skippedCount
      })),
      category: category ? category.name : 'Todas las categorías'
    };
    
    addGame(gameResult);
  };

  const startNextPlayerTurn = () => {
    setCurrentPlayerIndex(prev => prev + 1);
    setCurrentWordIndex(0);
    loadNewWords();
    setGameStatus('ready');
    setIsVisible(true);
  };

  const handleMainMenu = () => {
    router.replace('/');
  };

  const playAgain = () => {
    setCurrentPlayerIndex(0);
    setPlayers(players.map(player => ({ ...player, score: 0, words: [], skippedCount: 0 })));
    setCurrentWordIndex(0);
    loadNewWords();
    setGameStatus('ready');
  };

  if (gameStatus === 'ready') {
    const category = categoryId !== 'all' 
      ? getCategoryById(categoryId) 
      : { name: 'Todas las categorías', color: COLORS.neonPink };

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Button
            title=""
            onPress={() => router.back()}
            variant="outline"
            size="small"
            style={styles.backButton}
            icon={<ArrowLeft color={COLORS.neonPink} size={20} />}
          />
          <Text style={styles.headerTitle}>
            {category?.name || 'Juego'}
          </Text>
          <View style={styles.backButton} />
        </View>
        
        <View style={styles.startContainer}>
          <Text style={styles.instructionTitle}>
            Turno de {players[currentPlayerIndex].name}
          </Text>
          <Text style={styles.instructionText}>
            Tienes {settings.roundTime} segundos para adivinar la mayor cantidad de palabras.
            Muestra el teléfono a los demás jugadores y ¡que comience el juego!
          </Text>
          
          <Button
            title="¡Comenzar!"
            onPress={startGame}
            variant="primary"
            size="large"
            style={styles.startButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  if (gameStatus === 'between') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.betweenContainer}>
          <Text style={styles.betweenTitle}>
            ¡Turno completado!
          </Text>
          
          <View style={styles.scoreCard}>
            <Text style={styles.playerName}>{players[currentPlayerIndex].name}</Text>
            <Text style={styles.scoreText}>
              Puntuación: {players[currentPlayerIndex].score}/{words.length}
            </Text>
          </View>
          
          <View style={styles.buttonContainer}>
            <Button
              title={`Turno de ${players[currentPlayerIndex + 1].name}`}
              onPress={startNextPlayerTurn}
              variant="primary"
              size="large"
              style={styles.actionButton}
            />
            
            <Button
              title="Jugar de nuevo"
              onPress={playAgain}
              variant="secondary"
              size="large"
              style={styles.actionButton}
            />
            
            <Button
              title="Menú principal"
              onPress={handleMainMenu}
              variant="outline"
              size="large"
              style={styles.actionButton}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (gameStatus === 'ended') {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>¡Juego terminado!</Text>
          
          {players.map((player, index) => {
            const successRate = (player.score / words.length) * 100;
            const accuracy = ((player.score) / (player.score + player.skippedCount)) * 100;
            
            return (
              <View key={index} style={styles.detailedScoreCard}>
                <View style={styles.playerHeader}>
                  <Trophy size={24} color={COLORS.warning} />
                  <Text style={styles.playerName}>{player.name}</Text>
                </View>
                
                <View style={styles.statsGrid}>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Puntuación</Text>
                    <Text style={styles.statValue}>{player.score}/{words.length}</Text>
                  </View>
                  
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Saltos</Text>
                    <Text style={styles.statValue}>{player.skippedCount}</Text>
                  </View>
                  
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Precisión</Text>
                    <Text style={[
                      styles.statValue,
                      { color: getAccuracyColor(accuracy) }
                    ]}>{accuracy.toFixed(1)}%</Text>
                  </View>
                  
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Progreso</Text>
                    <Text style={[
                      styles.statValue,
                      { color: getProgressColor(successRate) }
                    ]}>{successRate.toFixed(1)}%</Text>
                  </View>
                </View>

                <View style={styles.wordsList}>
                  <Text style={styles.wordsTitle}>Palabras:</Text>
                  {player.words.map((word, wordIndex) => (
                    <View key={wordIndex} style={styles.wordItem}>
                      <Text style={styles.wordText}>{word.value}</Text>
                      {word.correct ? (
                        <Check size={16} color={COLORS.success} />
                      ) : (
                        <Skip size={16} color={COLORS.error} />
                      )}
                    </View>
                  ))}
                </View>
              </View>
            );
          })}
          
          <View style={styles.buttonContainer}>
            <Button
              title="Jugar de nuevo"
              onPress={playAgain}
              variant="primary"
              size="large"
              style={styles.actionButton}
            />
            
            <Button
              title="Menú principal"
              onPress={handleMainMenu}
              variant="outline"
              size="large"
              style={styles.actionButton}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.gameContainer, { opacity: fadeAnim }]}>
        <Text style={styles.currentPlayer}>
          Turno de {players[currentPlayerIndex].name}
        </Text>
        
        <Timer 
          seconds={settings.roundTime} 
          isRunning={gameStatus === 'playing'} 
          onTimeUp={handleTimeUp} 
        />
        
        <ScoreCounter 
          score={players[currentPlayerIndex].score}
          maxScore={words.length} 
        />
        
        {words.length > 0 && currentWordIndex < words.length && (
          <GameCard 
            word={words[currentWordIndex].value}
            isVisible={isVisible}
            category={words[currentWordIndex].category}
            categoryColor={words[currentWordIndex].categoryColor}
          />
        )}
        
        <GameControls 
          onCorrect={handleCorrect} 
          onSkip={handleSkip} 
          isRunning={gameStatus === 'playing'} 
        />
      </Animated.View>
    </SafeAreaView>
  );
}

const getAccuracyColor = (accuracy: number) => {
  if (accuracy >= 80) return COLORS.success;
  if (accuracy >= 50) return COLORS.warning;
  return COLORS.error;
};

const getProgressColor = (progress: number) => {
  if (progress >= 70) return COLORS.success;
  if (progress >= 40) return COLORS.warning;
  return COLORS.error;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundDark,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.m,
    paddingVertical: SIZES.l,
  },
  backButton: {
    width: 40,
    height: 40,
  },
  headerTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    color: COLORS.white,
  },
  gameContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: SIZES.xl,
  },
  startContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.xl,
  },
  instructionTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xxLarge,
    color: COLORS.white,
    marginBottom: SIZES.m,
    textAlign: 'center',
  },
  instructionText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.lightGray,
    textAlign: 'center',
    marginBottom: SIZES.xl,
  },
  startButton: {
    marginTop: SIZES.l,
    width: '80%',
  },
  currentPlayer: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    color: COLORS.neonPink,
    textAlign: 'center',
    marginBottom: SIZES.m,
  },
  betweenContainer: {
    flex: 1,
    padding: SIZES.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  betweenTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xxLarge,
    color: COLORS.white,
    marginBottom: SIZES.xl,
    textAlign: 'center',
  },
  scoreCard: {
    backgroundColor: COLORS.cardDark,
    borderRadius: SIZES.radiusLarge,
    padding: SIZES.l,
    width: '100%',
    marginBottom: SIZES.m,
  },
  playerName: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    color: COLORS.white,
    marginBottom: SIZES.xs,
  },
  scoreText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    color: COLORS.lightGray,
  },
  buttonContainer: {
    width: '100%',
    marginTop: SIZES.xl,
  },
  actionButton: {
    marginBottom: SIZES.m,
  },
  resultsContainer: {
    flex: 1,
    padding: SIZES.xl,
  },
  resultsTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xxLarge,
    color: COLORS.white,
    marginBottom: SIZES.xl,
    textAlign: 'center',
  },
  detailedScoreCard: {
    backgroundColor: COLORS.cardDark,
    borderRadius: SIZES.radiusLarge,
    padding: SIZES.l,
    width: '100%',
    marginBottom: SIZES.l,
  },
  playerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.m,
    gap: SIZES.s,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: SIZES.l,
    gap: SIZES.s,
  },
  statItem: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: COLORS.backgroundDark,
    padding: SIZES.m,
    borderRadius: SIZES.radiusMedium,
  },
  statLabel: {
    fontFamily: FONT.medium,
    fontSize: SIZES.small,
    color: COLORS.lightGray,
    marginBottom: SIZES.xs,
  },
  statValue: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    color: COLORS.white,
  },
  wordsList: {
    marginTop: SIZES.m,
  },
  wordsTitle: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    color: COLORS.white,
    marginBottom: SIZES.s,
  },
  wordItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SIZES.xs,
    paddingHorizontal: SIZES.s,
    backgroundColor: COLORS.backgroundDark,
    borderRadius: SIZES.radiusSmall,
    marginBottom: SIZES.xs,
  },
  wordText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.white,
  },
});
