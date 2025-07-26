import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";

export const Header = ({
  title = "MyTodosList",
  darkMode,
  setDarkMode,
  user,
  onLogout,
}) => {
  const location = useLocation();

  return (
    <nav
      className={`navbar navbar-expand-lg ${
        darkMode ? "bg-dark text-white" : "bg-light"
      }`}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          {title}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
            {/* Dark Mode Toggle Switch before Home */}
            <li className="nav-item me-2">
              <label className="glass-toggle mb-0">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                />
                <span className="slider">
                  <span className="slider-icon">
                    {darkMode ? <FaMoon /> : <FaSun />}
                  </span>
                </span>
              </label>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link${
                  location.pathname === "/" ? " active" : ""
                }`}
                aria-current={location.pathname === "/" ? "page" : undefined}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link${
                  location.pathname === "/about" ? " active" : ""
                }`}
                aria-current={
                  location.pathname === "/about" ? "page" : undefined
                }
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">Welcome, {user.username}!</span>
                </li>
                <li className="nav-item">
                  <button
                    className={`btn btn-sm ${
                      darkMode ? "btn-danger" : "btn-outline-danger"
                    }`}
                    onClick={onLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link${
                      location.pathname === "/login" ? " active" : ""
                    }`}
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link${
                      location.pathname === "/register" ? " active" : ""
                    }`}
                    to="/register"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
