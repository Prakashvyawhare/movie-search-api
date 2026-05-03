const config = require('../config/environment');

const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

const currentLogLevel = logLevels[config.logLevel] || logLevels.info;

const logger = {
  error: (message, error = '') => {
    if (logLevels.error <= currentLogLevel) {
      console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, error);
    }
  },

  warn: (message) => {
    if (logLevels.warn <= currentLogLevel) {
      console.warn(`[WARN] ${new Date().toISOString()} - ${message}`);
    }
  },

  info: (message) => {
    if (logLevels.info <= currentLogLevel) {
      console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
    }
  },

  debug: (message, data = {}) => {
    if (logLevels.debug <= currentLogLevel) {
      console.log(`[DEBUG] ${new Date().toISOString()} - ${message}`, data);
    }
  },
};

module.exports = logger;
