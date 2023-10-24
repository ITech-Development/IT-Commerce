/* eslint-disable */
import React, { useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";
import Background from "./Fuels.png";
import "./style.css"; // Import your CSS styles
import { useLoginMutation } from "../../features/user/apiUser.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  // const { dispatch } = useContext(UserContext);
  const [login] = useLoginMutation();

  // const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
    login(userData)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("access_token", res.data.access_token);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        alert("Perhatikan lagi email dan password nya!");
      });

    console.log(2);
  };

  return (
    <div className="containerlogin">
      <div className="imgStack">
        <img className="imglogin img1" src={Background} alt="" />
      </div>
      <div className="divLogin">
        <h2 className="h2">Masuk</h2>
        <form onSubmit={handleSubmit} className="form">
          <div>
            <label className="label" htmlFor="email">
              {/* <FiMail className="icon" />  */}
              Email:
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
              {/* <FiLock className="icon" />  */}
              Kata Sandi:
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
            Masuk
          </button>
        </form>
        <p className="p">
          Belum punya akun? <Link to="/register">Daftar akun</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
