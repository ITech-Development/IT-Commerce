import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";
import { UserContext } from "../../App";

const Login = () => {
  const { dispatch } = useContext(UserContext);
  // const accessToken = localStorage.getItem('access_token')

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform login logic here
    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    const userData = {
      email,
      password,
    };

    try {
      // Call the API to perform login
      const response = await axios.post(
        "https://indoteknikserver-732012365989.herokuapp.com/warehouse-admins/login",
        userData
      );
      console.log("Login response:", response.data);

      // Save the access token to local storage
      localStorage.setItem("access_token", response.data.access_token);

      // Clear form fields
      setEmail("");
      setPassword("");

      navigate("/");
      dispatch({ type: "USER", payload: true });
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="div">
      <h1 className="h1">Warehouse Admin</h1>
      <h2 className="h2">Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <div style={{ width: "98%" }}>
          <label className="label" htmlFor="email">
            Email :{" "}
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
            Password:
          </label>
          <div
            className="password-input-container"
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "109%",
            }}
          >
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="inputPass"
            />
            <button
              style={{
                position: "relative",
                left: "-50px",
                background: "none",
                color: "grey",
                top: "-7px",
              }}
              type="button"
              onClick={togglePasswordVisibility}
              className="showPasswordButton"
            >
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                className="eye-icon"
              />
            </button>
          </div>
        </div>
        <button className="button" type="submit">
          Login
        </button>
      </form>
      <p className="p">
        {/* Don't have an account? <Link to="/register">Register</Link> */}
      </p>
    </div>
  );
};

export default Login;