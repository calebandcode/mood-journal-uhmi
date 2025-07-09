import Entry from '../models/journal.model.js';

export const createEntry = async (req, res) => {
  try {
    const { mood, note, isPublic, showName } = req.body;

    if (!mood) {
      return res.status(400).json({ message: 'Mood is required.' });
    }

    const entry = new Entry({
      user: req.user._id,
      mood,
      note: note || '',
      isPublic: isPublic || false,
      showName: isPublic && showName ? true : false,
    });

    const saved = await entry.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error('Create Entry Error:', error);
    res.status(500).json({ message: 'Server error. Try again.' });
  }
};

export const getEntries = async (req, res) => {
  try {
    const entries = await Entry.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(entries);
  } catch (error) {
    console.error('My Entries Error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

export const getPublicEntry = async (req, res) => {
  try {
    const entries = await Entry.find({ isPublic: true })
      .populate({
        path: 'user',
        select: 'fullName',
      })
      .sort({ createdAt: -1 });

    // Anonymize based on showName flag
    const publicEntries = entries.map((entry) => ({
      _id: entry._id,
      mood: entry.mood,
      note: entry.note,
      createdAt: entry.createdAt,
      user: entry.showName ? entry.user.fullName : 'Anonymous',
    }));

    res.json(publicEntries);
  } catch (error) {
    console.error('Feed Error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

export const updateEntry = async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id);

    if (!entry || !entry.user.equals(req.user._id)) {
      return res
        .status(403)
        .json({ message: 'Not allowed to edit this entry.' });
    }

    const { mood, note, isPublic, showName } = req.body;

    if (mood) entry.mood = mood;
    if (note !== undefined) entry.note = note;
    if (isPublic !== undefined) entry.isPublic = isPublic;
    if (showName !== undefined) entry.showName = showName;

    const updated = await entry.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating entry.' });
  }
};

export const deleteEntry = async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id);

    if (!entry || !entry.user.equals(req.user._id)) {
      return res
        .status(403)
        .json({ message: 'Not allowed to delete this entry.' });
    }

    await entry.deleteOne();
    res.json({ message: 'Entry deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting entry.' });
  }
};

export const statsSummanry = async (req, res) => {
  try {
    const entries = await Entry.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    const recentMoods = entries.slice(0, 5).map((e) => e.mood);
    const moodCount = {};

    let uniqueDates = new Set();

    for (let entry of entries) {
      const date = entry.createdAt.toISOString().split('T')[0];
      uniqueDates.add(date);
      moodCount[entry.mood] = (moodCount[entry.mood] || 0) + 1;
    }

    const mostFrequentMood =
      Object.entries(moodCount).sort((a, b) => b[1] - a[1])[0]?.[0] || null;

    res.json({
      mostFrequentMood,
      recentMoods,
      entryCount: entries.length,
      daysActive: uniqueDates.size,
    });
  } catch (err) {
    res.status(500).json({ message: 'Could not generate mood summary.' });
  }
};

export const statsCalendar = async (req, res) => {
  try {
    const entries = await Entry.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' },
          },
          moods: { $push: '$mood' },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': -1, '_id.month': -1, '_id.day': -1 } },
    ]);

    const calendarData = entries.map((e) => ({
      date: `${e._id.year}-${String(e._id.month).padStart(2, '0')}-${String(
        e._id.day
      ).padStart(2, '0')}`,
      moods: e.moods,
      count: e.count,
    }));

    res.json(calendarData);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching calendar data.' });
  }
};
