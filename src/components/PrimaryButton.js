import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../constants/colors';

export default function PrimaryButton({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
}) {
  const isLight = variant === 'light';

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        isLight ? styles.light : styles.primary,
        disabled && styles.disabled,
        pressed && styles.pressed,
        style,
      ]}
    >
      <Text style={[styles.label, isLight ? styles.labelLight : styles.labelPrimary]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: colors.primary,
  },
  light: {
    backgroundColor: colors.background,
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.85,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  labelPrimary: {
    color: '#FFFFFF',
  },
  labelLight: {
    color: colors.primary,
  },
});