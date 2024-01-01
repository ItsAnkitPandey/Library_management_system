import jwt from 'jsonwebtoken';

const JWT_SECRET = "admin";

const userAuthMiddleware = (req, res, next) => {
  // Get the token from the request headers
  const token = req.header('authtoken');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach user information to the request
    req.user = decoded.user;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export default userAuthMiddleware;
