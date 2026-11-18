import { useMemo } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import HealthNotice from '../components/HealthNotice';
import ScreenContainer from '../components/ScreenContainer';
import { colors } from '../constants/colors';
import { getPainLevelByScore, MAX_PAIN_SCORE } from '../constants/painLevels';
import { useCycle } from '../context/CycleContext';
import { hasClearBest, summarizeMedications } from '../utils/historyUtils';

const HEALTH_NOTICE =
  'Este histórico é apenas um registro pessoal e não substitui orientação médica. Converse com seu médico antes de trocar de medicação.';

// \u00A0 é um espaço que não quebra linha: mantém "náusea (1 de 1)" sempre junto.
const NBSP = '\u00A0';

export default function HistoryScreen({ navigation }) {
  const { activeCycle, records, resetData } = useCycle();
  const summaries = useMemo(() => summarizeMedications(records), [records]);
  const showBest = hasClearBest(summaries);
  const hasData = Boolean(activeCycle) || records.length > 0;

  const handleClearData = () => {
    Alert.alert(
      'Apagar todos os dados?',
      'Isso remove o ciclo atual e todo o histórico deste aparelho. Essa ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Apagar',
          style: 'destructive',
          onPress: async () => {
            await resetData();
            // A abertura está na pilha principal, que é o "pai" das abas
            const rootNavigation = navigation.getParent() ?? navigation;
            rootNavigation.reset({ index: 0, routes: [{ name: 'Welcome' }] });
          },
        },
      ]
    );
  };

  return (
    <ScreenContainer>
      <Text style={styles.title}>Compare suas medicações</Text>

      {records.length === 0 ? (
        <Text style={styles.description}>
          Ainda não há registros. Ao finalizar um ciclo, a comparação aparece aqui.
        </Text>
      ) : (
        <>
          {summaries.map((summary, index) => {
            const isBest = showBest && index === 0;
            const painLevel = getPainLevelByScore(summary.averagePain);
            // Mínimo de 6% para que "Sem dor" ainda mostre um pedacinho colorido
            const fillPercent = Math.max((summary.averagePain / MAX_PAIN_SCORE) * 100, 6);
            const cyclesLabel = `${summary.cyclesCount} ${summary.cyclesCount === 1 ? 'ciclo' : 'ciclos'}`;
            const effectsText =
              summary.effects.length > 0
                ? summary.effects
                    .slice(0, 3)
                    .map(
                      (effect) =>
                        `${effect.label.toLowerCase()}${NBSP}(${effect.count}${NBSP}de${NBSP}${summary.cyclesCount})`
                    )
                    .join(', ')
                : 'nenhum registrado';

            return (
              <View key={summary.key} style={[styles.card, isBest && styles.cardBest]}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardName}>{summary.name}</Text>
                  <Text style={isBest ? styles.bestTag : styles.cyclesCount}>
                    {isBest ? 'Melhor resultado' : cyclesLabel}
                  </Text>
                </View>

                <View style={styles.track}>
                  <View
                    style={[
                      styles.fill,
                      { width: `${fillPercent}%`, backgroundColor: painLevel.color },
                    ]}
                  />
                </View>

                <Text style={styles.detail}>
                  {painLevel.emoji} Dor média:{' '}
                  <Text style={styles.detailStrong}>{painLevel.label}</Text>
                  {isBest ? ` · ${cyclesLabel}` : ''}
                </Text>
                <Text style={styles.detail}>
                  Efeitos: <Text style={styles.detailStrong}>{effectsText}</Text>
                </Text>
              </View>
            );
          })}

          <HealthNotice message={HEALTH_NOTICE} />
        </>
      )}

      {hasData && (
        <Pressable
          accessibilityRole="button"
          onPress={handleClearData}
          style={styles.clearButton}
        >
          <Text style={styles.clearText}>Apagar todos os dados</Text>
        </Pressable>
      )}
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
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.surface,
    padding: 20,
    gap: 12,
  },
  cardBest: {
    borderColor: colors.primary,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardName: {
    flexShrink: 1,
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  cyclesCount: {
    fontSize: 13,
    color: colors.textMuted,
  },
  bestTag: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },
  track: {
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.trackEmpty,
    overflow: 'hidden',
  },
  fill: {
    height: 10,
    borderRadius: 5,
  },
  detail: {
    fontSize: 14,
    color: colors.textMuted,
  },
  detailStrong: {
    fontWeight: '700',
    color: colors.text,
  },
  clearButton: {
    alignSelf: 'center',
    padding: 12,
  },
  clearText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#B3261E',
  },
});