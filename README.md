## PrepMate AI

AI-powered mock interview platform to practice real-time interviews with webcam, voice input, and instant AI feedback. Includes auth-protected flows, interview creation, session practice, and a results dashboard — built with modern React, TypeScript, Tailwind CSS, and deployed on Firebase Hosting.

### Features
- Authentication with Clerk (protected routes)
- Create, edit, and manage mock interviews
- Real-time mock interview with voice and webcam
- AI-generated questions and feedback
- Light/Dark theme and toast notifications
- SPA with client-side routing

### Tech Stack
- React 19, TypeScript, Vite 7
- React Router 7
- Tailwind CSS 4, Radix UI primitives, `lucide-react`
- Clerk (`@clerk/clerk-react`, `@clerk/react-router`)
- Google Generative AI (`@google/generative-ai`)
- Forms & Validation: `react-hook-form`, `zod`
- Realtime UX: `sonner` toasts
- Media & Voice: `react-webcam`, `react-speech-recognition`, `vosk-browser`
- Theming: `next-themes`
- Deployment: Firebase Hosting

---

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Clerk project (frontend publishable key)
- Generative AI API key (if using AI features)
- Firebase project (for hosting)

### Installation
```bash
git clone <your-repo-url>.git
cd ai-interview-platform
npm install
```

### Environment Variables
Create a `.env` file in the project root with:

```bash
# Clerk
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxxx

# Google Generative AI (Gemini)
VITE_GEMINI_API_KEY=your_gemini_api_key

# Firebase config is provided in client code; add any other client-safe keys as needed
# VITE_SOME_SERVICE_KEY=...
```

Only expose client-safe values prefixed with `VITE_`. Do not commit secrets.

### Development
```bash
npm run dev
```
App runs at `http://localhost:5173`.

### Build
```bash
npm run build
```
Outputs to `dist/`.

### Preview Production Build
```bash
npm run preview
```

---

## Usage
1. Sign up/sign in with Clerk.
2. Create a new mock interview (role, experience, etc.).
3. Start the session; enable mic/camera if prompted.
4. Record answers; receive AI feedback and ratings.
5. View overall score and per-question feedback in the Feedback page.

---

## Project Structure (high-level)
```text
src/
  App.tsx                # Routes
  main.tsx               # App bootstrapping/providers
  layouts/               # Public/Protected/Main layouts
  routes/                # Screens (home, services, mock, feedback)
  components/            # UI components
  containers/            # Feature containers
  providers/             # Toast provider, theme
  scripts/               # AI integration
  types/                 # Shared types
  index.css, App.css     # Global styles
public/                  # Static assets
```

---

## Contribution Guidelines
- Fork the repo and create a feature branch
- Follow existing code style and lint rules
- Write clear commit messages
- Open a PR describing changes and screenshots where relevant

---

## Deployment (Firebase Hosting)
The SPA is configured to rewrite routes to `index.html` via `firebase.json`.

1) Install Firebase CLI and login:
```bash
npm install -g firebase-tools
firebase login
```

2) Build the app:
```bash
npm run build
```

3) Deploy:
```bash
firebase deploy
```

---

## License
MIT License

---

## Links
- Live demo: add after deployment
- GitHub repository: add repo URL
