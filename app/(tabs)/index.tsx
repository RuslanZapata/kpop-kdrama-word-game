import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONT, SIZES } from '@/constants/theme';
import Button from '@/components/Button';
import { getAllCategories } from '@/data/categories';
import CategoryCard from '@/components/CategoryCard';
import { Play } from 'lucide-react-native';

export default function HomeScreen() {
  const categories = getAllCategories();

  const handleCategoryPress = (category: any) => {
    router.push(`/players?category=${category.id}`);
  };

  const handleAllCategories = () => {
    router.push('/players?category=all');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={[COLORS.neonPink, COLORS.brightPurple, COLORS.deepPurple]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.title}>K-Pop & K-Drama</Text>
        <Text style={styles.subtitle}>¡Adivina la Palabra!</Text>
        
        <View style={styles.buttonGroup}>
          <Button
            title="¡Jugar con Todas las Categorías!"
            onPress={handleAllCategories}
            variant="primary"
            size="large"
            style={styles.button}
            icon={<Play color={COLORS.white} size={20} style={styles.buttonIcon} />}
          />
        </View>
      </LinearGradient>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <Text style={styles.sectionTitle}>Categorías</Text>
        
        <ScrollView 
          contentContainerStyle={styles.categoriesList}
          showsVerticalScrollIndicator={false}
        >
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onPress={handleCategoryPress}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundDark,
  },
  header: {
    padding: SIZES.xl,
    borderBottomLeftRadius: SIZES.radiusLarge,
    borderBottomRightRadius: SIZES.radiusLarge,
    alignItems: 'center',
  },
  title: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xxLarge,
    color: COLORS.white,
    marginBottom: SIZES.xs,
  },
  subtitle: {
    fontFamily: FONT.medium,
    fontSize: SIZES.large,
    color: COLORS.white,
    opacity: 0.9,
    marginBottom: SIZES.l,
  },
  buttonGroup: {
    width: '100%',
    gap: SIZES.m,
  },
  button: {
    width: '100%',
  },
  buttonIcon: {
    marginRight: SIZES.s,
  },
  categoriesContainer: {
    flex: 1,
    padding: SIZES.l,
  },
  sectionTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color: COLORS.white,
    marginBottom: SIZES.m,
    marginTop: SIZES.s,
  },
  categoriesList: {
    paddingBottom: SIZES.xxl,
  },
});