import { suggestionMap } from '../lib/data/suggestionMap.js';

/**
 * Returns structured suggestions with micro-task support
 * @param {string} mood - e.g. "sad", "anxious"
 * @param {string} intensity - e.g. "low", "high"
 * @returns {Array} array of suggestions (max 3)
 */
export const getSuggestions = (mood, intensity) => {
  const base = suggestionMap[mood]?.[intensity] || [];

  return base.slice(0, 3).map((item) => ({
    title: item.title,
    description: item.description,
    microTask: item.microTask
      ? {
          type: item.microTask.type || 'text',
          prompt: item.microTask.prompt,
          count: item.microTask.count || undefined, // only for 'list'
        }
      : null,
  }));
};
