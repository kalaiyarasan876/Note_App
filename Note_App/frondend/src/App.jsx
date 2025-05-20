import Login from './components/Login'
import Navbar from './components/Navbar'
import Register from './components/Register';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import "./App.css"

import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App