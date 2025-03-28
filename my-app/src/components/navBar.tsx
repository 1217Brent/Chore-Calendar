import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import { signOut } from "firebase/auth"; // Import Firebase signOut
import { auth } from "../firebaseConfig"; // Import Firebase auth

function NavBar() {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignOut = async () => {
    try {
      await signOut(auth); // Sign out the user from Firebase Authentication
      console.log("User signed out successfully");
      navigate("/"); // Redirect to the login page
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="text-white vh-100 d-flex flex-column p-3" style={{ width: "280px", backgroundColor: "#222222" }}>
      <div
        className="d-flex align-items-center justify-content-center mb-4"
        style={{
          marginTop: "20px", // Increased margin to shift the text down
        }}
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
      <div className="mt-auto">
        <div className="d-flex align-items-center text-white">
          <img
            src="https://github.com/mdo.png"
            alt=""
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <strong>mdo</strong>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;