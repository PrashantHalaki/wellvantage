# wellvantage

This repository contains both the backend (Node.js/Express) and frontend (React + Vite + TypeScript) applications for the Wellvantage project.

## Project Structure

- `be/` - Backend API (Node.js, Express)
- `wellvantage-fe/` - Frontend app (React, Vite, TypeScript)

---

## Backend (`be/`)

### Environment Variables

Create a `.env` file in the `be/` directory. Example:

```env
# Example backend environment variables
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=
FRONTEND_URL=http://localhost:8080
PORT=3000
```

Make sure to update these values as per your local or production setup.

### Setup

1. Navigate to the backend folder:
   ```sh
   cd be
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

### Running the Backend

```sh
npm start
```

or (if available):

```sh
npm run dev
```

The backend server will start (default: http://localhost:3000).

---

## Frontend (`wellvantage-fe/`)

### Environment Variables

Create a `.env` file in the `wellvantage-fe/` directory. Example:

```env
# Example frontend environment variables
VITE_API_URL=http://localhost:3000
```

Update the API URL as needed to match your backend server location.

### Setup

1. Navigate to the frontend folder:
   ```sh
   cd wellvantage-fe
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

### Running the Frontend

```sh
npm run dev
```

The frontend app will start (default: http://localhost:8080).

---

## Development Notes

- Ensure both backend and frontend are running for full functionality.
- Update API endpoints in the frontend as needed to match backend routes.

---
