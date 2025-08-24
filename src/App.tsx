import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import PublicLayout from './layouts/public-layout'
import HomePage from './routes/home-page'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
