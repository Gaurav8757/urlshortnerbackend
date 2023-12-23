import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
const { SECRET } = process.env;

function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Token missing' });
  }

  jwt.verify(token, SECRET, (err, user) => {
    if (err) {
      console.error('Error verifying token:', err);
      return res.status(403).json({ error: 'Forbidden: Invalid token' });
    }

    req.user = user;
    next();
  });
}

export default authenticateToken;
