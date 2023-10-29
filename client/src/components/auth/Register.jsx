import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Regis from "./FuelRegis.png";

const Register = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState(""); // State untuk pesan kesalahan
  const [errorPhoneNumber, setErorrPhoneNumber] = useState("")
  const [alertEmail, setAlertEmail] = useState("")
  const [registrationSuccess, setRegistrationSuccess] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation
    if (!fullName || !email || !password || !phoneNumber || !address) {
      setError("Please fill in all fields.");
      return;
    }

    if (!phoneNumber.startsWith("08")) {
      setErorrPhoneNumber("Nomor ponsel harus di mulai dari '08'.");
      return;
    }

    // Prepare user data object
    const userData = {
      fullName,
      email,
      password,
      phoneNumber,
      address,
    };

    try {
      // Call the API to register the user
      const response = await axios.post(
        "http://localhost:3100/users/register",
        userData
      );
      console.log("Registration response:", response.data);
      setRegistrationSuccess(true);
      // Clear form fields
      setFullName("");
      setEmail("");
      setPassword("");
      setPhoneNumber("");
      setAddress("");
      // setImageProfile('');

      // Display success message or redirect to another page
      // alert("Registration successful!");
      // Redirect to the Home page
      setTimeout(() => {
        navigate("/login");
      }, 4000); // Redirect after 4 seconds
    } catch (error) {
      console.error("Registration error:", error);
      setAlertEmail(error.response.data.error)
    }
  };

  return (
    <div className="containerregis">
      <div className="imgStack">
        <img className="imgregis img2" src={Regis} alt="" />
      </div>
      <div className="divRegis">
        <h2 className="h2">Register</h2>
        {registrationSuccess ? (
          <p className="success" style={{ color: 'blue' }}>Registration successful!</p>
        ) : null}

        <form onSubmit={handleSubmit} className="form">
          <div>
            <label className="label" htmlFor="fullName">
              Full Name :{" "}
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="inputFull"
              required
            />
          </div>
          <div>
            <label className="label" htmlFor="email">
              Email :{" "}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="inputEmailRegis"
              required
            />
          </div>
          <div>
            <label className="label" htmlFor="password">
              Password :{" "}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="inputPassRegis"
              required
            />
          </div>
          <div>
            <label className="label" htmlFor="phoneNumber">
              Phone Number :{" "}
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="inputPhone"
              required
            />
          </div>
          <div>
            <label className="label" htmlFor="address">
              Address :{" "}
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="inputAddress"
              required
            />
          </div>
          <button className="button" type="submit">
            Register
          </button>
        </form>

        <p className="error" style={{ color: 'red' }}>{error}</p>
        <p className="error" style={{ color: 'red' }}>{alertEmail}</p>
        <p className="errorPhoneNumber" style={{ color: 'red' }}>{errorPhoneNumber}</p>
        <p className="navigate-login" style={{ color: 'black' }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>



    </div>
  );
};

export default Register;
