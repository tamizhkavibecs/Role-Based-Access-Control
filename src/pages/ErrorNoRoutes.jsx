import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const ErrorNoRoutes = () => {
  const role = localStorage.getItem("role");
  // console.log("users", role);
  const nav = useNavigate();
  return (
    <>
      <div>ErrorNoRoutes</div>
      <Button
        onClick={() => {
          role ? nav("/home") : nav("/");
        }}
      >
        {role ? "Admin" : "login"}
      </Button>
    </>
  );
};

export default ErrorNoRoutes;
