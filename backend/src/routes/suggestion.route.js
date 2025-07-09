import express from 'express';
import { suggestionMap } from '../data/suggestionMap.js';
import { protect } from '../middleware/authMiddleware.js';
import { suggestion } from '../controllers/suggestions.controller.js';

const router = express.Router();

// GET /api/suggestions?mood=sad&intensity=high
router.get('/', protect, suggestion);

export default router;
