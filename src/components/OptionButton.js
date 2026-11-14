import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../constants/colors';

export default function OptionButton({
  label,
  selected = false,
  compact = false,
  onPress,
  style,
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[
        styles.option,
        compact && styles.optionCompact,
        selected && styles.optionSelected,
        style,
      ]}
    >
      <Text
        style={[
          styles.label,
          compact && styles.labelCompact,
          selected && styles.labelSelected,
        ]}
      >
        {label}
      </Text>
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
  optionCompact: {
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 14,
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
  labelCompact: {
    fontSize: 14,
  },
  labelSelected: {
    fontWeight: '700',
  },
});