import React, { useState } from "react";
import Login from "../Login/Login";
import Register from "../Register/Register";
import "./Home.css";

const Home = () => {
  const [login, setLogin] = useState(true);
  const [register, setRegister] = useState(false);
  const onLogin = () => {
    setLogin(true);
    setRegister(false);
  };

  const onRegister = () => {
    setRegister(true);
    setLogin(false);
  };

  return (
    <div className="top-container">
      <div className="title-container">
        <h1 className="heading">Message App</h1>
      </div>
      <div className="bottom-container">
        <div className="button-container">
          <button type="button" className="button" onClick={onLogin}>
            Log In
          </button>
          <button type="button" className="button" onClick={onRegister}>
            Register
          </button>
        </div>
        {login && (
          <div>
            <Login />
          </div>
        )}
        {register && (
          <div>
            <Register />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
