/* eslint-disable */
// import React, { useContext, useState } from "react";
import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
import { FiMail, FiLock } from "react-icons/fi";
// import { UserContext } from "../../App.jsx";
import Background from "./Fuel.png";
import "./style.css"; // Import your CSS styles
import { useLoginMutation } from '../../features/user/userSlice.js'


const Login = () => {
  // const { dispatch } = useContext(UserContext);
  const [login] = useLoginMutation()

  // const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    const userData = {
      email,
      password,
    };

    console.log(1);
    login(userData).then((res)=> {
      console.log(res.data);
    })


    console.log(2);
    // try {
    //   const response = await axios.post(
    //     "https://indoteknikserver-732012365989.herokuapp.com/users/login",
    //     userData
    //   );
    //   console.log("Login response:", response.data);

    //   localStorage.setItem("access_token", response.data.access_token);

    //   setEmail("");
    //   setPassword("");

    //   dispatch({ type: "USER", payload: true });
    //   navigate("/");
    // } catch (error) {
    //   console.error("Login error:", error);
    //   alert("Login failed. Please try again.");
    // }
  };

  return (
    <div className="containerlogin">
      <div className="imgStack">
        <img className="imglogin img1" src={Background} alt="" />
      </div>
      <div className="divLogin">
        <h2 className="h2">Login</h2>
        <form onSubmit={handleSubmit} className="form">
          <div>
            <label className="label" htmlFor="email">
              <FiMail className="icon" /> Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="inputEmail"
            />
          </div>
          <div>
            <label className="label" htmlFor="password">
              <FiLock className="icon" /> Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="inputPass"
            />
          </div>
          <button className="button" type="submit">
            Login
          </button>
        </form>
        <p className="p">
          {/* Don't have an account? <Link to="/register">Register</Link> */}
        </p>
      </div>
    </div>
  );
};

export default Login;
