# College Management System - Backend

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the values in `.env` file

3. Start the server:
   ```bash
   npm start
   ```

   For development:
   ```bash
   npm run dev
   ```

## API Endpoints

- `/api/auth` - Authentication routes
- `/api/admin` - Admin management routes

## Environment Variables

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT secret key