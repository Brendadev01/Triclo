import { getPainScore } from '../constants/painLevels';
import { getSideEffectLabel } from '../constants/sideEffects';

// Agrupa os registros por medicação e calcula dor média e efeitos mais frequentes.
// O resultado vem ordenado: a medicação com menos dor (e menos efeitos) fica primeiro.
export function summarizeMedications(records) {
  const groups = {};

  records.forEach((record) => {
    const key = record.medicationName.trim().toLowerCase();
    if (!groups[key]) {
      groups[key] = { key, name: record.medicationName.trim(), records: [] };
    }
    groups[key].records.push(record);
  });

  const summaries = Object.values(groups).map((group) => {
    const cyclesCount = group.records.length;
    const totalPain = group.records.reduce(
      (sum, record) => sum + getPainScore(record.painLevel),
      0
    );

    const effectCounts = {};
    let totalEffects = 0;
    group.records.forEach((record) => {
      (record.sideEffects || []).forEach((effectId) => {
        effectCounts[effectId] = (effectCounts[effectId] || 0) + 1;
        totalEffects += 1;
      });
    });

    const effects = Object.entries(effectCounts)
      .map(([id, count]) => ({ id, label: getSideEffectLabel(id), count }))
      .sort((a, b) => b.count - a.count);

    return {
      key: group.key,
      name: group.name,
      cyclesCount,
      averagePain: totalPain / cyclesCount,
      averageEffects: totalEffects / cyclesCount,
      effects,
    };
  });

  return summaries.sort(
    (a, b) => a.averagePain - b.averagePain || a.averageEffects - b.averageEffects
  );
}

// Só destaca "melhor resultado" quando há pelo menos duas medicações e a primeira é melhor de fato.
export function hasClearBest(summaries) {
  if (summaries.length < 2) return false;
  const [first, second] = summaries;
  return (
    first.averagePain < second.averagePain || first.averageEffects < second.averageEffects
  );
}