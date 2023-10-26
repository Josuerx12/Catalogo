import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/authContext.tsx";
import { ProductProvider } from "./context/productsContext.tsx";
import { AdminProvider } from "./context/adminContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <ProductProvider>
        <AdminProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AdminProvider>
      </ProductProvider>
    </AuthProvider>
  </React.StrictMode>
);
