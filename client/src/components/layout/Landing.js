import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="text-center">
                <h1 className="display-lead mb-4">Developer Connector</h1>
                <p className="lead mb-4">
                  {" "}
                  Create a developer profile/portfolio, share posts and get help
                  from other developers
                </p>
                <Link to="/register" className="btn btn-blue mr-2">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-plain mx-2">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
