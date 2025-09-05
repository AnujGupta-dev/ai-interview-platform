## AI Interview Platform

An end-to-end, AI-powered mock interview platform to help candidates practice real-time interviews. It features account management, protected routes, interview creation and practice flows, voice input, webcam capture, and AI-generated feedback — all built with modern React tooling and deployed to Firebase Hosting.

### Key Features
- Authentication with Clerk (sign-in/sign-up, protected routes)
- Create, edit, and manage mock interviews
- Real-time mock interview experience with voice and webcam support
- AI-generated questions and feedback
- Theming (light/dark) and toast notifications
- Deployed as a SPA with client-side routing

### Tech Stack
- React 19, TypeScript, Vite 7
- React Router 7
- Clerk for authentication (`@clerk/clerk-react`, `@clerk/react-router`)
- Google Generative AI SDK (`@google/generative-ai`)
- UI and Styling: Tailwind CSS 4, Radix UI primitives, `lucide-react`
- Forms & Validation: `react-hook-form`, `zod`
- Realtime UX: `sonner` toasts
- Media & Voice: `react-webcam`, `react-speech-recognition`, `vosk-browser`
- Theming: `next-themes`
- Deployment: Firebase Hosting

---

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Firebase project (for hosting) — optional until deployment
- API keys for Clerk and Generative AI

### Installation
```bash
git clone <your-repo-url>.git
cd ai-interview-platform
npm install
```

### Environment Variables
Create a `.env` file in the project root with the following keys:

```bash
# Clerk
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxxx

# Google Generative AI (Gemini) — if used in your features
VITE_GEMINI_API_KEY=your_gemini_api_key

# Any other client-side keys you introduce
# VITE_SOME_SERVICE_KEY=...
```

Note: Only client-safe values should be exposed as `VITE_` variables. Do not commit secrets.

### Development
```bash
npm run dev
```
The app will start on `http://localhost:5173` by default.

### Build
```bash
npm run build
```
Outputs a production build to `dist/`.

### Preview Production Build
```bash
npm run preview
```

---

## Scripts
- `dev`: start Vite dev server
- `build`: type-check then build the app
- `lint`: run ESLint
- `preview`: preview the production build

---

## Project Structure (high-level)
```text
src/
  App.tsx                # Routes and layouts wiring
  main.tsx               # App bootstrapping, providers (Clerk, Theme, Toaster)
  layouts/               # Public/Protected/Main layouts
  routes/                # Route screens: home, about, services, etc.
  components/            # Feature components (e.g., generate)
  providers/             # Toaster provider, theme logic
  index.css, App.css     # Global styles
public/                  # Static assets
```

Key routes and flows are registered in `src/App.tsx` and providers in `src/main.tsx`.

---

## Deployment (Firebase Hosting)
This project is configured for Firebase Hosting as a single-page app (SPA), rewriting all routes to `index.html`.

1) Install Firebase CLI and login:
```bash
npm install -g firebase-tools
firebase login
```

2) Build the app:
```bash
npm run build
```

3) Initialize (if not already) and deploy:
```bash
firebase init hosting
firebase deploy
```

`firebase.json` points hosting to the `dist` directory and rewrites all routes.

---

## Screenshots
Add screenshots or GIFs here to showcase the flows (home, interview creation, mock, feedback).

---

## Contributing
Issues and pull requests are welcome. For significant changes, please open an issue first to discuss what you would like to change.

---

## License
Add your preferred license (e.g., MIT). If unspecified, all rights reserved by default.

---

## Links
- Live demo: add a link after deployment
- GitHub repository: add your repo URL
- LinkedIn post: add a link when you share it
