import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import Login from "./components/auth/Login";
import Dashboard from "./pages/dashboard";
import GetProduct from "./pages/getProducts";
import GetUsers from "./pages/getUsers";
import DetailsProduct from "./pages/detailsProduct";
import NotFound from "./pages/notFound";
import React, { createContext, useEffect, useReducer } from "react";
import { loadUser } from "./features/authslice";
import { useDispatch } from "react-redux";
import { initialState, reducer } from "./reducer/UseReducer";
import Chat from "./pages/Chat";

export const UserContext = createContext();

const Routing = () => {
  const accessToken = localStorage.getItem("access_token");
  return (
    <Routes>
      {!accessToken ? (
        <>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Login />} />
        </>
      ) : (
        <>
          <Route path="*" element={<NotFound />} />
          <Route path="/products" element={<GetProduct />} />
          <Route path="/users" element={<GetUsers />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products/:id" element={<DetailsProduct />} />
          <Route path="/chat" element={<Chat />} />
        </>
      )}
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
        <Navbar />
        <Routing />
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
