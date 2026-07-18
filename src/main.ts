import DaylinePlugin from './plugin';

declare const module: { exports: unknown };

// Obsidian loads main.js as a CommonJS plugin class.
module.exports = DaylinePlugin;
