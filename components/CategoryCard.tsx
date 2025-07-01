import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Platform 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONT, SIZES, SHADOWS } from '@/constants/theme';
import { Category } from '@/data/categories';

interface CategoryCardProps {
  category: Category;
  onPress: (category: Category) => void;
}

const CategoryCard = ({ category, onPress }: CategoryCardProps) => {
  const gradientColors = [
    category.color,
    adjustColorBrightness(category.color, -30)
  ];

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(category)}
      activeOpacity={0.7}
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <Text style={styles.icon}>{category.icon}</Text>
          <Text style={styles.name}>{category.name}</Text>
          <Text style={styles.description}>{category.description}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

// Helper function to adjust color brightness
function adjustColorBrightness(hex: string, percent: number) {
  // Convert hex to RGB
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);

  // Adjust brightness
  r = Math.max(0, Math.min(255, r + percent));
  g = Math.max(0, Math.min(255, g + percent));
  b = Math.max(0, Math.min(255, b + percent));

  // Convert back to hex
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: SIZES.radiusLarge,
    marginBottom: SIZES.m,
    ...SHADOWS.medium,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.darkPurple,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  gradient: {
    borderRadius: SIZES.radiusLarge,
    overflow: 'hidden',
  },
  content: {
    padding: SIZES.l,
  },
  icon: {
    fontSize: 32,
    marginBottom: SIZES.s,
  },
  name: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    color: COLORS.white,
    marginBottom: SIZES.xs,
  },
  description: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.white,
    opacity: 0.9,
  },
});

export default CategoryCard;