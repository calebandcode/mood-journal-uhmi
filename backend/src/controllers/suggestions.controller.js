import { getSuggestions } from '../lib/getSuggestion.js';

export const suggestion = (req, res) => {
  const { mood, intensity = 'medium' } = req.query;

  if (!mood) {
    return res.status(400).json({ message: 'Mood is required.' });
  }

  try {
    const suggestions = getSuggestions(mood, intensity);
    res.json(suggestions);
  } catch (error) {
    console.error('Suggestion route error:', error);
    res.status(500).json({ message: 'Could not generate suggestions.' });
  }
};
