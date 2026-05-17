const User = require('../models/User');
const logger = require('../utils/logger');
const {
  generateAccessToken,
  generateRefreshToken,
} = require('../utils/tokenGenerator');

const login = (username) => {
  try {
    const user = User.findByEmail(username);

    if (!user) {
      logger.warn(`Login failed: User not found - ${username}`);
      return { success: false, error: 'Invalid user credentials' };
    }

    const payload = {
      sub: user.id,
      name: user.name,
      role: user.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    logger.info(`User logged in successfully: ${user.name}`);

    return {
      success: true,
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
      },
    };
  } catch (error) {
    logger.error('Login error:', error.message);
    return { success: false, error: error.message };
  }
};

const refreshAccessToken = (payload) => {
  try {
    const newPayload = {
      sub: payload.sub,
      name: payload.name,
      role: payload.role,
    };

    const newAccessToken = generateAccessToken(newPayload);
    const newRefreshToken = generateRefreshToken(newPayload);

    logger.info(`Token refreshed for user: ${payload.sub}`);

    return {
      success: true,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  } catch (error) {
    logger.error('Token refresh error:', error.message);
    return { success: false, error: error.message };
  }
};

module.exports = {
  login,
  refreshAccessToken,
};
