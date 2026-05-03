const logger = require('../utils/logger');
const { verifyAccessToken } = require('../utils/tokenGenerator');

const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      logger.warn('No authorization header provided');
      return res.status(401).json({
        success: false,
        error: 'No token provided',
        message: 'Authorization token is required',
      });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      logger.warn('Malformed authorization header');
      return res.status(401).json({
        success: false,
        error: 'Malformed token',
        message: 'Authorization header format should be: Bearer <token>',
      });
    }

    const user = verifyAccessToken(token);
    req.user = user;
    next();
  } catch (error) {
    logger.error('Token verification failed:', error.message);
    return res.status(401).json({
      success: false,
      error: 'Invalid or expired token',
      message: error.message,
    });
  }
};

module.exports = { authenticateToken };
