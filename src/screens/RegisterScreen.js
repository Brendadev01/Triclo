import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import OptionButton from '../components/OptionButton';
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
      <Text style={styles.title}>Como foi a dor neste ciclo?</Text>
      <Text style={styles.description}>
        {activeCycle.medicationName} · {formatDate(activeCycle.startDate)} a{' '}
        {formatDate(activeCycle.endDate)}
      </Text>

      <View style={styles.options}>
        {PAIN_LEVELS.map((level) => (
          <OptionButton
            key={level.id}
            label={level.label}
            selected={painLevel === level.id}
            onPress={() => setPainLevel(level.id)}
            style={styles.painOption}
          />
        ))}
      </View>

      <View style={styles.group}>
        <Text style={styles.groupLabel}>Efeitos colaterais</Text>
        <View style={styles.chips}>
          {SIDE_EFFECTS.map((effect) => (
            <OptionButton
              key={effect.id}
              compact
              label={effect.label}
              selected={sideEffects.includes(effect.id)}
              onPress={() => toggleSideEffect(effect.id)}
            />
          ))}
          <OptionButton
            compact
            label="Nenhum"
            selected={hasNoSideEffects}
            onPress={toggleNoSideEffects}
          />
        </View>
      </View>

      <TextField
        label="Observações (opcional)"
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
  title: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 34,
    color: colors.text,
  },
  description: {
    fontSize: 15,
    color: colors.textMuted,
  },
  options: {
    gap: 10,
  },
  painOption: {
    alignItems: 'flex-start',
  },
  group: {
    gap: 8,
  },
  groupLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
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