import "./App.css";
import React, { createContext, useEffect, useReducer } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ProductList from "./pages/ProductList/ProductList";
import Navbar from "./components/navbar";
import ProductDetails from "./pages/ProductDetail";
import NotFound from "./components/sections/notFound";
import { ToastContainer } from "react-toastify";
import Cart from "./pages/Cart";
import "react-toastify/dist/ReactToastify.css";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import { useDispatch } from "react-redux";
import { loadUser } from "./features/authslice";

import { initialState, reducer } from "./reducer/UseReducer";

export const UserContext = createContext();

const Routing = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Homepage />} />
      <Route path="/productlist" element={<ProductList />} />
      <Route path="/productDetails" element={<ProductDetails />} />
      <Route path="/error404" element={<NotFound />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
};

function App() {


  const dispatchRedux = useDispatch();

  useEffect(() => {
    dispatchRedux(loadUser(null));
  }, [dispatchRedux]);


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
