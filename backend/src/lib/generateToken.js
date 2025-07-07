import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION || '7d', // fallback default
  });

  res.cookie('uhmi', token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true, // JS can't access it (protect from XSS)
    sameSite: 'strict', // prevents CSRF from other domains
    secure: process.env.NODE_ENV !== 'development', // send only over HTTPS
  });

  return token;
};
