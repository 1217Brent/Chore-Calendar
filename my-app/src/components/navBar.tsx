import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; 
import { signOut } from "firebase/auth"; 
import { auth } from "../firebaseConfig"; 

function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
      navigate("/"); 
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav
      className="text-white d-flex flex-column p-3"
      style={{
        width: "200px", // Fixed sidebar width
        backgroundColor: "#222222",
        height: "76vh", // Ensure the sidebar takes full height
      }}
    >
      <div
        className="d-flex align-items-center justify-content-center mb-4"
        style={{ marginTop: "20px" }}
      >
        <Link to="/dashboard" className="text-white text-decoration-none">
          <span className="fs-4">Chore Calendar</span>
        </Link>
      </div>
      <hr />
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link
            to="/dashboard"
            className={`nav-link ${
              location.pathname === "/dashboard" ? "active text-primary" : "text-white"
            }`}
          >
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/createchore"
            className={`nav-link ${
              location.pathname === "/createchore" ? "active text-primary" : "text-white"
            }`}
          >
            Add Chore
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="#"
            onClick={(e) => {
              e.preventDefault();
              handleSignOut();
            }}
            className={`nav-link ${
              location.pathname === "/signout" ? "active text-primary" : "text-white"
            }`}
          >
            Sign Out
          </Link>
        </li>
      </ul>
      <hr />
    </nav>
  );
}

export default NavBar;
