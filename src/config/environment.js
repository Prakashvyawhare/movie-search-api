require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  
  // JWT Configuration
  jwt: {
    accessSecret: process.env.JWT_SECRET || 'secret_key',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'refresh_secret_key',
    accessTokenExpiry: process.env.JWT_ACCESS_TOKEN_EXPIRY || '15m',
    refreshTokenExpiry: process.env.JWT_REFRESH_TOKEN_EXPIRY || '7d',
  },
  
  // Cookie Configuration
  cookie: {
    secure: process.env.COOKIE_SECURE === 'true',
    sameSite: process.env.COOKIE_SAME_SITE || 'strict',
    maxAge: parseInt(process.env.COOKIE_MAX_AGE) || 900000,
  },
  
  // Database Configuration (future use)
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 27017,
    name: process.env.DB_NAME || 'task_manager',
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || '',
  },
  
  // Logging
  logLevel: process.env.LOG_LEVEL || 'info',
};

module.exports = config;
