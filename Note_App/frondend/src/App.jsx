import Login from './components/Login'
import Navbar from './components/Navbar'
import Register from './components/Register';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import { useContext } from "react";
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from "./context/AuthContext";
import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectRoute from './utils/ProtectRoute';


const App = () => {
  const { user, loading } = useContext(AuthContext);

  if(loading){
    return <div>Loading...</div>
  }

  
  
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProtectRoute> <Profile /></ProtectRoute>} />
          <Route path="/dashboard" element={<ProtectRoute><Dashboard /></ProtectRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App