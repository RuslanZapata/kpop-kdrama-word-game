import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { COLORS, FONT, SIZES } from '@/constants/theme';

interface TimerProps {
  seconds: number;
  isRunning: boolean;
  onTimeUp: () => void;
}

const Timer = ({ seconds, isRunning, onTimeUp }: TimerProps) => {
  const [timeLeft, setTimeLeft] = React.useState(seconds);
  const timeAnimation = useRef(new Animated.Value(1)).current;
  const pulseAnimation = useRef(new Animated.Value(1)).current;

  // Start the pulse animation
  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1.1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );
    
    if (timeLeft <= 10 && isRunning) {
      pulse.start();
    } else {
      pulseAnimation.setValue(1);
      pulse.stop();
    }
    
    return () => pulse.stop();
  }, [timeLeft, isRunning]);

  // Timer countdown logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1;
          
          // Animate the timer progress
          Animated.timing(timeAnimation, {
            toValue: newTime / seconds,
            duration: 1000,
            useNativeDriver: false,
          }).start();
          
          return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      onTimeUp();
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  // Reset timer when seconds prop changes
  useEffect(() => {
    setTimeLeft(seconds);
    timeAnimation.setValue(1);
  }, [seconds]);

  // Format time as MM:SS
  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const remainingSeconds = timeLeft % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Determine color based on time left
  const getTimerColor = () => {
    if (timeLeft <= 10) return COLORS.error;
    if (timeLeft <= 30) return COLORS.warning;
    return COLORS.success;
  };

  const progressWidth = timeAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <Animated.View 
          style={[
            styles.progressBar, 
            { 
              backgroundColor: getTimerColor(),
              width: progressWidth
            }
          ]} 
        />
        <Animated.View 
          style={[
            styles.timeTextContainer,
            { transform: [{ scale: timeLeft <= 10 && isRunning ? pulseAnimation : 1 }] }
          ]}
        >
          <Text style={[styles.timeText, { color: getTimerColor() }]}>
            {formatTime()}
          </Text>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginVertical: SIZES.m,
  },
  timerContainer: {
    width: '80%',
    height: 40,
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.radiusMedium,
    overflow: 'hidden',
    position: 'relative',
  },
  progressBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    borderRadius: SIZES.radiusMedium,
  },
  timeTextContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
  },
});

export default Timer;