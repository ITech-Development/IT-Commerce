import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/authslice";
import { useNavigate } from "react-router-dom";
import { StyledForm } from "./StyledForm";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  // const [user, setUser] = useState({
  //   email: "",
  //   password: "",
  // });

  useEffect(() => {
    if (auth && auth._id) {
      navigate("/cart");
    }
  }, [auth, navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    console.log(user);
    dispatch(loginUser(user));
  };

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          {auth.loginStatus === "pending" ? "Submitting..." : "Login"}
        </button>

        {auth.loginStatus === "rejected" && <p>{auth.loginError}</p>}
      </StyledForm>
    </>
  );
};

export default Login;
