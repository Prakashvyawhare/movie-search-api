const express = require('express');
const watchlistController = require('../controllers/watchlistController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// All watchlist routes require authentication
router.use(authenticateToken);

/**
 * @route POST /watchlist
 * @desc Add movie to watchlist
 * @middleware authenticateToken
 * @body {title, year, director, etc...}
 * @returns {message, data}
 */
router.post('/', watchlistController.addToWatchlist);

/**
 * @route GET /watchlist
 * @desc Get user's watchlist
 * @middleware authenticateToken
 * @returns {data: [watchlist items]}
 */
router.get('/', watchlistController.getWatchlist);

/**
 * @route DELETE /watchlist/:id
 * @desc Remove movie from watchlist
 * @middleware authenticateToken
 * @param {id} watchlist entry ID
 * @returns {message}
 */
router.delete('/:id', watchlistController.removeFromWatchlist);

module.exports = router;
