const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

/**
 * @route POST /auth/login
 * @desc User login endpoint
 * @body {username: string}
 * @returns {accessToken, user}
 */
router.post('/login', authController.login);

/**
 * @route POST /auth/logout
 * @desc User logout endpoint
 * @returns {message}
 */
router.post('/logout', authController.logout);

/**
 * @route POST /auth/refresh-token
 * @desc Refresh access token using refresh token
 * @returns {accessToken}
 */
router.post('/refresh-token', authController.refreshToken);

module.exports = router;
