import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../images/finwell.jpg";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={logo} alt="FinWell Logo" className="logo" />
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/analytics">Analytics</Link></li>
        <li><Link to="/blogfeed">BlogFeed</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

