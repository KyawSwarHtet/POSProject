import { Router, Route, Routes, Navigate } from "react-router-dom";
// import "antd/dist/antd.css";
import React from "react";
import "./App.css";
import { HomePage } from "./pages/home/HomePage";
import CartPages from "./pages/cart/CartPages";
import ProductsPage from "./pages/products/ProductsPage";
import LoginPage from "./pages/loginAndregister/LoginPage";
import RegisterPage from "./pages/loginAndregister/RegisterPage";
import BillsPage from "./pages/bills/BillsPage";
import CustomerPage from "./pages/customer/CustomerPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPages />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bills"
          element={
            <ProtectedRoute>
              <BillsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customers"
          element={
            <ProtectedRoute>
              <CustomerPage />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;

//
export function ProtectedRoute({ children }) {
  if (localStorage.getItem("auth")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
