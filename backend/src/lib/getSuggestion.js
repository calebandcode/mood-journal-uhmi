// lib/suggestionEngine.js
import { suggestionMap } from '../lib/data/suggestionMap.js';

export const getSuggestions = (mood, intensity) => {
  const base = suggestionMap[mood]?.[intensity] || [];

  return base.map((text) => ({
    title: text,
    description: '— add a short explanation here later —',
  }));
};
