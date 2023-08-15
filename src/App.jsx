import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useAuth } from "./jotai/useAuth";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Navbar from "./components/navbar";
import Profile from "./pages/profile";
import "./App.css";

function App() {
  // const { auth } = useAuth();

  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
