import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { COLORS, FONT, SIZES } from '@/constants/theme';

interface ScoreCounterProps {
  score: number;
  maxScore?: number;
}

const ScoreCounter = ({ score, maxScore }: ScoreCounterProps) => {
  const animation = useRef(new Animated.Value(1)).current;
  const previousScore = useRef(score);

  useEffect(() => {
    if (score > previousScore.current) {
      // Animation for score increase
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1.2,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
    previousScore.current = score;
  }, [score]);

  return (
    <View style={styles.container}>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreLabel}>Puntuación</Text>
        <Animated.Text 
          style={[
            styles.scoreValue, 
            { transform: [{ scale: animation }] }
          ]}
        >
          {score}{maxScore ? `/${maxScore}` : ''}
        </Animated.Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: SIZES.m,
  },
  scoreContainer: {
    backgroundColor: COLORS.white,
    padding: SIZES.m,
    borderRadius: SIZES.radiusMedium,
    minWidth: 120,
    alignItems: 'center',
  },
  scoreLabel: {
    fontFamily: FONT.medium,
    fontSize: SIZES.small,
    color: COLORS.mediumGray,
    marginBottom: SIZES.xs,
  },
  scoreValue: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xxLarge,
    color: COLORS.brightPurple,
  },
});

export default ScoreCounter;