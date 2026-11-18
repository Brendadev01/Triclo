import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import OptionButton from '../components/OptionButton';
import PainOption from '../components/PainOption';
import PrimaryButton from '../components/PrimaryButton';
import ScreenContainer from '../components/ScreenContainer';
import TextField from '../components/TextField';
import { colors } from '../constants/colors';
import { PAIN_LEVELS } from '../constants/painLevels';
import { SIDE_EFFECTS } from '../constants/sideEffects';
import { useCycle } from '../context/CycleContext';
import { formatDate } from '../utils/dateUtils';

export default function RegisterScreen({ navigation }) {
  const { activeCycle, finishCycle } = useCycle();
  const [painLevel, setPainLevel] = useState(null);
  const [sideEffects, setSideEffects] = useState([]);
  const [hasNoSideEffects, setHasNoSideEffects] = useState(false);
  const [notes, setNotes] = useState('');

  if (!activeCycle) {
    return (
      <ScreenContainer>
        <Text style={styles.title}>Nenhum ciclo para registrar</Text>
        <Text style={styles.description}>
          Cadastre sua medicação para começar um novo ciclo.
        </Text>
        <PrimaryButton title="Iniciar novo ciclo" onPress={() => navigation.navigate('Setup')} />
      </ScreenContainer>
    );
  }

  const toggleSideEffect = (effectId) => {
    setHasNoSideEffects(false);
    setSideEffects((current) =>
      current.includes(effectId)
        ? current.filter((id) => id !== effectId)
        : [...current, effectId]
    );
  };

  const toggleNoSideEffects = () => {
    const next = !hasNoSideEffects;
    setHasNoSideEffects(next);
    if (next) {
      setSideEffects([]);
    }
  };

  const resetForm = () => {
    setPainLevel(null);
    setSideEffects([]);
    setHasNoSideEffects(false);
    setNotes('');
  };

  const handleSave = async () => {
    await finishCycle({ painLevel, sideEffects, notes: notes.trim() });
    resetForm();
    navigation.navigate('History');
  };

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>FIM DO CICLO</Text>
        <Text style={styles.title}>Como foi sua dor neste ciclo?</Text>
      </View>

      <View style={styles.pill}>
        <Text style={styles.pillText}>
          💊 {activeCycle.medicationName} · {formatDate(activeCycle.startDate)} a{' '}
          {formatDate(activeCycle.endDate)}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Nível de dor</Text>
        <View style={styles.painGrid}>
          {PAIN_LEVELS.map((level) => (
            <PainOption
              key={level.id}
              level={level}
              selected={painLevel === level.id}
              onPress={() => setPainLevel(level.id)}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Sentiu mais alguma coisa?</Text>
        <View style={styles.chips}>
          {SIDE_EFFECTS.map((effect) => (
            <OptionButton
              key={effect.id}
              compact
              label={`${effect.emoji} ${effect.label}`}
              selected={sideEffects.includes(effect.id)}
              onPress={() => toggleSideEffect(effect.id)}
            />
          ))}
          <OptionButton
            compact
            label="✅ Nenhum"
            selected={hasNoSideEffects}
            onPress={toggleNoSideEffects}
          />
        </View>
      </View>

      <TextField
        label="Quer anotar algo? (opcional)"
        placeholder="Ex.: cólica mais forte no 2º dia"
        value={notes}
        onChangeText={setNotes}
        multiline
      />

      <View style={styles.spacer} />

      <PrimaryButton title="Salvar registro" onPress={handleSave} disabled={!painLevel} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 6,
  },
  eyebrow: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    lineHeight: 32,
    color: colors.text,
  },
  description: {
    fontSize: 15,
    color: colors.textMuted,
  },
  pill: {
    alignSelf: 'flex-start',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  pillText: {
    fontSize: 13,
    color: colors.textMuted,
  },
  section: {
    gap: 10,
  },
  sectionLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  painGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  spacer: {
    flex: 1,
  },
});