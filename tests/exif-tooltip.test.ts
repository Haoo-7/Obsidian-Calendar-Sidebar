import { describe, expect, it } from 'vitest';
import { JSDOM } from 'jsdom';
import { renderExifTooltip } from '../src/exif-tooltip';

describe('EXIF tooltip rendering', () => {
  it('renders EXIF values as text instead of HTML', () => {
    const dom = new JSDOM('<div id="tip"></div>');
    const target = dom.window.document.querySelector('#tip') as HTMLElement;
    const previousDocument = globalThis.document;
    Object.assign(globalThis, { document: dom.window.document });
    try {
      renderExifTooltip(target, [{ key: 'exif_camera', value: '<img src=x onerror=alert(1)>' }], {
        loading: 'Loading',
        noData: 'No data',
        noDataDescription: 'None',
        label: () => 'Camera',
      });
      expect(target.querySelector('img')).toBeNull();
      expect(target.textContent).toContain('<img src=x onerror=alert(1)>');
    } finally {
      Object.assign(globalThis, { document: previousDocument });
    }
  });
});
