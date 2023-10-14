import React, { createContext, useReducer } from "react";
import "./App.css";
import Login from "./components/auth/Login";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import Products from "./pages/products";
import Users from "./pages/users";
import Transactions from "./pages/transactions";
import NotFound from "./pages/notFound";
import Dashboard from "./pages/dashboard";
import Home from "./pages/homepage";
// import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/navbar";
import { initialState, reducer } from "./reducer/UseReducer";

export const UserContext = createContext();

const isLoggedIn = localStorage.getItem('access_token'); // Simulasikan status login (true jika user sudah login)

const Routing = () => {
  return (
    <Routes>
      {!isLoggedIn ? (
        <>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Login />} />
        </>
      ) : (
        <>
          <Route path="*" element={<NotFound />} />
          <Route path="/products" element={<Products />} />
          <Route path="/users" element={<Users />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/" element={<Dashboard />} />
        </>
      )}
    </Routes>
  );
};

function App() {
  // const dispatchRedux = useDispatch();

  // useEffect(() => {
  //   dispatchRedux(loadUser(null));
  // }, [dispatchRedux]);

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ state, dispatch }}>
        <ToastContainer />
        <Navbar />
        <Routing />
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
