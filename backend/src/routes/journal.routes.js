import express from 'express';
import JournalEntry from '../models/journal.model.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

// ✅ POST /api/entries - Create entry
router.post('/entries', protect, async (req, res) => {
  const { content, mood, isPublic } = req.body;

  if (!content || !mood) {
    return res.status(400).json({ message: 'Content and mood are required.' });
  }

  const entry = new JournalEntry({
    user: req.user._id,
    content,
    mood,
    isPublic: isPublic || false,
  });

  await entry.save();
  res.status(201).json(entry);
});

// ✅ GET /api/entries - Get user's entries
router.get('/entries', protect, async (req, res) => {
  const entries = await JournalEntry.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  res.json(entries);
});

// ✅ GET /api/feed - Get all public entries
router.get('/feed', async (req, res) => {
  const entries = await JournalEntry.find({ isPublic: true })
    .populate('user', 'fullName') // Only show name
    .sort({ createdAt: -1 });

  res.json(entries);
});

export default router;
