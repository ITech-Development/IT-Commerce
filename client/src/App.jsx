import "./App.css";
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ProductList from "./pages/ProductList/ProductList";
import Navbar from "./components/navbar";
import ProductDetails from "./pages/ProductDetail";
import NotFound from "./components/sections/notFound";
import { ToastContainer } from "react-toastify";
import Cart from "./pages/Cart"; // Correct import statement for default export
import "react-toastify/dist/ReactToastify.css";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import ProductShipping from "./pages/productShipping";
import FirstStep from "./pages/productShipping/firstStep";
import SecondStep from "./pages/productShipping/secondStep";
import CheckTrans from "./pages/CheckTrans";
import ProfileUpdate from "./pages/profileUpdate";
import ServiceList from "./pages/ServiceList";
import CheckTransItech from "./pages/CheckTrans/itech";
import CheckTransIndoRiau from "./pages/CheckTrans/indoRiau";
import CheckTransJuvindo from "./pages/CheckTrans/juvindo";
import ProductCategoryNozzle from "./pages/ProductCategories/nozzle";
import ProductCategoryDeliveryValve from "./pages/ProductCategories/deliveryValve";
import ProductCategoryElement from "./pages/ProductCategories/element";
import ProductCategoryVEPump from "./pages/ProductCategories/vePump";
import ProductCategoryVEPumpParts from "./pages/ProductCategories/vePumpParts";
import ProductCategoryHeadRotor from "./pages/ProductCategories/headRotor";
import MyOrder from "./pages/MyOrder";
import DetailsOrder from "./pages/DetailsOrder";
import store from './app/store'
import { Provider } from "react-redux";
import CategoryList from './pages/CategoryList/CategoryList'
import CategoryDetail from './pages/CategoryDetail' 

const Routing = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Homepage />} />
      <Route path="/productlist" element={<ProductList />} />
      <Route path="/category-list" element={<CategoryList />} />
      <Route path="/category-list/:id" element={<CategoryDetail />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/error404" element={<NotFound />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/shipping" element={<ProductShipping />} />
      <Route path="/shipping" element={<FirstStep />} />
      <Route path="/shippingSecond" element={<SecondStep />} />
      <Route path="/check-trans" element={<CheckTrans />} />
      <Route path="/profile-update" element={<ProfileUpdate />} />
      <Route path="/services" element={<ServiceList />} />
      <Route path="/profile-update/:id" element={<ProfileUpdate />} />
      <Route path="/check-TransITech" element={<CheckTransItech />} />
      <Route path="/check-TransIR" element={<CheckTransIndoRiau />} />
      <Route path="/check-TransJuvindo" element={<CheckTransJuvindo />} />
      <Route path="/nozzle" element={<ProductCategoryNozzle />} />
      <Route path="/delivery-valve" element={<ProductCategoryDeliveryValve />} />
      <Route path="/element" element={<ProductCategoryElement />} />
      <Route path="/ve-pump" element={<ProductCategoryVEPump />} />
      <Route path="/ve-pump-parts" element={<ProductCategoryVEPumpParts />} />
      <Route path="/head-rotor" element={<ProductCategoryHeadRotor />} />
      <Route path="/my-order" element={<MyOrder />} />
      <Route path="/my-order/:id" element={<DetailsOrder />} />
    </Routes>
  );
};

function App() {

  return (
    <BrowserRouter>
      <Provider store={store}>
        <ToastContainer />
        <Navbar />
        <Routing />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
