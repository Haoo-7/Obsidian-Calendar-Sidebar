import { describe, expect, it } from 'vitest';
import { ThumbnailService } from '../src/thumbnail-service';

describe('thumbnail service', () => {
  it('resolves relative image links and skips missing files', async () => {
    const files: Record<string, any> = {
      'Assets/photo.jpg': { path: 'Assets/photo.jpg', extension: 'jpg' },
      'Assets/photo.heic': { path: 'Assets/photo.heic', extension: 'heic' },
    };
    const app = {
      metadataCache: { getFirstLinkpathDest: (link: string) => files[link] ?? null },
      vault: { getResourcePath: (file: any) => `resource://${file.path}` },
    };
    const heicCache = { getThumbnail: async () => ({ dataUrl: 'data:image/jpeg;base64,thumb' }) };
    const service = new ThumbnailService(app, heicCache);
    expect(service.isImageLink('Assets/photo.jpg')).toBe(true);
    expect(service.isImageLink('Assets/note.md')).toBe(false);
    await expect(service.loadFirst(['missing.png', 'Assets/photo.jpg'], 'Calendar/Daily/2026-07-18.md')).resolves.toMatchObject({
      url: 'resource://Assets/photo.jpg', index: 1,
    });
    await expect(service.load('Assets/photo.heic', 'Calendar/Daily/2026-07-18.md')).resolves.toMatchObject({
      url: 'data:image/jpeg;base64,thumb',
    });
  });
});
