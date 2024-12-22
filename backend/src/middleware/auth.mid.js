import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { verify } = require('jsonwebtoken');
import { UNAUTHORIZED } from '../constants/httpStatus.js'; // Đảm bảo định nghĩa UNAUTHORIZED

export default (req, res, next) => {
  const token = req.headers.access_token;

  if (!token) {
    console.error('Token is missing in headers');
    return res.status(401).send({ message: 'Access token is missing' });
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (error) {
    console.error('Invalid or expired token:', error.message);
    return res.status(401).send({ message: 'Invalid or expired token' });
  }

  next();
};

