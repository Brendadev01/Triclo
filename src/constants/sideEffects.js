export const SIDE_EFFECTS = [
  { id: 'migraine', label: 'Enxaqueca' },
  { id: 'bloating', label: 'Inchaço' },
  { id: 'nausea', label: 'Náusea' },
  { id: 'irregularBleeding', label: 'Sangramento irregular' },
  { id: 'moodChanges', label: 'Alteração de humor' },
];

export function getSideEffectLabel(sideEffectId) {
  const sideEffect = SIDE_EFFECTS.find((item) => item.id === sideEffectId);
  return sideEffect ? sideEffect.label : sideEffectId;
}