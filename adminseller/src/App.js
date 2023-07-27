import { Routes, Route, BrowserRouter } from "react-router-dom";
import './App.css';
import Navbar from "./components/navbar"
import Login from "./components/auth/Login";
import Dashboard from "./pages/dashboard";
import React, { createContext, useEffect, useReducer } from "react";
import { loadUser } from "./features/authslice";
import { useDispatch } from "react-redux";

import { initialState, reducer } from "./reducer/UseReducer";

export const UserContext = createContext();

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

function App() {
  const dispatchRedux = useDispatch();

  useEffect(() => {
    dispatchRedux(loadUser(null));
  }, []);

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ state, dispatch }}>
        <Navbar />
        <Routing />
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
