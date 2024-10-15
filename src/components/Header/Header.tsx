import React, { useState } from "react";


const Header: React.FC = () => {
  return (
    <div className="header">
      <img src='../../../public/header_logo.png' alt="" />
      <LogIn/>
    </div>
  );
};


const LogIn: React.FC = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    return (
        <>
        { loggedIn ? <button className="login">
            Sing in
        </button> 
        : 
        
        <button>
            <img src='../../../public/singout.png' alt="sing out" />
        </button>
        
        }
        </>
    )
}

export default Header;
