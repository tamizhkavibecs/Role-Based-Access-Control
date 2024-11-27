import React from "react";

import Student from "./Student";
import Teacher from "./Teacher";
import CustomNavbar from "../Components/Navbar";

function Admin() {
  const role = localStorage.getItem("role");
  // console.log("user", role);
  return (
    <div>
      {(role === "admin" || role === "teacher") && <CustomNavbar />}
      <h1 className="text-center mt-5 pt-5">welocme to College Admission</h1>
    </div>
  );
}

export default Admin;
