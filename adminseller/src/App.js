import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import './App.css';
import Navbar from "./components/navbar"
import AddProduct from "./pages/addProduct"
import Login from "./components/auth/Login";
import Dashboard from "./pages/dashboard";
import GetProduct from "./pages/getProducts";
import React, { createContext, useEffect, useReducer } from "react";
import { loadUser } from "./features/authslice";
import { useDispatch } from "react-redux";
import { initialState, reducer } from "./reducer/UseReducer";

export const UserContext = createContext();

const isLoggedIn = localStorage.getItem('access_token')

const Routing = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn ? <Navigate to="/dashboard" /> : <Login />
        }
      />
      <Route path="/products" element={<GetProduct />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/add-product" element={<AddProduct />} />
      {/* <Route path="/edit/:id" element={<EditProduct />} /> */}
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
