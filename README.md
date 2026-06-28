# Futurecraft Frontend

Futurecraft is a React + Vite frontend for the Future Crafts student program. The site presents the program, explains the different tracks, and includes an application flow for students who want to join.

## Highlights

- Conversion-focused landing page for the Future Crafts program
- Dedicated content for program paths such as Pod Core, Passion Projects, and Venture Studio
- In-app application experience for capturing student interest
- Lightweight React setup with Vite for fast local development and builds
- Firebase configuration included for hosting workflows

## Tech Stack

- React 18
- Vite 5
- Plain CSS
- Firebase Hosting configuration

## Project Structure

```text
.
├── App.jsx
├── components/
├── data/
├── assets/
├── lib/
├── public/
├── styles.css
├── main.jsx
└── firebase.json
```

## Getting Started

### Prerequisites

- Node.js 18+ recommended
- npm 9+ recommended

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a local environment file from the example:

```bash
cp .env.example .env
```

Current environment variable:

- `VITE_API_BASE_URL`: Base URL for the application backend API

### Start the development server

```bash
npm run dev
```

### Create a production build

```bash
npm run build
```

### Preview the production build locally

```bash
npm run preview
```

## Deployment

This repository includes Firebase Hosting configuration through `firebase.json` and `.firebaserc`.

A typical deployment flow is:

```bash
npm run build
firebase deploy
```

## Notes

- `.env` is intentionally ignored and should not be committed.
- `dist/` is generated during build time and is not tracked.
- `.firebase/` contains local Firebase cache data and is not tracked.

## License

This project is currently unlicensed. Add a license before sharing publicly if needed.
