import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logOut } from "../../actions/authAction";
import PropTypes from "prop-types";
import "./Navbar.scss";
class NavBar extends Component {
  render() {
    const { isAuthenticated, user } = this.props.auth;
    console.log("kk", user);

    const authLinks = (
      <React.Fragment>
        <li>
          <a
            href="#"
            onClick={() => this.props.logOut()}
            className="logout flex-center"
          >
            <img
              src={user.avatar}
              style={{
                borderRadius: "50%",
                width: "1.4rem",
                marginRight: ".3rem"
              }}
              alt={user.name}
              title="You must have a gravatar connected to your email to view this image"
            />
            {"  "}
            Logout
          </a>
        </li>
      </React.Fragment>
    );
    const guestLinks = (
      <React.Fragment>
        <li>
          <Link to="/register">Sign Up</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </React.Fragment>
    );

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
            {isAuthenticated ? authLinks : guestLinks}
          </ul>
        </div>
      </nav>
    );
  }
}

NavBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logOut: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logOut }
)(NavBar);
