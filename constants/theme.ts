export const COLORS = {
  // Primary colors
  neonPink: '#FF0099',
  brightPurple: '#8A2BE2',
  deepPurple: '#6A0DAD',
  darkPurple: '#2A0A4A',
  
  // Secondary colors
  electricBlue: '#00BFFF',
  hotPink: '#FF69B4',
  mintGreen: '#00FA9A',
  
  // Functional colors
  success: '#4CD964',
  warning: '#FFCC00',
  error: '#FF3B30',
  
  // Neutral colors
  white: '#FFFFFF',
  lightGray: '#D1D1D6',
  mediumGray: '#8E8E93',
  darkGray: '#3A3A3C',
  black: '#000000',
  
  // Background colors
  backgroundDark: '#121212',
  backgroundLight: '#F5F5F7',
  cardDark: '#1C1C1E',
  cardLight: '#FFFFFF',
  
  // Overlay colors
  overlayLight: 'rgba(255, 255, 255, 0.8)',
  overlayDark: 'rgba(0, 0, 0, 0.7)',
};

export const FONT = {
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  bold: 'Poppins-Bold',
};

export const SIZES = {
  // Font sizes
  xxSmall: 10,
  xSmall: 12,
  small: 14,
  medium: 16,
  large: 18,
  xLarge: 20,
  xxLarge: 24,
  xxxLarge: 30,
  
  // Spacing sizes (following 8px grid)
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 40,
  
  // Border radius
  radiusSmall: 4,
  radiusMedium: 8,
  radiusLarge: 16,
  radiusXLarge: 24,
  
  // Container width
  containerWidth: '90%',
};

export const SHADOWS = {
  small: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 6,
  },
  large: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
};