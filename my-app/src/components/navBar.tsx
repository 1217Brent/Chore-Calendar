import React from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation

function NavBar() {
  const location = useLocation(); // Get the current location

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
      style={{
        width: "280px",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        overflowY: "auto",
      }}
    >
      <Link
        to="/dashboard"
        className="d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        style={{ textAlign: "center" }}
      >
        <svg className="bi me-2" width="40" height="32">
          <use xlinkHref="#bootstrap" />
        </svg>
        <span className="fs-4">Chore Calendar</span>
      </Link>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link
            to="/dashboard"
            className={`nav-link ${
              location.pathname === "/dashboard" ? "active" : "text-white"
            }`}
            aria-current="page"
          >
            <svg className="bi me-2" width="16" height="16">
              <use xlinkHref="#home" />
            </svg>
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/instructions"
            className={`nav-link ${
              location.pathname === "/instructions" ? "active" : "text-white"
            }`}
          >
            <svg className="bi me-2" width="16" height="16">
              <use xlinkHref="#speedometer2" />
            </svg>
            Instructions
          </Link>
        </li>
        <li>
          <Link
            to="/createchore"
            className={`nav-link ${
              location.pathname === "/createchore" ? "active" : "text-white"
            }`}
          >
            <svg className="bi me-2" width="16" height="16">
              <use xlinkHref="#table" />
            </svg>
            Add Chore
          </Link>
        </li>
        <li>
          <Link
            to="#"
            className="nav-link text-white"
          >
            <svg className="bi me-2" width="16" height="16">
              <use xlinkHref="#grid" />
            </svg>
            Sign Out
          </Link>
        </li>
      </ul>
      <hr />
      <div className="dropdown">
        <Link
          to="#"
          className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
          id="dropdownUser1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="https://github.com/mdo.png"
            alt=""
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <strong>mdo</strong>
        </Link>
        <ul
          className="dropdown-menu dropdown-menu-dark text-small shadow"
          aria-labelledby="dropdownUser1"
        >
          <li>
            <Link className="dropdown-item" to="#">
              Settings
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="#">
              Profile
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <Link className="dropdown-item" to="#">
              Sign out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;