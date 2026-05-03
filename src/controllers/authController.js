const authService = require('../services/authService');
const { verifyRefreshToken } = require('../utils/tokenGenerator');
const config = require('../config/environment');
const logger = require('../utils/logger');

const login = (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({
        success: false,
        error: 'Username is required',
      });
    }

    const result = authService.login(username);

    if (!result.success) {
      return res.status(401).json({
        success: false,
        error: result.error,
      });
    }

    // Set refresh token as httpOnly cookie
    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: config.cookie.secure,
      sameSite: config.cookie.sameSite,
      maxAge: config.cookie.maxAge,
    });

    res.json({
      success: true,
      accessToken: result.accessToken,
      user: result.user,
    });
  } catch (error) {
    logger.error('Login controller error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: config.cookie.secure,
      sameSite: config.cookie.sameSite,
    });

    logger.info('User logged out successfully');

    res.json({
      success: true,
      message: 'User logged out successfully',
    });
  } catch (error) {
    logger.error('Logout controller error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
};

const refreshToken = (req, res) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      logger.warn('No refresh token provided');
      return res.status(401).json({
        success: false,
        error: 'No refresh token',
        message: 'Refresh token is required',
      });
    }

    const payload = verifyRefreshToken(token);
    const result = authService.refreshAccessToken(payload);

    if (!result.success) {
      return res.status(401).json({
        success: false,
        error: result.error,
      });
    }

    // Update refresh token cookie
    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: config.cookie.secure,
      sameSite: config.cookie.sameSite,
      maxAge: config.cookie.maxAge,
    });

    res.json({
      success: true,
      accessToken: result.accessToken,
    });
  } catch (error) {
    logger.error('Token refresh error:', error.message);
    res.status(401).json({
      success: false,
      error: 'Invalid or expired refresh token',
      message: error.message,
    });
  }
};

module.exports = {
  login,
  logout,
  refreshToken,
};
