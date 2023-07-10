import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App.jsx';

const Logout = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove access token from local storage
    localStorage.removeItem('access_token');

    // Dispatch action to update user state
    dispatch({ type: 'USER', payload: false });

    // Redirect to the login page
    navigate('/login');
  };

  return (
    <div>
      <h2>Logout</h2>
      <p>Are you sure you want to log out?</p>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
