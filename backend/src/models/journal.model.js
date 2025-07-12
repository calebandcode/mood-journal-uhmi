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
    default: false,
  },

  suggestionFeedback: [
    {
      suggestion: {
        type: String,
        required: true,
      },
      wasHelpful: {
        type: Boolean,
        default: null,
      },

      // micro-task info embedded here
      microTask: {
        type: {
          type: String, // 'text' | 'list' | 'timer'
          enum: ['text', 'list', 'timer'],
        },
        prompt: String,
        count: Number, // only applies to type === 'list'
        input: [String], // user’s response(s)
        done: {
          type: Boolean,
          default: false,
        },
      },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Entry', entrySchema);
