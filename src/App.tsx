import "./App.sass";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import Dashboard from "./pages/dashboard";
import About from "./pages/about";
import Navmenu from "./components/navbar";
import Shop from "./pages/shop";

function App() {
  return (
    <div className="App">
      <Navmenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/produtos" element={<Shop />} />
        <Route path="/registrar-se" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
