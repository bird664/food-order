import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { verify } = require('jsonwebtoken');

export default (req, res, next) => {
  const token = req.headers.access_token;
  if (!token) return res.status(UNAUTHORIZED).send();
  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (error) {
    return res.status(UNAUTHORIZED).send();
  }
  return next();
};
