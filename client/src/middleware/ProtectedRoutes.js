import React from 'react'
import { Outlet } from 'react-router-dom'
import LoginNeeded from '../pages/LoginNeeded'

const authorize = () => {
    const authorization = JSON.parse(sessionStorage.getItem('authorization'))
    return authorization?.token
}

const ProtectedRoutes = () => {
    const isAuthorized = authorize()
    return isAuthorized ? <Outlet /> : <LoginNeeded />
}

export default ProtectedRoutes