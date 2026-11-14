import { StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import ScreenContainer from '../components/ScreenContainer';
import { colors } from '../constants/colors';
import { useCycle } from '../context/CycleContext';
import { daysBetween, formatDate } from '../utils/dateUtils';

export default function HomeScreen({ navigation }) {
  const { activeCycle } = useCycle();

  if (!activeCycle) {
    return (
      <ScreenContainer>
        <Text style={styles.title}>Nenhum ciclo em andamento</Text>
        <Text style={styles.description}>
          Cadastre sua medicação para acompanhar o próximo ciclo.
        </Text>
        <PrimaryButton title="Iniciar novo ciclo" onPress={() => navigation.navigate('Setup')} />
      </ScreenContainer>
    );
  }

  const { medicationName, startDate, endDate } = activeCycle;
  const totalDays = daysBetween(startDate, endDate);
  const elapsedDays = daysBetween(startDate, new Date()) + 1;
  const currentDay = Math.min(Math.max(elapsedDays, 1), totalDays);
  const progress = totalDays > 0 ? currentDay / totalDays : 0;
  const isFinished = daysBetween(new Date(), endDate) <= 0;

  return (
    <ScreenContainer>
      <Text style={styles.description}>Olá! Seu ciclo atual:</Text>

      <View style={styles.card}>
        <Text style={styles.cardMedication}>{medicationName}</Text>
        <Text style={styles.cardDay}>
          Dia {currentDay}
          <Text style={styles.cardTotal}> de {totalDays}</Text>
        </Text>
        <View style={styles.track}>
          <View style={[styles.fill, { width: `${progress * 100}%` }]} />
        </View>
        <View style={styles.dates}>
          <Text style={styles.cardDate}>Início {formatDate(startDate)}</Text>
          <Text style={styles.cardDate}>Fim {formatDate(endDate)}</Text>
        </View>
      </View>

      <View style={styles.info}>
        <Text style={styles.infoText}>
          {isFinished
            ? 'Seu ciclo terminou. Registre como foi a menstruação.'
            : 'Próxima etapa: registrar como foi a menstruação ao final do ciclo.'}
        </Text>
      </View>

      <PrimaryButton
        title="Registrar fim do ciclo"
        onPress={() => navigation.navigate('Register')}
      />
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
  card: {
    backgroundColor: colors.primary,
    borderRadius: 24,
    padding: 24,
    gap: 16,
  },
  cardMedication: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  cardDay: {
    fontSize: 44,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  cardTotal: {
    fontSize: 18,
    fontWeight: '500',
  },
  track: {
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.3)',
    overflow: 'hidden',
  },
  fill: {
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primaryLight,
  },
  dates: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardDate: {
    fontSize: 13,
    color: '#FFFFFF',
  },
  info: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
  },
  infoText: {
    fontSize: 14,
    color: colors.textMuted,
  },
});