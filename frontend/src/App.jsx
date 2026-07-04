import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import RefreshHandle from './pages/RefreshHandle'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import SearchPage from './pages/SearchPage'

function App() {

  let [isAuthenticated, setIsAuthenticated] = useState(false);
  let navigate = useNavigate();

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to='/login' />
  }

  return (
    <>
    <ToastContainer/>
      <RefreshHandle setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path='/home' element={<PrivateRoute element={<Home />} />} />
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/search' element={<SearchPage />} />
      </Routes>
    </>
  )
}

export default App
