import React, { useState } from "react";
import { RiContactsFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import "./SetPassword.css";
import { BiSolidShow } from "react-icons/bi";
import { BsEyeSlashFill } from "react-icons/bs";

const SetPassword = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  function movetoHomePage() {
    navigate("/");
  }
  function visibleHandeler() {
    setVisible(!visible);
  }
  return (
    <main className="main-conn">
      <div >
        <div className="header-rp">
          <img
            src="/images/divum.png"
            alt=""
            width={100}
            onClick={movetoHomePage}
            className="diuvum-rp"
          />
          <RiContactsFill className="contact-img" />
        </div>
        <div className="main-sp">
          <p className="heading-sp">Reset Account Password</p>
          <p className="name-sp">Enter a New Password For </p>
          <div className="single-container">
              {/* <label className="input-name">Password:</label> */}
              <div className="relative">
                <input
                  type={visible ? "text" : "password"}
                  className="first-name"
                  placeholder="Password"
                //   value={formData?.password}
                  name="password"
                  data-testid="password-id"
                //   onChange={handleInputChange}
                />
                {visible ? (
                  <BiSolidShow className="view1" onClick={visibleHandeler} />
                ) : (
                  <BsEyeSlashFill className="view1" onClick={visibleHandeler} />
                )}
                {Error?.password && (
                  <p
                    style={{ color: "red", font: "1rem Roboto, sans-serif" }}
                  ></p>
                )}
              </div>
            </div>
            <div className="single-container">
              {/* <label className="input-name">Password:</label> */}
              <div className="relative">
                <input
                  type={visible ? "text" : "password"}
                  className="first-name"
                  placeholder="Confirm Password"
                //   value={formData?.password}
                  name="password"
                  data-testid="password-id"
                //   onChange={handleInputChange}
                />
                {visible ? (
                  <BiSolidShow className="view1" onClick={visibleHandeler} />
                ) : (
                  <BsEyeSlashFill className="view1" onClick={visibleHandeler} />
                )}
                {Error?.password && (
                  <p
                    style={{ color: "red", font: "1rem Roboto, sans-serif" }}
                  ></p>
                )}
              </div>
            </div>
            <button className="submit-button">Submit</button>
        </div>
      </div>
    </main>
  );
};

export default SetPassword;
