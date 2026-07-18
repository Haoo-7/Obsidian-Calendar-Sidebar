export type MoodScore = -2 | -1 | 0 | 1 | 2;

export const MOOD_LEVELS = [
  { score: -2 as MoodScore, labelKey: 'veryLow', color: '#d84b76' },
  { score: -1 as MoodScore, labelKey: 'low', color: '#e68a3b' },
  { score: 0 as MoodScore, labelKey: 'neutral', color: '#d9bd4c' },
  { score: 1 as MoodScore, labelKey: 'good', color: '#56a86a' },
  { score: 2 as MoodScore, labelKey: 'veryGood', color: '#4b93d1' },
];

export const MOOD_LABELS = [
  { id: 'calm', label: 'Calm' },
  { id: 'grateful', label: 'Grateful' },
  { id: 'anxious', label: 'Anxious' },
  { id: 'tired', label: 'Tired' },
  { id: 'energized', label: 'Energized' },
  { id: 'hopeful', label: 'Hopeful' },
  { id: 'sad', label: 'Sad' },
  { id: 'focused', label: 'Focused' },
];

export function moveMoodScore(score: MoodScore | null, direction: -1 | 1): MoodScore {
  const current = score === null ? 2 : score;
  const index = MOOD_LEVELS.findIndex((level) => level.score === current);
  return MOOD_LEVELS[Math.max(0, Math.min(MOOD_LEVELS.length - 1, index + direction))].score;
}

export function getMoodColor(score: MoodScore | number | undefined): string {
  return MOOD_LEVELS.find((level) => level.score === score)?.color ?? 'var(--background-modifier-border)';
}
