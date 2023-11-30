import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import { LOGIN_API } from '../constants/Constants'

const Login = () => {
  const [formState, setFormState] = useState({})
  const [loginError, setLoginError] = useState("")
  const navigate = useNavigate()

 



  
  return (
    <>
     
    <section className="h-screen w-full flex flex-wrap">
               <div className="w-[50%] hidden md:block" style={{
                   backgroundImage: `url("https://images.pexels.com/photos/3553703/pexels-photo-3553703.jpeg")`,
                   backgroundSize: 'cover',
                   backgroundRepeat: 'no-repeat',
                   backgroundPosition: 'center'
               }}>
               </div>
     <div className=" w-full md:w-[50%] flex flex-col justify-center items-center">
       
       
    <LoginForm />
   
    </div>
     </section>
   </>
  )
}

export default Login