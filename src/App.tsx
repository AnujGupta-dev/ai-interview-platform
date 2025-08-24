import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import PublicLayout from './layouts/public-layout'
import HomePage from './routes/home-page'
import SignInPage from './routes/sign-in'
import SignUpPage from './routes/sign-up'
import ProtectedRoute from './layouts/protected-layout'
import MainLayout from './layouts/main-layout'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* public routes */}

          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />

          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
          </Route>

            {/* protected routes */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
        </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
