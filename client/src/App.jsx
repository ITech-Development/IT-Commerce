import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "./features/authslice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser(null));
  }, [dispatch]);
  return (
    <Router>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/productlist" element={<ProductList />} />
        <Route path="/productDetails" element={<ProductDetails />} />
        <Route path="/error404" element={<NotFound />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* <Redirect to="/error404"/> */}
      </Routes>
    </Router>
  );
}

export default App;
