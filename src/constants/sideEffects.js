export const SIDE_EFFECTS = [
  { id: 'migraine', label: 'Enxaqueca', emoji: '🤕' },
  { id: 'bloating', label: 'Inchaço', emoji: '🎈' },
  { id: 'nausea', label: 'Náusea', emoji: '🤢' },
  { id: 'irregularBleeding', label: 'Sangramento irregular', emoji: '🩸' },
  { id: 'moodChanges', label: 'Alteração de humor', emoji: '🎭' },
];

export function getSideEffectLabel(sideEffectId) {
  const sideEffect = SIDE_EFFECTS.find((item) => item.id === sideEffectId);
  return sideEffect ? sideEffect.label : sideEffectId;
}