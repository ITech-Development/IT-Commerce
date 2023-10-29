import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
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
  // const [imageProfile, setImageProfile] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Add state for toggling password visibility

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="containerregis">
      <div className="imgStack">
        <img className="imgregis img2" src={Regis} alt="" />
      </div>
      <div className="divRegis">
        <h2 className="h2">Daftar Akun</h2>
        <form onSubmit={handleSubmit} className="form">
          <div>
            <label className="label" htmlFor="fullName">
              Nama Lengkap :{" "}
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
              className="inputEmailRegis"
            />
          </div>
          <div>
            <label className="label" htmlFor="password">
              Kata Sandi :{" "}
            </label>
            <input
              type={showPassword ? "text" : "password"} // Toggle between text and password
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="inputPassRegis"
            />
            <span
              className="password-toggles"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />} {/* Eye icons */}
            </span>
          </div>
          <div>
            <label className="labelHp" htmlFor="phoneNumber">
              Nomor Handphone:{" "}
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
              Alamat :{" "}
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="inputAddress"
            />
          </div>
          <button className="button" type="submit">
            Daftar
          </button>
        </form>
        <p className="p">
          Sudah punya akun? <Link to="/login">Masuk</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
