import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";
import { useHistory } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const history = useHistory();

  const onName = (event) => {
    setName(event.target.value);
  };

  const onEmail = (event) => {
    setEmail(event.target.value);
  };

  const onMobileNumber = (event) => {
    setMobileNumber(event.target.value);
  };

  const onPassword = (event) => {
    setPassword(event.target.value);
  };

  const onConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!name || !email || !mobileNumber || !password || !confirmPassword) {
      toast.error("Please Fill all the Feilds", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    } else if (mobileNumber.length !== 10) {
      toast.error("Mobile Number should have 10 numbers", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    } else if (password.length < 8) {
      toast.error("Password should be greater than 8 letters", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    } else if (password !== confirmPassword) {
      toast.error("Password do not match", {
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
    const string = /([a-zA-Z]{4})+-([0-9]{3})+([a-zA-Z]{2})+$/g;
    if (!password.match(string)) {
      toast.error("Password Must Contains Alpha-Numeric values", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    const response = await fetch("http://localhost:5001/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        mobileNumber,
        password,
      }),
    });
    const data = await response.json();
    if (data.status === "ok") {
      history.replace("/");
    } else {
      toast.error("Something went Wrong", {
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
        <label className="form-label">First Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          className="form-input"
          onChange={onName}
        />
        <label className="form-label">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          className="form-input"
          onChange={onEmail}
        />
        <label className="form-label">Mobile Number</label>
        <input
          type="number"
          placeholder="Enter your mobile number"
          className="form-input"
          onChange={onMobileNumber}
        />
        <label className="form-label">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          className="form-input"
          onChange={onPassword}
        />
        <label className="form-label">Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm your password"
          className="form-input"
          onChange={onConfirmPassword}
        />
        <button type="submit" className="form-button">
          Register
        </button>
        <ToastContainer />
      </form>
    </>
  );
};

export default Register;
