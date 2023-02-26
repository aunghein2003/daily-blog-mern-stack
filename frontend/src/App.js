import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import BlogCreate from "./pages/BlogCreate";
import { ToastContainer } from "react-toastify";
import BlogDetail from "./pages/BlogDetail";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/new" element={<BlogCreate />} />
        <Route path="/:blogId" element={<BlogDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default App;
