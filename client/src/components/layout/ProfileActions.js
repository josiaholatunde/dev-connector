import React from "react";
import { Link } from "react-router-dom";
export default function ProfileActions() {
  return (
    <div>
      <Link to="/edit-profile" className="btn btn-primary">
        <i className="fas fa-user-circle"></i> Edit Profile
      </Link>

      <Link to="/add-experience" className="btn btn-danger">
        <i className="fab fa-black-tie"></i> Add Experience
      </Link>

      <Link to="/add-education" className="btn btn-blue">
        <i className="fas fa-graduation"></i> Add Education
      </Link>
    </div>
  );
}
