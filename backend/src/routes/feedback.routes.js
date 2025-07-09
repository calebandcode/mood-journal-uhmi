import express from 'express';

const router = express.Router();

router.patch('/entries/:id/feedback', protect, async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id);

    if (!entry || !entry.user.equals(req.user._id)) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const { suggestion, wasHelpful } = req.body;

    entry.suggestionFeedback.push({ suggestion, wasHelpful });
    await entry.save();

    res.json({ message: 'Feedback saved' });
  } catch (err) {
    res.status(500).json({ message: 'Could not save feedback' });
  }
});
