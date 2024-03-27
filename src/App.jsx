import Main from './pages/main'
import SignupPage from './pages/signupPage'
import LoginPage from './pages/loginPage'
import LandingPage from './pages/landingPage'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoutes from './components/protectedRoutes/ProtectedRoutes'
import './App.css'

function App() {
  

  return (
    <>
    <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/record' element={<Main />} />
        <Route element={<ProtectedRoutes/>}>
        <Route path='/record' element={<Main />} />
        </Route>
        
    </Routes>
    </>
  )
}

export default App


