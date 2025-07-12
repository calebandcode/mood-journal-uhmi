export const suggestionMap = {
  sad: {
    high: [
      {
        title: 'Write 3 things you’re grateful for',
        description:
          'Shift your focus toward the positive, even if it’s small.',
        microTask: {
          type: 'list',
          prompt: 'List 3 things you’re grateful for',
          count: 3,
        },
      },
      {
        title: 'Take a short walk',
        description: 'Walking helps clear your mind and boost endorphins.',
        microTask: {
          type: 'text',
          prompt: 'Describe how you feel after walking',
        },
      },
    ],
  },

  anxious: {
    high: [
      {
        title: 'Use the 5-4-3-2-1 grounding technique',
        description: 'Helps reduce anxiety by anchoring you to the present.',
        microTask: {
          type: 'list',
          prompt: 'List 5 things you can see',
          count: 5,
        },
      },
    ],
  },
};
