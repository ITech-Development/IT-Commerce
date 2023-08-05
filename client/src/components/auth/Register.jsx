import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Regis from "../../assets/regis.png";


const Register = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  // const [imageProfile, setImageProfile] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation
    if (!fullName || !email || !password || !phoneNumber || !address) {
      alert("Please fill in all fields.");
      return;
    }

    // Prepare user data object
    const userData = {
      fullName,
      email,
      password,
      phoneNumber,
      address,
      // imageProfile,
    };

    try {
      // Call the API to register the user
      const response = await axios.post(
        "http://localhost:3100/users/register",
        userData
      );
      console.log("Registration response:", response.data);

      // Clear form fields
      setFullName("");
      setEmail("");
      setPassword("");
      setPhoneNumber("");
      setAddress("");
      // setImageProfile('');

      // Display success message or redirect to another page
      alert("Registration successful!");

      // Redirect to the Home page
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
<div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignContent: "center",
        marginTop: '50px'
      }}
    >
    <div className="div">
      <h2 className="h2">Register</h2>
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
            className="inputEmail"
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
            className="inputPass"
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
          />
        </div>
        {/* <div>
          <label className='label' htmlFor="imageProfile">Image Profile:</label>
          <input
            type="text"
            id="imageProfile"
            value={imageProfile}
            onChange={(e) => setImageProfile(e.target.value)} className='inputProfiel'
          />
        </div> */}
        <button className="button" type="submit">
          Register
        </button>
      </form>
      <p className="p">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
    <div>
        <img
          style={{
            maxWidth: "500px",
          position: 'relative',
           top: "150px",
           right: '150px'
          }}
          src={Regis}
          alt=""
        />
      </div>
    </div>
  );
};

export default Register;
