import React from "react";
import Sidebar from "./components/Sidebar.jsx";
import Movies from "./pages/Movies.jsx";
import Users from "./pages/Users.jsx";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";

export default function Admin() {
  return (
    <div className="row m-0 p-0">
      <div className="col-md-3 m-0 p-0 bg-dark" style={{ height: "100vh" }}>
        <Sidebar />
      </div>
      <div className="col-md-9 p-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies/>} />
          <Route path="/users" element={<Users/>} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}
