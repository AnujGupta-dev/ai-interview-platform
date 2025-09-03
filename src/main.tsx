import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { ToasterProvider } from './providers/toast-provider.tsx'
import { ThemeProvider } from 'next-themes'

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}
                     signInUrl="/sign-in"
                     signUpUrl="/sign-up"
                     afterSignOutUrl="/">
        <App />
        <ToasterProvider />
      </ClerkProvider>
    </ThemeProvider>
  </StrictMode>,
)