export const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif', 'heic', 'heif'];
export const HEIC_EXTENSIONS = ['heic', 'heif'];

export interface ThumbnailResult {
  url: string;
  path: string;
  index: number;
}

export class ThumbnailService {
  private readonly app: any;
  private readonly heicCache: any;

  constructor(app: any, heicCache: any) {
    this.app = app;
    this.heicCache = heicCache;
  }

  isImageFile(file: any): boolean {
    return Boolean(file?.extension && IMAGE_EXTENSIONS.includes(String(file.extension).toLowerCase()));
  }

  isImageLink(link: string): boolean {
    const clean = String(link || '').split('|', 1)[0].split(/[\\/]/).pop() || '';
    return IMAGE_EXTENSIONS.includes(clean.split('.').pop()?.toLowerCase() || '');
  }

  resolve(link: string, sourcePath: string): any | null {
    const file = this.app.metadataCache.getFirstLinkpathDest(String(link).split('|', 1)[0], sourcePath);
    return this.isImageFile(file) ? file : null;
  }

  async load(link: string, sourcePath: string, index = 0): Promise<ThumbnailResult | null> {
    const file = this.resolve(link, sourcePath);
    if (!file) return null;
    try {
      const ext = String(file.extension).toLowerCase();
      const url = HEIC_EXTENSIONS.includes(ext)
        ? (await this.heicCache?.getThumbnail(file))?.dataUrl
        : this.app.vault.getResourcePath(file);
      return url ? { url, path: file.path, index } : null;
    } catch (_) {
      return null;
    }
  }

  async loadFirst(links: string[], sourcePath: string): Promise<ThumbnailResult | null> {
    for (let index = 0; index < links.length; index++) {
      const result = await this.load(links[index], sourcePath, index);
      if (result) return result;
    }
    return null;
  }
}
