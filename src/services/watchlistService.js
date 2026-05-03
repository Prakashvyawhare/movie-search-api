const Watchlist = require('../models/Watchlist');
const logger = require('../utils/logger');

const addToWatchlist = (userId, movieData) => {
  try {
    if (!movieData || Object.keys(movieData).length === 0) {
      logger.warn(`Invalid movie data provided by user: ${userId}`);
      return { success: false, error: 'Movie data is required' };
    }

    const entry = Watchlist.add(userId, movieData);
    logger.info(`Movie added to watchlist for user: ${userId}`);

    return {
      success: true,
      message: 'Watchlist updated successfully',
      data: entry,
    };
  } catch (error) {
    logger.error('Watchlist add error:', error.message);
    return { success: false, error: error.message };
  }
};

const getWatchlist = (userId) => {
  try {
    const watchlist = Watchlist.getByUserId(userId);
    logger.info(`Watchlist retrieved for user: ${userId}`);

    return {
      success: true,
      data: watchlist,
    };
  } catch (error) {
    logger.error('Watchlist retrieval error:', error.message);
    return { success: false, error: error.message };
  }
};

const removeFromWatchlist = (entryId, userId) => {
  try {
    const watchlist = Watchlist.getByUserId(userId);
    const exists = watchlist.some(item => item.id === entryId);

    if (!exists) {
      logger.warn(`Watchlist entry not found: ${entryId}`);
      return { success: false, error: 'Watchlist entry not found' };
    }

    Watchlist.removeById(entryId);
    logger.info(`Watchlist entry removed: ${entryId}`);

    return {
      success: true,
      message: 'Watchlist entry removed successfully',
    };
  } catch (error) {
    logger.error('Watchlist removal error:', error.message);
    return { success: false, error: error.message };
  }
};

module.exports = {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
};
