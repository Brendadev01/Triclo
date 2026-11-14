import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DateField from '../components/DateField';
import OptionButton from '../components/OptionButton';
import PrimaryButton from '../components/PrimaryButton';
import ScreenContainer from '../components/ScreenContainer';
import TextField from '../components/TextField';
import { colors } from '../constants/colors';
import { useCycle } from '../context/CycleContext';
import { addMonths, daysBetween, formatDate } from '../utils/dateUtils';

const DURATION_QUARTERLY = 'quarterly';
const DURATION_CUSTOM = 'custom';

export default function SetupScreen({ navigation }) {
  const { startCycle } = useCycle();
  const [medicationName, setMedicationName] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [durationMode, setDurationMode] = useState(DURATION_QUARTERLY);
  const [customEndDate, setCustomEndDate] = useState(addMonths(new Date(), 3));

  const endDate =
    durationMode === DURATION_QUARTERLY ? addMonths(startDate, 3) : customEndDate;
  const isEndDateValid = daysBetween(startDate, endDate) > 0;
  const canSubmit = medicationName.trim().length > 0 && isEndDateValid;

  const handleSubmit = async () => {
    await startCycle({ medicationName: medicationName.trim(), startDate, endDate });
    navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
  };

  return (
    <ScreenContainer>
      <Text style={styles.eyebrow}>CONFIGURAÇÃO INICIAL</Text>
      <Text style={styles.title}>Vamos configurar seu anticoncepcional</Text>
      <Text style={styles.description}>
        Informe os dados do seu método anticoncepcional.
      </Text>

      <TextField
        label="Nome da medicação"
        placeholder="Ex.: nome do anticoncepcional"
        value={medicationName}
        onChangeText={setMedicationName}
        autoCapitalize="words"
        returnKeyType="done"
      />

      <DateField label="Data de início" value={startDate} onChange={setStartDate} />

      <View style={styles.group}>
        <Text style={styles.groupLabel}>Duração</Text>
        <View style={styles.row}>
          <OptionButton
            label="3 meses"
            selected={durationMode === DURATION_QUARTERLY}
            onPress={() => setDurationMode(DURATION_QUARTERLY)}
            style={styles.flex}
          />
          <OptionButton
            label="Outro"
            selected={durationMode === DURATION_CUSTOM}
            onPress={() => setDurationMode(DURATION_CUSTOM)}
            style={styles.flex}
          />
        </View>
      </View>

      {durationMode === DURATION_CUSTOM && (
        <DateField
          label="Data de término"
          value={customEndDate}
          onChange={setCustomEndDate}
          minimumDate={startDate}
        />
      )}

      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Término previsto: <Text style={styles.summaryDate}>{formatDate(endDate)}</Text>
        </Text>
      </View>

      {!isEndDateValid && (
        <Text style={styles.warning}>A data de término precisa ser depois do início.</Text>
      )}

      <View style={styles.spacer} />

      <PrimaryButton title="Começar" onPress={handleSubmit} disabled={!canSubmit} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  eyebrow: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },
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
  group: {
    gap: 8,
  },
  groupLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  flex: {
    flex: 1,
  },
  summary: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
  },
  summaryText: {
    fontSize: 14,
    color: colors.textMuted,
  },
  summaryDate: {
    fontWeight: '700',
    color: colors.text,
  },
  warning: {
    fontSize: 14,
    color: '#B3261E',
  },
  spacer: {
    flex: 1,
  },
});