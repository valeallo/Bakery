import React from 'react'
import LoginForm from '../components/LoginForm'

const Login = () => {


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