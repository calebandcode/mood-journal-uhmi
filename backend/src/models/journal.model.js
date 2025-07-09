import mongoose from 'mongoose';

const entrySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  mood: {
    type: String, // e.g. "😊", "😔", "😤", "😌"
    required: true,
  },
  intensity: {
    type: String, // 'low' | 'medium' | 'high'
    enum: ['low', 'medium', 'high'],
  },
  trigger: {
    type: String, // optional free text or dropdown
  },
  context: {
    type: String, // e.g. 'morning', 'night', 'weekend', 'with friends'
  },
  suggestionFeedback: [
    {
      suggestion: String,
      wasHelpful: Boolean,
    },
  ],
  note: {
    type: String, // short reflection, optional
    trim: true,
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
  showName: {
    type: Boolean,
    default: false, // public entries show "anonymous" unless user allows name
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Entry', entrySchema);
