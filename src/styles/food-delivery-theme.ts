// Visually Stable Floating Charcoal-Frosted-Glassmorphism Theme
export const foodDeliveryTheme = {
  colors: {
    // Primary background - Deep Charcoal
    background: '#212121',
    backgroundSecondary: '#2A2A2A',
    
    // Translucent surfaces for floating elements
    surface: 'rgba(255, 255, 255, 0.08)',
    surfaceHover: 'rgba(255, 255, 255, 0.12)',
    
    // Text colors
    textPrimary: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.7)',
    textMuted: 'rgba(255, 255, 255, 0.5)',
    
    // Sunset gradient for interactive elements
    gradientStart: '#FF5F6D',
    gradientEnd: '#FFC371',
    
    // Status colors
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
  },
  
  effects: {
    // Glassmorphism backdrop blur
    backdropBlur: 'blur(20px)',
    
    // Floating element shadows
    floatingShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    hoverShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
    
    // Subtle glow for interactive elements
    interactiveGlow: '0 0 20px rgba(255, 95, 109, 0.3)',
  },
  
  borderRadius: {
    small: '8px',
    medium: '12px',
    large: '16px',
    xl: '24px',
  },
  
  spacing: {
    xs: '4px',
    sm: '8px', 
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  
  typography: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    sizes: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
    },
    weights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
};