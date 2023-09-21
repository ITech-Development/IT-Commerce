import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import Login from "./components/auth/Login";
import Dashboard from "./pages/dashboard";
import GetTransactionList from "./pages/getTransactionList";
import GetOrderList from "./pages/getOrderList";
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
          <Route path="/" element={<Dashboard />} />
          <Route path="/transaction-list" element={<GetTransactionList />} />
          <Route path="/order-list" element={<GetOrderList />} />
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