import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Template from "./components/Template";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Product from "./pages/Product";
import NotFound from "./pages/NotFound";
import "./output.css";

const root = createRoot(document.getElementById("root"));

function App() {
  const token = localStorage.getItem("token");
  let payload = null;
  if (token) {
    try {
      payload = JSON.parse(window.atob(token.split(".")[1]));
    } catch (err) {
      console.error("Error decoding JWT token:", err);
    }
  }
  const isAuthenticated = token && payload;

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          {isAuthenticated ? (
            <Route path="/" element={<Template />}>
              <Route index element={<Products />} />
              <Route path="product" element={<Product />} />
              <Route path="product/:id" element={<Product />} />
            </Route>
          ) : (
            <Route path="/" element={<Login />} />
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

root.render(<App />);
