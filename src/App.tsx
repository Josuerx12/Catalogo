import "./App.sass";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import About from "./pages/about";
import Navmenu from "./components/navbar";
import Shop from "./pages/shop";
import Recovery from "./pages/auth/recovery";
import { Auth } from "./context/authContext";
import User from "./pages/userProfile";
import UsersDashboard from "./pages/dashboards/users";
import ProductsDashboard from "./pages/dashboards/products";

function App() {
  const { user } = Auth();
  return (
    <div className="App">
      <Navmenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<About />} />
        <Route
          path="/perfil"
          element={user ? <User /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard/usuarios"
          element={
            user?.admin ? <UsersDashboard /> : <Navigate to="/produtos" />
          }
        />
        <Route
          path="/dashboard/produtos"
          element={
            user?.admin ? <ProductsDashboard /> : <Navigate to="/produtos" />
          }
        />
        <Route
          path="/produtos"
          element={user ? <Shop /> : <Navigate to="/login" />}
        />
        <Route
          path="/recovery"
          element={user ? <Navigate to="/produtos" /> : <Recovery />}
        />
        <Route
          path="/registrar-se"
          element={user ? <Navigate to="/produtos" /> : <Register />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/produtos" /> : <Login />}
        />
      </Routes>
    </div>
  );
}

export default App;
