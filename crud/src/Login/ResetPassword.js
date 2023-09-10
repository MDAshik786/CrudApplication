import React from 'react'
import './ResetPassword.css'
import { RiContactsFill } from "react-icons/ri";
//https://stripo.email/templates/password-reset-email-template-restore-the-movie-for-movies-industry/
const ResetPassword = () => {
  return (
    <main className='main-con'>
        <div className="header-rp">
            <img src="/images/divum.png" alt="" width={100}/>
             <RiContactsFill className='contact-img'/>
        </div>
    <div className='container-rp'>
      <div className='img-container'><img src="/images/forgot-password.png" alt="" width={100} height={100}/></div>
      <p className='heading-rp'>Forget Your Password?</p>
      <p className="content3">Hi,</p>
      <p className="content2">There was a Request to Change Your PassWord!</p>
      <p className="content2">If did not Make this request, just ignore this and move to login Page</p>
      <p className="content2">Othrewise,Please Enter Your Email to Change Your Password</p>
       <div className="input-box">
        <input type='text'/>
       </div>
    </div>
    </main>
  )
}

export default ResetPassword