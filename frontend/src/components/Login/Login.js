import React, { useState } from "react";
import "./Login.css";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const history = useHistory();

  const onPassword = (event) => {
    setPassword(event.target.value);
  };

  const onEmail = (event) => {
    setEmail(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      toast.error("Please Enter Email and Password", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    const response = await fetch("http://localhost:5001/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();
    if (data.status === "ok") {
      history.replace("/dashboard");
    } else {
      toast.error("Invalid Email or Password!", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
  };

  return (
    <>
      <form className="form-container" onSubmit={submitHandler}>
        <label className="form-label">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          className="form-input"
          onChange={onEmail}
        />
        <label className="form-label">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          className="form-input"
          onChange={onPassword}
        />
        <button type="submit" className="form-button">
          Log In
        </button>
        <ToastContainer />
      </form>
    </>
  );
};

export default Login;
