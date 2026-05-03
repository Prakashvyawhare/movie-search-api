// Mock watchlist model - Replace with database model when integrating DB
const watchlistData = [];

class Watchlist {
  static add(userId, movieData) {
    const entry = {
      id: Date.now().toString(),
      userId,
      movie: movieData,
      createdAt: new Date(),
    };
    watchlistData.push(entry);
    return entry;
  }

  static getByUserId(userId) {
    return watchlistData.filter(item => item.userId === userId);
  }

  static removeById(id) {
    const index = watchlistData.findIndex(item => item.id === id);
    if (index > -1) {
      watchlistData.splice(index, 1);
      return true;
    }
    return false;
  }

  static getAll() {
    return watchlistData;
  }

  static clear() {
    watchlistData.length = 0;
  }
}

module.exports = Watchlist;
