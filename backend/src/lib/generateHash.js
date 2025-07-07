import bcrypt from 'bcryptjs';

export const generateHash = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    console.error('Error generating hash:', error);
    throw new Error('Hash generation failed');
  }
};
