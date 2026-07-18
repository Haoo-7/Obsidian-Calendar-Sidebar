# EXIF Metadata Display - Design Spec

**Date**: 2026-07-17
**Status**: Implemented and hardened
**Plugin**: calendar-sidebar/main.js

## Overview

Add EXIF metadata reading and display for images embedded in daily notes. The implementation now includes HEIC display, safe text-only tooltip rendering, and opt-in GPS reverse geocoding.

## Architecture

### New Module: `ImageMetadataCache`

Independent class, no changes to existing code paths.

```
ImageMetadataCache
├── constructor(app)
├── _cache: Map<filePath, ImageMeta | null>
├── _pending: Map<filePath, Promise>     // prevents concurrent reads
│
├── get(file: TFile): Promise<ImageMeta | null>
│   └── cache hit → return
│       pending → reuse promise
│       miss → vault.readBinary → exifr.parse → cache → return
│
└── invalidate(filePath?)
```

- Lazy: only reads when user hovers (not on calendar render)
- `null` cache = "no EXIF" (prevents re-parsing)
- `_pending` Map prevents duplicate reads on rapid hover

### EXIF Fields Extracted

| Key | EN Label | ZH Label | Source |
|-----|----------|----------|--------|
| make | Make | 品牌 | exifr tag |
| model | Model | 型号 | exifr tag |
| lens | LensModel | 镜头 | exifr tag |
| date | DateTimeOriginal | 拍摄时间 | exifr tag |
| aperture | FNumber | 光圈 | exifr tag |
| shutter | ExposureTime | 快门 | exifr tag |
| iso | ISO | ISO | exifr tag |
| focalLength | FocalLength | 焦距 | exifr tag |
| gps | GPSLatitude/GPSLongitude | GPS | exifr tag (raw coords) |
| software | Software | 软件 | exifr tag |

GPS displays raw coordinates by default. Reverse geocoding is opt-in and uses Nominatim only after the user enables it.

### Tooltip

- **Trigger**: hover 500ms on day cell with images
- **Dismiss**: mouse leaves cell
- **States**: loading → metadata / no-exif
- **Style**: frosted glass (match weather overlay)
- **Position**: right of cell, flips left if near edge
- **Language**: via existing `_l()` locale system

### Settings

One toggle: `showExif` (boolean, default true)

GPS reverse geocoding is controlled separately by `exifReverseGeocode` and defaults to false.

```
☑ Show image EXIF metadata
   Display camera settings and capture info on hover
```

### Performance

- No binary reads during calendar render
- Cache persists across month switches
- Memory: ~500 bytes per cached image (negligible)
- Cache invalidated on file modify via existing `_onFileChanged` hook
- Tooltip values are rendered as text nodes and are never interpreted as HTML

## Changes Required

| Change | Location | Lines |
|--------|----------|-------|
| ImageMetadataCache class | main.js (new section) | ~60 |
| Tooltip DOM + handlers | CalendarView.render() | ~50 |
| Tooltip CSS | existing style block | ~40 |
| Setting toggle | MySettingsTab.display() | ~10 |
| Locale strings (zh/en) | LOCALE object | ~20 |
| npm: exifr | package.json | dependency |

**Total**: ~180 lines, all additive, no existing code modified.

## Dependencies

- The release uses the bundled zero-dependency parser for JPEG, PNG, WebP and HEIC.
- No native addons, pure JS, compatible with Obsidian's Electron runtime

## Out of Scope (Phase 2)

- ~~HEIC to JPEG conversion~~ (implemented)
- ~~GPS reverse geocoding~~ (implemented as an opt-in feature)
- Batch EXIF extraction
- Persistent disk cache
