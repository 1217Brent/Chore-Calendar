import React from "react";
import { Link, useLocation } from "react-router-dom";

function NavBar() {
  const location = useLocation();

  return (
    <nav className=" text-white vh-100 d-flex flex-column p-3" style={{ width: "280px", backgroundColor: "#222222"}}>
      <Link to="/dashboard" className="d-flex align-items-center justify-content-center mb-3 text-white text-decoration-none">
        <span className="fs-4">Chore Calendar</span>
      </Link>
      <hr />
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/dashboard" className={`nav-link ${location.pathname === "/dashboard" ? "active text-primary" : "text-white"}`}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/createchore" className={`nav-link ${location.pathname === "/createchore" ? "active text-primary" : "text-white"}`}>
            Add Chore
          </Link>
        </li>
        <li>
          <Link to="#" className="nav-link text-white">Sign Out</Link>
        </li>
      </ul>
      <hr />
      <div className="mt-auto">
        <div className="d-flex align-items-center text-white">
          <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
          <strong>mdo</strong>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
