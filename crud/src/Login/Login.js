import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { emailRegex } from "../Validation/Regex";
import { apiUrl } from "../Constrains/URL";
import { BiSolidShow } from "react-icons/bi";
import { BsEyeSlashFill } from "react-icons/bs";


const Login = ({ logIdn, setlogIdn }) => {
  const [visible, setVisible] = useState(false);
  const [login, setlogin] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  console.log("first");
  const userLogin = async (email, password) => {
    console.log("start");
    try {
      const responseLogin = await axios.post(
        `${apiUrl}/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (responseLogin.data === "admin") {
        setlogIdn(true);
        navigate("/display",{state:{loginId:true}});
      }
      return responseLogin.data;
    } catch (error) {
      console.log(error);
    }
  };
  let Required = true,
    Incorrect = true;
  let errorValidation = {};
  function handelLoginForm(e) {
    const { name, value } = e.target;
    setlogin((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  function loginForm(e) {
    e.preventDefault();
    errorValidation = {};
    if (login.email === "") {
      Required = false;
      errorValidation.email = "Email is Required";
    }
    if (Required && !emailRegex.test(login.email)) {
      Incorrect = false;
      errorValidation.email = "Invalid Email";
    }
    if (login.password === "") {
      Required = false;
      console.log("Password is Required");
      errorValidation.password = "Password Required";
    }
    if (Required && Incorrect) userLogin(login.email, login.password);
  }
  function moveToFromPage() {
    setlogIdn(false);
    navigate("/additem",{state:{loginId:false}});
  }
  function visibleHandeler() {
    setVisible(!visible);
  }

  console.log(logIdn, "logii");
  return (
    <div className="main-form">
      <div>
        <form action="" className="form-data" onSubmit={loginForm}>
          <div className="flex-content">
            <div>
              <img src="/images/divum.png" alt="" className="img-logo" />
            </div>
            <p className="form-heading">LogIn</p>
            <div className="relative">
              <input
                type="text"
                className="input-element"
                placeholder="Email"
                autoFocus
                value={login.email}
                onChange={handelLoginForm}
                name="email"
              ></input>
            </div>
            <div className="relative">
              <input
                type={visible ? "text" : "password"}
                className="input-element"
                placeholder="Password"
                autoFocus
                name="password"
                value={login.password}
                onChange={handelLoginForm}
                autoComplete="off"
              ></input>
              {visible ? (
                <BiSolidShow className="view-icon1" onClick={visibleHandeler} />
              ) : (
                <BsEyeSlashFill className="view-icon" onClick={visibleHandeler} />
              )}
            </div>
            <div className="button-class">
              <button className="login-button">LOGIN</button>
              <p className="not-register">
                Not Registered?/<span className="sing-up"onClick={moveToFromPage}>Sing Up</span>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
