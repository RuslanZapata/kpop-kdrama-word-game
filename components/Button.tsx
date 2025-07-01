import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ViewStyle, 
  TextStyle, 
  ActivityIndicator 
} from 'react-native';
import { COLORS, FONT, SIZES, SHADOWS } from '@/constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'success' | 'error';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

const Button = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  loading = false,
  style,
  textStyle,
  icon
}: ButtonProps) => {
  
  const getVariantStyle = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: COLORS.neonPink,
          borderColor: COLORS.neonPink,
        };
      case 'secondary':
        return {
          backgroundColor: COLORS.brightPurple,
          borderColor: COLORS.brightPurple,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderColor: COLORS.neonPink,
          borderWidth: 2,
        };
      case 'success':
        return {
          backgroundColor: COLORS.success,
          borderColor: COLORS.success,
        };
      case 'error':
        return {
          backgroundColor: COLORS.error,
          borderColor: COLORS.error,
        };
      default:
        return {
          backgroundColor: COLORS.neonPink,
          borderColor: COLORS.neonPink,
        };
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: SIZES.s,
          paddingHorizontal: SIZES.m,
          borderRadius: SIZES.radiusMedium,
        };
      case 'medium':
        return {
          paddingVertical: SIZES.m,
          paddingHorizontal: SIZES.l,
          borderRadius: SIZES.radiusMedium,
        };
      case 'large':
        return {
          paddingVertical: SIZES.l,
          paddingHorizontal: SIZES.xl,
          borderRadius: SIZES.radiusLarge,
        };
      default:
        return {
          paddingVertical: SIZES.m,
          paddingHorizontal: SIZES.l,
          borderRadius: SIZES.radiusMedium,
        };
    }
  };

  const getTextStyle = () => {
    const baseStyle = {
      color: variant === 'outline' ? COLORS.neonPink : COLORS.white,
      fontFamily: FONT.bold,
    };

    switch (size) {
      case 'small':
        return { ...baseStyle, fontSize: SIZES.small };
      case 'medium':
        return { ...baseStyle, fontSize: SIZES.medium };
      case 'large':
        return { ...baseStyle, fontSize: SIZES.large };
      default:
        return { ...baseStyle, fontSize: SIZES.medium };
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getVariantStyle(),
        getSizeStyle(),
        disabled && styles.disabled,
        SHADOWS.medium,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'outline' ? COLORS.neonPink : COLORS.white} 
          size="small" 
        />
      ) : (
        <>
          {icon}
          <Text style={[getTextStyle(), textStyle]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.radiusMedium,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default Button;