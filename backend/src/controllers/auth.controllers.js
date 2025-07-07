import bcrypt from 'bcryptjs';
import { generateHash } from '../lib/generateHash.js';
import { generateToken } from '../lib/generateToken.js';
import User from '../models/user.model.js';

export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Early returns on bad input
    if (!email || !password || !fullName) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: 'Password must be at least 6 characters long.' });
    }

    const existingUser = await User.findOne({ email });

    // Always return after response
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    const passwordHash = await generateHash(password);

    const newUser = new User({
      fullName,
      email,
      passwordHash,
    });

    await newUser.save(); // Save before generating token (safer order)

    await generateToken(newUser._id, res);

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
    });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Early return
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    await generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie('uhmi', '', { maxAge: 0, httpOnly: true, sameSite: 'lax' });
    res.status(200).json({ message: 'Logout Successful' });
  } catch (error) {
    console.error('Logout Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
