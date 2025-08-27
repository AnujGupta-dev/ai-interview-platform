import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import PublicLayout from './layouts/public-layout'
import SignInPage from './routes/sign-in'
import SignUpPage from './routes/sign-up'
import ProtectedRoute from './layouts/protected-layout'
import MainLayout from './layouts/main-layout'
import { HomePage } from './routes/home-page'
import { Generate } from './components/generate'
import { Dashboard } from './routes/dashboard'
import { CreateEditPage } from './routes/create-edit-apge'
import { MockLoadPage } from './routes/mock-load-page'
import { MockInterviewPage } from './routes/mock-interview-page'

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
            <Route path="/generate" element={<Generate />}>
              <Route index element={<Dashboard />} />
              {/* create route */}
              <Route path=":interviewId" element={<CreateEditPage />} />
              <Route path="interview/:interviewId" element={<MockLoadPage />} />
               <Route path="interview/:interviewId/start" element={<MockInterviewPage />}
            />
            </Route>
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
