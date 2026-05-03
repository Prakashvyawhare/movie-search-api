# Task Manager API

A RESTful API for managing tasks and watchlists with JWT authentication.

## Project Structure

```
src/
├── config/           # Configuration files (environment, CORS)
├── routes/           # Route definitions
├── controllers/      # Request handlers
├── services/         # Business logic
├── models/           # Data models
├── middleware/       # Express middleware
└── utils/            # Utility functions (tokens, logging)
```

## Features

- JWT-based authentication
- Refresh token mechanism
- Watchlist management
- CORS support
- Comprehensive error handling
- Structured logging

## Installation

```bash
npm install
```

## Environment Setup

Create a `.env` file in the root directory based on `.env.example`:

```bash
cp .env.example .env
```

Update the following variables:

```
PORT=3000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
JWT_SECRET=your_secure_secret_key
JWT_REFRESH_SECRET=your_secure_refresh_secret_key
```

## Running the Server

```bash
# Development mode
npm start

# With nodemon (auto-reload)
npm run dev
```

The server will run on `http://localhost:3000`

## API Endpoints

### Authentication

- `POST /auth/login` - User login
  - Body: `{ "username": "Prakash" }`
  - Returns: `{ "accessToken": "...", "user": {...} }`

- `POST /auth/logout` - User logout
  - Returns: `{ "message": "User logged out successfully" }`

- `POST /auth/refresh-token` - Refresh access token
  - Returns: `{ "accessToken": "..." }`

### Watchlist

All watchlist endpoints require authentication (Bearer token in Authorization header).

- `POST /watchlist` - Add to watchlist
  - Body: `{ "title": "Movie Title", "year": 2024, ... }`
  - Returns: `{ "message": "Watchlist updated successfully", "data": {...} }`

- `GET /watchlist` - Get user's watchlist
  - Returns: `{ "data": [...] }`

- `DELETE /watchlist/:id` - Remove from watchlist
  - Returns: `{ "message": "Watchlist entry removed successfully" }`

## Best Practices Implemented

✅ **Modular Architecture** - Separated concerns (routes, controllers, services, models)
✅ **Environment Configuration** - Centralized configuration management
✅ **Error Handling** - Comprehensive error handling middleware
✅ **Logging** - Structured logging utility
✅ **Security** - JWT tokens, httpOnly cookies, CORS configuration
✅ **Code Organization** - Clear file structure and naming conventions
✅ **Comments** - JSDoc comments for API endpoints
✅ **Graceful Shutdown** - Proper process termination handling

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 3000 |
| NODE_ENV | Environment mode | development |
| CLIENT_URL | CORS origin URL | http://localhost:5173 |
| JWT_SECRET | Access token secret | secret_key |
| JWT_REFRESH_SECRET | Refresh token secret | refresh_secret_key |
| JWT_ACCESS_TOKEN_EXPIRY | Access token TTL | 15m |
| JWT_REFRESH_TOKEN_EXPIRY | Refresh token TTL | 7d |
| COOKIE_SECURE | HTTPS only cookies | true |
| COOKIE_SAME_SITE | SameSite cookie policy | strict |
| COOKIE_MAX_AGE | Cookie expiration (ms) | 900000 |
| LOG_LEVEL | Logging level | info |

## Development

To add features or fix bugs:

1. Follow the existing project structure
2. Add services for business logic
3. Create controllers for request handling
4. Define routes with proper documentation
5. Use the logger utility for debugging
6. Test endpoints using Postman or similar tool

## Future Improvements

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] User registration endpoint
- [ ] Password hashing (bcrypt)
- [ ] Input validation (joi/yup)
- [ ] Unit and integration tests
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Rate limiting
- [ ] Email verification
