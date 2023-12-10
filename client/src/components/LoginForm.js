import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { LOGIN_API } from '../constants/Constants'

const LoginForm = () => {

  // PUNTO 2  Opzionale: La gestione della pasticceria è in mano a Luana e Maria che vogliono avere il
// proprio account per poter accedere all'area di backoffice tramite email e password.
  const [formState, setFormState] = useState({})
  const [loginError, setLoginError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const authorization = sessionStorage.getItem('authorization')
    if (authorization) {
      navigate('../dashboard', { replace: true })
    }
  }, [navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(LOGIN_API, formState)
      if (res.status === 200) {
        sessionStorage.setItem('authorization', JSON.stringify(res.data))
        navigate('../dashboard', { replace: true })
      }
    } catch (error) {
      if (error) {
        setLoginError(error.response.data)
        console.log(error.response.data)
      }
    }
  }

  const loginAsLuana = async () => {
    const luanaCredentials = {
      email: "Luana@email.it",
      password: "ciaociao"
    }
    setFormState(luanaCredentials)
    try {
      const res = await axios.post(LOGIN_API, luanaCredentials)
      if (res.status === 200) {
        sessionStorage.setItem('authorization', JSON.stringify(res.data))
        navigate('../dashboard', { replace: true })
      }
    } catch (error) {
      if (error) {
        setLoginError(error.response.data)
        console.log(error.response.data)
      }
    }
  }
  

  return (
    <div className="min-h-screen bg-white flex justify-center items-center">
    <form className="w-full max-w-sm p-8  bg-white" onSubmit={handleSubmit}>
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="email"
          id="email"
          placeholder="Enter email"
          onChange={(e) => {
            setFormState({
              ...formState,
              email: e.target.value
            })
          }}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
          Password 
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          id="password"
          placeholder="Enter password"
          onChange={(e) => {
            setFormState({
              ...formState,
              password: e.target.value
            })
          }}
        />
      </div>
      {loginError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">{loginError}</div>
      )}
      <button
        type="submit"
        className="bg-[#e68d8d]  hover:bg-[#dc6262] mb-4  w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Login
      </button>
      <button
        type="submit"
        onClick={loginAsLuana}
        className="bg-[#e68d8d]  hover:bg-[#dc6262] w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Entra come Luana
      </button>
    </form>
  </div>
  )
}

export default LoginForm