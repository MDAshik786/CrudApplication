import React, { useState } from 'react'
import './ResetPassword.css'
import { RiContactsFill } from "react-icons/ri";
import { emailRegex } from '../Validation/Regex';
import { BsFillInfoCircleFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
//https://stripo.email/templates/password-reset-email-template-restore-the-movie-for-movies-industry/
const ResetPassword = () => {
  const navigate = useNavigate()
  const [getEmail, setGetEmail] = useState("");
  const [getEmailError, setEmailError] = useState("");
  let emailRequiredrp,emailValidationrp;
function handelChangeEvent(e){
  emailRequiredrp = true
  emailValidationrp = true
   setGetEmail(e.target.value)
   if (e.target.value === "") {
    setEmailError("Email is Required");
    emailRequiredrp = false
  } else if (!emailRegex.test(e.target.value)) {
    setEmailError("Please Enter a Valid Email");
    emailValidationrp = false;
  } 
  else{
   setEmailError('')
  }
}
function movetoHomePage(){
  navigate("/")
}

console.log(getEmailError,"error")
  return (
    <main className='main-conn'>
        <div className="header-rp">

            <img src="/images/divum.png" alt="" width={100} onClick={movetoHomePage} className='diuvum-rp'/>
             <RiContactsFill className='contact-img'/>
        </div>
    <div className='container-rp'>
      <div className='img-container'><img src="/images/forgot-password.png" alt="" width={100} height={100}/></div>
      <p className='heading-rp'>Forget Your Password?</p>
      <div className='first-rp'>
      <p className="content3">Hi User,</p>
      <p className="content2">There was a Request to Change Your PassWord!</p>
      </div>
      <div className='second-rp'>
      <p className="content2">If did not Make this request, just ignore this and move to login Page</p>
      <p className="content2">Othrewise,Please Enter Your Email to Change Your Password.</p>
      </div>
       <div className="input-box-rp">
        <div className="relative">
        <input type='text' autoFocus 
        placeholder='Enter Your Email...'
        className='input-email'
        name='email'
        value={getEmail}
        onChange={handelChangeEvent}/>
        <span className='error-msg1'>{getEmailError ? getEmailError : ''}  </span>
        <span className='error-icon'>{getEmailError ? <BsFillInfoCircleFill/> : ''}</span>
        </div>
        <button className='button'>Send Link to Your Email</button>
       </div>
       
    </div>
    </main>
  )
}

export default ResetPassword