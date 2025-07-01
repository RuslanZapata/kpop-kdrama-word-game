import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Check, X } from 'lucide-react-native';
import Button from './Button';
import { COLORS, SIZES } from '@/constants/theme';

interface GameControlsProps {
  onCorrect: () => void;
  onSkip: () => void;
  isRunning: boolean;
}

const GameControls = ({ onCorrect, onSkip, isRunning }: GameControlsProps) => {
  const slideAnim = React.useRef(new Animated.Value(100)).current;
  
  React.useEffect(() => {
    if (isRunning) {
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 100,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isRunning]);

  return (
    <Animated.View 
      style={[
        styles.container, 
        { transform: [{ translateY: slideAnim }] }
      ]}
    >
      <View style={styles.buttonContainer}>
        <Button
          title="Pasar"
          onPress={onSkip}
          variant="outline"
          size="large"
          style={styles.button}
          icon={<X color={COLORS.neonPink} size={24} style={styles.icon} />}
        />
        
        <Button
          title="¡Correcto!"
          onPress={onCorrect}
          variant="success"
          size="large"
          style={styles.button}
          icon={<Check color={COLORS.white} size={24} style={styles.icon} />}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    paddingVertical: SIZES.l,
    paddingHorizontal: SIZES.m,
    borderTopLeftRadius: SIZES.radiusLarge,
    borderTopRightRadius: SIZES.radiusLarge,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: SIZES.xs,
  },
  icon: {
    marginRight: SIZES.xs,
  },
});

export default GameControls;