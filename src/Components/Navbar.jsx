import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const CustomNavbar = () => {
  const role = localStorage.getItem("role");
  console.log("user", role);
  const nav = useNavigate();
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/home">Role-Based Access</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link as={Link} to={"/student"}>
            Manage Students
          </Nav.Link>
          {role === "admin" && (
            <Nav.Link as={Link} to="/teacher">
              Manage Teachers
            </Nav.Link>
          )}

          <Button
            className={"btn btn-primary bg-light text-secondary"}
            // to="/"
            onClick={() => {
              localStorage.removeItem("role");
              nav("/");
            }}
          >
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
