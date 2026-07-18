const DATE_FILENAME = /^(\d{4})-(\d{2})-(\d{2})\.md$/;

export interface DiaryDate {
  year: number;
  month: number;
  day: number;
  date: string;
}

export function parseDiaryDate(filename: string): DiaryDate | null {
  const match = DATE_FILENAME.exec(filename);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const check = new Date(Date.UTC(year, month - 1, day));
  if (
    check.getUTCFullYear() !== year ||
    check.getUTCMonth() !== month - 1 ||
    check.getUTCDate() !== day
  ) return null;

  return { year, month, day, date: `${match[1]}-${match[2]}-${match[3]}` };
}

export function formatDate(date: Date): string {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-');
}

export function monthKey(year: number, month: number): string {
  return `${year}-${month}`;
}

export function imageBasename(link: string): string {
  return link.split(/[\\/]/).pop()?.split('|', 1)[0] ?? '';
}

export function matchesDatePrefixedImage(link: string, date: string): boolean {
  return imageBasename(link).startsWith(date);
}
