import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

// Cartão de nível de dor. A cor reforça o nível, mas ele também é identificado
// por rostinho, nome e medidor de bolinhas (acessível para daltonismo).
export default function PainOption({ level, selected = false, onPress }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={`Dor ${level.label}`}
      onPress={onPress}
      style={[
        styles.card,
        {
          backgroundColor: level.background,
          borderColor: selected ? level.color : level.border,
        },
      ]}
    >
      <Text style={styles.emoji}>{level.emoji}</Text>
      <Text style={[styles.label, selected && styles.labelSelected]}>{level.label}</Text>

      <View style={styles.meter}>
        {[1, 2, 3].map((step) => (
          <View
            key={step}
            style={[
              styles.dot,
              {
                borderColor: level.color,
                backgroundColor: step <= level.score ? level.color : 'transparent',
              },
            ]}
          />
        ))}
      </View>

      {selected && (
        <View style={[styles.check, { backgroundColor: level.color }]}>
          <Ionicons name="checkmark" size={14} color="#FFFFFF" />
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexBasis: '45%',
    flexGrow: 1,
    minHeight: 96,
    paddingVertical: 10,
    borderRadius: 18,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  emoji: {
    fontSize: 30,
    lineHeight: 38,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  labelSelected: {
    fontWeight: '700',
  },
  meter: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 2,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1.5,
  },
  check: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
});