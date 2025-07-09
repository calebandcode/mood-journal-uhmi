import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  createEntry,
  getEntry,
  getPublicEntry,
  statsCalendar,
  statsSummanry,
} from '../controllers/journal.controllers.js';

const router = express.Router();

// POST /api/entries – create a mood entry
router.post('/entries', protect, createEntry);

// GET /api/my-entries – get logged-in user’s entries
router.get('/my-entries', protect, getEntry);

// GET /api/public-feed – get all public entries
router.get('/public-feed', getPublicEntry);

// PATCH /api/entries/:id - update entry
router.patch('/entries/:id', protect);

// DELETE /entries/:id - delete entry
router.delete('/entries/:id', protect);

router.get('/stats/summary', protect, statsSummanry);

router.get('/stats/calendar', protect, statsCalendar);

export default router;
