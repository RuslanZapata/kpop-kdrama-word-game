import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { COLORS, FONT, SIZES } from '@/constants/theme';
import { Trophy, Users, User, ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';
import Button from '@/components/Button';
import { useGameHistory } from '@/hooks/useGameHistory';

export default function HistoryScreen() {
  const { gameHistory } = useGameHistory();
  
  // Get only the last 5 games
  const recentGames = gameHistory.slice(0, 5);

  const formatDate = (date: Date) => {
    return date.toLocaleString('es', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
    });
  };

  const calculateAccuracy = (score: number, skipped: number) => {
    const total = score + skipped;
    return total > 0 ? (score / total) * 100 : 0;
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 80) return COLORS.success;
    if (accuracy >= 50) return COLORS.warning;
    return COLORS.error;
  };

  const renderGameCard = (game: GameResult) => {
    const isSinglePlayer = game.mode === 'single';

    return (
      <View key={game.id} style={styles.gameCard}>
        {/* Header */}
        <View style={styles.cardHeader}>
          <View style={styles.modeContainer}>
            {isSinglePlayer ? (
              <User size={20} color={COLORS.neonPink} />
            ) : (
              <Users size={20} color={COLORS.neonPink} />
            )}
            <Text style={styles.modeText}>
              {isSinglePlayer ? 'Individual' : 'Multijugador'}
            </Text>
          </View>
          <Text style={styles.dateText}>{formatDate(game.date)}</Text>
        </View>

        {/* Category */}
        <Text style={styles.categoryText}>{game.category}</Text>

        {/* Scores */}
        <View style={styles.scoresContainer}>
          {game.scores.map((score, index) => {
            const accuracy = calculateAccuracy(score.score, score.skippedCount);
            
            return (
              <View key={index} style={styles.scoreRow}>
                <View style={styles.playerInfo}>
                  <Text style={styles.playerText}>
                    {score.player}
                  </Text>
                  <View style={styles.scoreDisplay}>
                    <Trophy size={16} color={COLORS.warning} />
                    <Text style={styles.scoreText}>
                      {score.score}/{score.total}
                    </Text>
                  </View>
                </View>
                <View style={styles.statsContainer}>
                  <Text style={styles.statLabel}>Saltos: {score.skippedCount}</Text>
                  <Text style={[
                    styles.accuracyText,
                    { color: getAccuracyColor(accuracy) }
                  ]}>
                    {accuracy.toFixed(1)}%
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

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
        <Text style={styles.headerTitle}>Historial</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.subtitle}>Últimas 5 partidas</Text>

        {recentGames.length > 0 ? (
          recentGames.map(renderGameCard)
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              No hay partidas jugadas aún. ¡Juega tu primera partida para ver el historial!
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

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
  content: {
    padding: SIZES.l,
  },
  subtitle: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.lightGray,
    marginBottom: SIZES.xl,
  },
  gameCard: {
    backgroundColor: COLORS.cardDark,
    borderRadius: SIZES.radiusLarge,
    padding: SIZES.l,
    marginBottom: SIZES.l,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.s,
  },
  modeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.xs,
  },
  modeText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.small,
    color: COLORS.neonPink,
  },
  dateText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.mediumGray,
  },
  categoryText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    color: COLORS.white,
    marginBottom: SIZES.m,
  },
  scoresContainer: {
    gap: SIZES.s,
  },
  scoreRow: {
    backgroundColor: COLORS.backgroundDark,
    padding: SIZES.m,
    borderRadius: SIZES.radiusMedium,
  },
  playerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.xs,
  },
  playerText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    color: COLORS.white,
  },
  scoreDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.xs,
  },
  scoreText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.warning,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statLabel: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.mediumGray,
  },
  accuracyText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.small,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SIZES.xxl,
    backgroundColor: COLORS.cardDark,
    borderRadius: SIZES.radiusLarge,
  },
  emptyStateText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    color: COLORS.mediumGray,
    textAlign: 'center',
    lineHeight: 24,
  },
});