import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import Navbar from "./components/navbar";
import Login from "./components/auth/Login";
import AddProduct from "./pages/addProduct";
import AddCategory from "./pages/addCategory";
import AddType from "./pages/addType";
import GetProducts from "./pages/getProducts";
import GetTypes from "./pages/getTypes";
import EditProduct from "./pages/editProduct";
import EditCategory from "./pages/editCategory";
import EditType from "./pages/editType";
import DetailsProduct from "./pages/detailsProduct";
import NotFound from "./pages/notFound"
import GetCategories from "./pages/getCategories"

import { initialState, reducer } from "./reducer/UseReducer";

import "./App.css";
import { createContext, useEffect, useReducer } from "react";

export const UserContext = createContext();

const Routing = () => {

  const accessToken = localStorage.getItem('access_token')
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate('/login'); // Arahkan pengguna ke halaman login jika tidak ada access token
    }
  }, [accessToken, navigate]);

  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      {accessToken ? (
        <>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<GetProducts />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/add-category" element={<AddCategory />} />
          <Route path="/add-type" element={<AddType />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/edit-category/:id" element={<EditCategory />} />
          <Route path="/edit-type/:id" element={<EditType />} />
          <Route path="/product/:id" element={<DetailsProduct />} />
          <Route path="/dashboard-categories" element={<GetCategories />} />
          <Route path="/dashboard-types" element={<GetTypes />} />
        </>
      ) : (
        <>
        <Route path="/login" element={<Login />} />
        </>
      )}
    </Routes>
  );
};

function App() {
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
