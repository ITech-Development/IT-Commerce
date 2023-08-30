import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar";
import Login from "./components/auth/Login";
import AddProduct from "./pages/addProduct";
import AddCategory from "./pages/addCategory";
import AddType from "./pages/addType";
import GetProducts from "./pages/getProducts";
import EditProduct from "./pages/editProduct";
import DetailsProduct from "./pages/detailsProduct";
// import Dashboard from "./pages/dashboard"
import NotFound from "./pages/notFound"
import GetCategories from "./pages/getCategories"

import { initialState, reducer } from "./reducer/UseReducer";

import "./App.css";
import { createContext, useReducer } from "react";

export const UserContext = createContext();

const Routing = () => {

  const accessToken = localStorage.getItem('access_token')

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
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/dashboardProducts" element={<GetProducts />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/add-category" element={<AddCategory />} />
          <Route path="/add-type" element={<AddType />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/product/:id" element={<DetailsProduct />} />
          <Route path="/dashboard-categories" element={<GetCategories />} />
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
