import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App.jsx";

const Logout = () => {
  const { dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = () => {
    // TODO: Show a confirmation modal to ask the user if they are sure they want to log out.

    // Remove access token from local storage
    localStorage.removeItem("access_token");

    // Dispatch action to update user state
    dispatch({ type: "LOGOUT" }); // Use a constant like 'LOGOUT' for action type

    // Redirect to the login page
    navigate("/login");
  };

  return (
    <div>
      <h2>Logout</h2>
      <p>Are you sure you want to log out?</p>
      <button type="button" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
