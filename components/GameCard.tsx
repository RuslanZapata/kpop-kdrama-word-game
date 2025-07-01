import React, { useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Animated, 
  Dimensions 
} from 'react-native';
import { COLORS, FONT, SIZES, SHADOWS } from '@/constants/theme';

interface GameCardProps {
  word: string;
  isVisible: boolean;
  category?: string;
  categoryColor?: string;
}

const { width } = Dimensions.get('window');

const GameCard = ({ 
  word, 
  isVisible, 
  category, 
  categoryColor = COLORS.neonPink 
}: GameCardProps) => {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      // Card entry animation
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.05,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
      
      // Reset opacity
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
      
      // Slight wobble effect
      Animated.sequence([
        Animated.timing(rotation, {
          toValue: 0.02,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(rotation, {
          toValue: -0.02,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(rotation, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Card exit animation
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, word]);

  const rotateInterpolation = rotation.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-30deg', '30deg'],
  });

  const animatedStyle = {
    transform: [
      { scale },
      { rotate: rotateInterpolation }
    ],
    opacity,
  };

  return (
    <Animated.View style={[styles.container, animatedStyle, SHADOWS.large]}>
      <View style={[styles.card, { borderColor: categoryColor }]}>
        {category && (
          <View style={[styles.categoryBadge, { backgroundColor: categoryColor }]}>
            <Text style={styles.categoryText}>{category}</Text>
          </View>
        )}
        <Text style={styles.wordText}>{word}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.85,
    alignSelf: 'center',
    marginVertical: SIZES.l,
    marginBottom: 180,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusLarge,
    padding: SIZES.xl,
    borderWidth: 4,
    minHeight: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wordText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xxxLarge,
    color: COLORS.darkPurple,
    textAlign: 'center',
  },
  categoryBadge: {
    position: 'absolute',
    top: -10,
    paddingVertical: SIZES.xs,
    paddingHorizontal: SIZES.m,
    borderRadius: SIZES.radiusMedium,
  },
  categoryText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.xSmall,
    color: COLORS.white,
  },
});

export default GameCard;