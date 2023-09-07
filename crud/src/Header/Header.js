import React from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { BiMessageAdd } from "react-icons/bi";

const Header = () => {
  const navigate = useNavigate();
  function additem (){
    navigate('/additem')
  }
  return (
    <main>
      <header className="header-main">
        <div>
        <Link to="/display" >
            <img src="/images/Divum_Logo1.svg" alt="" className="img" />
          </Link>
        </div>
        <div className="icons">
          
            <BiMessageAdd className="icons-img" role="button" onClick={additem} />
          
        </div>
      </header>
    </main>
  );
};

export default Header;