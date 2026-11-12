# Movexa

**Discover what to watch, powered by AI.**

Movexa is a movie discovery app built with React and the TMDB API. Sign in, browse what's playing, popular, top rated and coming soon, and (in progress) describe the kind of movie you're in the mood for and let AI find it.

**Live demo:** https://movexa.web.app


## Features

### Done

- **Authentication** with Firebase email and password: sign up, sign in and sign out
- **Form validation** on sign-up (name, email, password strength, matching confirm password) with readable error messages instead of raw Firebase codes
- **Route protection:** signed-out users are sent to the login page, signed-in users stay on the page they opened, so refreshing and deep links keep working
- **Featured hero** with an auto-playing, muted trailer of a now-playing movie
- **Movie rows** for Now Playing, Popular, Top Rated and Upcoming, with smooth horizontal scrolling
- **Error handling:** failed API requests are caught so one broken row never crashes the page
- **Custom error pages:** a 404 page for unknown addresses and a crash page (via React Router `errorElement`) with copyable technical details
- **AI search page UI:** a search bar with starter prompts, opened from the header

### In progress

- **AI movie search:** type a mood or plot ("feel-good sci-fi like Interstellar") and get matching movies. The AI request runs through a Firebase Cloud Function so the API key never reaches the browser, and every suggestion is checked against TMDB so only real movies are shown.

## Tech stack

| Area | Tools |
|---|---|
| UI | React 19, Tailwind CSS 4 |
| State | Redux Toolkit, React Redux |
| Routing | React Router 7 |
| Auth and hosting | Firebase Authentication, Firebase Hosting |
| Data | TMDB API |
| Build | Vite, React Compiler (Babel preset) |
| Quality | ESLint with React Hooks rules |


### Requirements

- Node.js 20.19 or newer
- A free [TMDB](https://www.themoviedb.org/settings/api) account for an API read access token

## Project structure

```
src/
├── components/   UI: Login, Browse, Header, movie rows, AI search, Error page
├── hooks/        Data hooks that fetch each TMDB category and trailers
├── utils/        Redux store and slices, Firebase setup, validation, constants
└── assets/       Logo, backgrounds, profile images
```

## How it works

1. **Auth:** Firebase's `onAuthStateChanged` listener (in `Header`) saves the user to Redux and redirects only when the user is on the wrong page.
2. **Data:** each custom hook fetches one TMDB endpoint, checks `response.ok`, and stores the results in the `movies` Redux slice. A failed request is logged and that row is simply hidden.
3. **UI:** `Browse` shows either the movie rows or the AI search page, controlled by the `ai` Redux slice.
4. **Errors:** React Router shows the `Error` page for unknown routes and for any component that crashes.

## Challenges solved

- **Hook order crash:** a `useRef` called after an early return broke React's rules of hooks. Moved the hook above the return.
- **Silent API failures:** `fetch` doesn't reject on 401 or 429 responses, so bad responses were stored as data. Added `response.ok` checks and `try/catch` in every hook.
- **Redirect loop on refresh:** the auth listener always navigated to `/browse`, which would break deep links. It now redirects only when needed.
- **Valid passwords rejected:** the sign-in check used a strict password regex that rejected symbols like `#`. Strength rules now apply only on sign-up.

## Author

**Kartik Panwar** · [GitHub](https://github.com/KartikPanwar11)

Movie data provided by [TMDB](https://www.themoviedb.org/). This product uses the TMDB API but is not endorsed or certified by TMDB.
