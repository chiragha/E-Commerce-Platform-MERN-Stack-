import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import Products from './pages/Products';
import Buy from './pages/Buy';
import Purchases from './pages/Purchases';
import Settings from './components/Settings';
import { Navigate } from 'react-router-dom';


// Admin Components
import AdminSignup from './Admin/AdminSignup';
import AdminLogin from './Admin/AdminLogin';
import Dashboard from './Admin/Dashboard';
import CreateProduct from './Admin/CreateProduct';
import OurProducts from './Admin/OurProducts';
import UpdateProduct from './Admin/UpdateProduct';

const App = () => {

  const user = JSON.parse(localStorage.getItem("user"));
  const admin = JSON.parse(localStorage.getItem("admin"));
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />   

        <Route path="/products" element={<Products />} />   

        <Route path="/buy/:productId" element={<Buy />} />   

       <Route
          path="/purchases"
          element={user ? <Purchases /> : <Navigate to={"/login"} />}
        />  
        <Route path="/settings" element={<Settings />} />   
        

        {/* Admin Routes  */}
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={admin ? <Dashboard /> : <Navigate to={"/admin/login"} />}
        />
        <Route path="/admin/create-product" element={<CreateProduct />} />
        <Route path="/admin/our-products" element={<OurProducts />} />
        <Route path="/admin/update-products/:productId" element={<UpdateProduct />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;