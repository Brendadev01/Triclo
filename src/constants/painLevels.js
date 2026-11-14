export const PAIN_LEVELS = [
  { id: 'none', label: 'Sem dor', score: 0 },
  { id: 'mild', label: 'Leve', score: 1 },
  { id: 'medium', label: 'Média', score: 2 },
  { id: 'intense', label: 'Intensa', score: 3 },
];

export const MAX_PAIN_SCORE = 3;

export function getPainScore(painLevelId) {
  const level = PAIN_LEVELS.find((item) => item.id === painLevelId);
  return level ? level.score : 0;
}

export function getPainLabelByScore(score) {
  const level = PAIN_LEVELS.find((item) => item.score === Math.round(score));
  return level ? level.label : '';
}