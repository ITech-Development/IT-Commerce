import React, { createContext, useReducer } from "react";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Products from "./pages/products";
import Home from "./pages/homepage";
// import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/navbar";
import { initialState, reducer } from "./reducer/UseReducer";

export const UserContext = createContext();

const Routing = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/products" element={<Products />} />
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
