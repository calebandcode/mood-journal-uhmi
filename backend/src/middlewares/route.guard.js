import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const routeGuard = async (req, res, next) => {
  try {
    const token = req.cookie.uhmi;

    if (!token) {
      return res
        .status(401)
        .json({ message: 'Unauthorized - No Token Provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: 'Unauthorized - Invalid Token' });
    }

    const user = await findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log('Error in route guard:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
