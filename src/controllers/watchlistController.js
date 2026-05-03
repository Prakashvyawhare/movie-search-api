const watchlistService = require('../services/watchlistService');
const logger = require('../utils/logger');

const addToWatchlist = (req, res) => {
  try {
    const userId = req.user.sub;
    const movieData = req.body;

    if (!movieData || Object.keys(movieData).length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Movie data is required',
      });
    }

    const result = watchlistService.addToWatchlist(userId, movieData);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        error: result.error,
      });
    }

    res.status(201).json(result);
  } catch (error) {
    logger.error('Add to watchlist error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
};

const getWatchlist = (req, res) => {
  try {
    const userId = req.user.sub;

    const result = watchlistService.getWatchlist(userId);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        error: result.error,
      });
    }

    res.json(result);
  } catch (error) {
    logger.error('Get watchlist error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
};

const removeFromWatchlist = (req, res) => {
  try {
    const userId = req.user.sub;
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'Watchlist entry ID is required',
      });
    }

    const result = watchlistService.removeFromWatchlist(id, userId);

    if (!result.success) {
      return res.status(404).json({
        success: false,
        error: result.error,
      });
    }

    res.json(result);
  } catch (error) {
    logger.error('Remove from watchlist error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
};

module.exports = {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
};
