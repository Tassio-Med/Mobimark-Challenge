import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

const Button = ({ 
  title, 
  onPress, 
  loading = false, 
  disabled = false,
  variant = 'primary' 
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[`button_${variant}`],
        disabled && styles.button_disabled
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'primary' ? theme.colors.white : theme.colors.primary} 
        />
      ) : (
        <Text style={[
          styles.text,
          styles[`text_${variant}`],
          disabled && styles.text_disabled
        ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50
  },
  button_primary: {
    backgroundColor: theme.colors.primary
  },
  button_secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.primary
  },
  button_disabled: {
    backgroundColor: theme.colors.lightGray,
    borderColor: theme.colors.lightGray
  },
  text: {
    fontSize: 16,
    fontWeight: '600'
  },
  text_primary: {
    color: theme.colors.white
  },
  text_secondary: {
    color: theme.colors.primary
  },
  text_disabled: {
    color: theme.colors.gray
  }
});

export default Button;