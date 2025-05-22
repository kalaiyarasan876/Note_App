import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link, Navigate } from 'react-router-dom';


const ProtectRoute = ({ children }) => {

    const { user } = useContext(AuthContext)
    return user ? children : <Navigate to="/login" />

}

export default ProtectRoute;

