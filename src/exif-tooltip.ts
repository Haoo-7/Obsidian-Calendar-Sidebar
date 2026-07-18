import type { ExifField } from './types';

export interface TooltipText {
  loading: string;
  noData: string;
  noDataDescription: string;
  label: (key: string) => string;
}

export function renderExifTooltip(
  target: HTMLElement,
  fields: ExifField[] | null,
  text: TooltipText,
): void {
  target.replaceChildren();

  if (!fields || fields.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'cal-exif-tooltip-empty';
    const title = document.createElement('div');
    title.textContent = text.noData;
    const description = document.createElement('div');
    description.className = 'cal-exif-tooltip-description';
    description.textContent = text.noDataDescription;
    empty.append(title, description);
    target.appendChild(empty);
    return;
  }

  for (const field of fields) {
    const row = document.createElement('div');
    row.className = 'cal-exif-tooltip-row';
    const label = document.createElement('span');
    label.className = 'cal-exif-tooltip-label';
    label.textContent = text.label(field.key);
    const value = document.createElement('span');
    value.className = 'cal-exif-tooltip-value';
    value.textContent = String(field.value ?? '');
    row.append(label, value);
    target.appendChild(row);
  }
}
