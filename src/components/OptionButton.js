import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../constants/colors';

export default function OptionButton({ label, selected = false, onPress, style }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[styles.option, selected && styles.optionSelected, style]}
    >
      <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  option: {
    height: 48,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  optionSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.selected,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  labelSelected: {
    fontWeight: '700',
  },
});