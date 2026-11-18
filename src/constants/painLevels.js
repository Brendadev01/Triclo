// color: tom escuro (indicadores); background e border: tons claros do cartão.
// Paleta azul → amarelo → laranja → vermelho-escuro, pensada para daltonismo.
export const PAIN_LEVELS = [
  {
    id: 'none',
    label: 'Sem dor',
    score: 0,
    emoji: '😊',
    color: '#1F5E9E',
    background: '#DCEBFA',
    border: '#9CC2EA',
  },
  {
    id: 'mild',
    label: 'Leve',
    score: 1,
    emoji: '🙂',
    color: '#8A6A00',
    background: '#FFF1B8',
    border: '#E6CF73',
  },
  {
    id: 'medium',
    label: 'Média',
    score: 2,
    emoji: '😣',
    color: '#A64B00',
    background: '#FFDCB8',
    border: '#EBA766',
  },
  {
    id: 'intense',
    label: 'Intensa',
    score: 3,
    emoji: '😖',
    color: '#9C1C1C',
    background: '#F8D0D0',
    border: '#E39A9A',
  },
];

export const MAX_PAIN_SCORE = 3;

export function getPainScore(painLevelId) {
  const level = PAIN_LEVELS.find((item) => item.id === painLevelId);
  return level ? level.score : 0;
}

export function getPainLevelByScore(score) {
  return PAIN_LEVELS.find((item) => item.score === Math.round(score)) ?? PAIN_LEVELS[0];
}

export function getPainLabelByScore(score) {
  return getPainLevelByScore(score).label;
}