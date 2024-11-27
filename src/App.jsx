import React, { useCallback, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Admin from "./pages/Admin";
import ErrorNoRoutes from "./pages/ErrorNoRoutes";
import Teacher from "./pages/Teacher";
import Student from "./pages/Student";
import CustomNavbar from "./Components/Navbar";
import Login from "./Components/Login";
function App() {
  const role = localStorage.getItem("role");
  // console.log("user", role, role === null);
  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/home" element={<Admin />} />
          <Route path="/teacher" element={<Teacher />} />
          <Route path="/student" element={<Student />} />
          <Route path="*" element={<ErrorNoRoutes />} />
        </Routes>
        ;
      </main>
    </>
  );
}

export default App;
