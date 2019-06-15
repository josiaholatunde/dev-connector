import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Navbar.scss";
class NavBar extends Component {
  render() {
    return (
      <nav className="nav bg-primary">
        <div className="container flex-con">
          <ul className="nav-left">
            <li className="brand">
              <Link to="/">DevConnector</Link>
            </li>
            <li>
              <Link to="/profile">Developers</Link>
            </li>
          </ul>
          <ul className="nav-right">
            <li>
              <Link to="/register">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
