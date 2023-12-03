import React from 'react'
import { useLocation, Navigate, Outlet } from "react-router-dom"


const authorize = () => {
    const authorization = JSON.parse(sessionStorage.getItem('authorization'))
    return authorization?.token
}

const ProtectedRoutes = () => {
    const isAuthorized = authorize()
    const location = useLocation()
    return isAuthorized ? <Outlet /> :  <Navigate to="/login" state={{ from: location }} replace />
}

export default ProtectedRoutes