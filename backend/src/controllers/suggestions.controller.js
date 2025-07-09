export const suggestion = (req, res) => {
  const { mood, intensity = 'medium' } = req.query;

  if (!mood || !suggestionMap[mood]) {
    return res.status(400).json({ message: 'Invalid or missing mood.' });
  }

  const suggestions =
    suggestionMap[mood][intensity] || suggestionMap[mood]['medium'] || [];

  res.json(suggestions.slice(0, 3)); // Limit to top 3 suggestions
};
