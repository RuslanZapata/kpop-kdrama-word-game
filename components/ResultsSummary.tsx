import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS, FONT, SIZES, SHADOWS } from '@/constants/theme';
import Button from './Button';

interface ResultsSummaryProps {
  score: number;
  maxScore: number;
  timeTaken: number;
  onPlayAgain: () => void;
  onMainMenu: () => void;
}

const ResultsSummary = ({ 
  score, 
  maxScore, 
  timeTaken, 
  onPlayAgain, 
  onMainMenu 
}: ResultsSummaryProps) => {
  // Calculate performance metrics
  const percentage = Math.round((score / maxScore) * 100);
  const averageTimePerWord = score > 0 ? Math.round(timeTaken / score) : 0;
  
  // Get feedback message based on percentage
  const getFeedbackMessage = () => {
    if (percentage >= 90) return "¡Eres todo un fan de K-Pop y K-Drama! ¡Increíble!";
    if (percentage >= 70) return "¡Muy bien! Tienes un gran conocimiento de la cultura coreana.";
    if (percentage >= 50) return "¡Buen trabajo! Vas por buen camino.";
    return "¡Sigue practicando! Pronto serás un experto.";
  };

  return (
    <View style={styles.container}>
      <View style={[styles.card, SHADOWS.medium]}>
        <Text style={styles.title}>Resultados</Text>
        
        <View style={styles.resultRow}>
          <Text style={styles.resultLabel}>Puntuación:</Text>
          <Text style={styles.resultValue}>{score}/{maxScore}</Text>
        </View>
        
        <View style={styles.resultRow}>
          <Text style={styles.resultLabel}>Porcentaje:</Text>
          <Text style={[
            styles.resultValue, 
            { color: getPercentageColor(percentage) }
          ]}>
            {percentage}%
          </Text>
        </View>
        
        <View style={styles.resultRow}>
          <Text style={styles.resultLabel}>Tiempo por palabra:</Text>
          <Text style={styles.resultValue}>{averageTimePerWord} segundos</Text>
        </View>
        
        <Text style={styles.feedbackMessage}>{getFeedbackMessage()}</Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <Button
          title="Jugar de nuevo"
          onPress={onPlayAgain}
          variant="primary"
          size="large"
          style={styles.button}
        />
        
        <Button
          title="Menú principal"
          onPress={onMainMenu}
          variant="outline"
          size="large"
          style={styles.button}
        />
      </View>
    </View>
  );
};

// Helper function to get color based on percentage
const getPercentageColor = (percentage: number) => {
  if (percentage >= 70) return COLORS.success;
  if (percentage >= 40) return COLORS.warning;
  return COLORS.error;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.l,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusLarge,
    padding: SIZES.xl,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xxLarge,
    color: COLORS.darkPurple,
    marginBottom: SIZES.l,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: SIZES.m,
  },
  resultLabel: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    color: COLORS.mediumGray,
  },
  resultValue: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    color: COLORS.brightPurple,
  },
  feedbackMessage: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    color: COLORS.darkPurple,
    textAlign: 'center',
    marginTop: SIZES.l,
    marginBottom: SIZES.m,
  },
  buttonContainer: {
    width: '100%',
    marginTop: SIZES.xl,
  },
  button: {
    marginBottom: SIZES.m,
  },
});

export default ResultsSummary;