import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import Login from "./components/auth/Login";
import Dashboard from "./pages/dashboard";
import GetTransactionList from "./pages/getTransactionList";
import GetOrderList from "./pages/getOrderList";
import EditDeliveryStatus from "./pages/editDeliveryStatus/index";
import DetailsProduct from "./pages/detailsProduct";
import NotFound from "./pages/notFound";
import React, { createContext, useEffect, useReducer } from "react";
import Chat from "./pages/Chat";
import GetProductList from "./pages/getProductList";
import { Provider } from "react-redux";
import store from './app/store'

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
          <Route path="/product-list" element={<GetProductList/>}/>
          <Route path="/product-list/:id" element={<DetailsProduct/>}/>
          <Route path="/transaction-list" element={<GetTransactionList />} />
          <Route path="/order-list" element={<GetOrderList />} />
          <Route path="/order-list/:id" element={<EditDeliveryStatus />} />
          <Route path="/products/:id" element={<DetailsProduct />} />
          <Route path="/chat" element={<Chat />} />
        </>
      )}
    </Routes>
  );
};

function App() {

  return (
    <BrowserRouter>
        <Provider store={store}>
        <Navbar />
        <Routing />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
