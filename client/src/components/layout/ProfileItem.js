import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class ProfileItem extends Component {
  render() {
    const {
      user,
      name,
      company,
      status,
      location,
      handle,
      skills
    } = this.props.profile;
    console.log("dat", this.props.profile);
    return (
      <div className="row">
        <div className="col-6">
          <div className="col-2">
            <img src={user.avatar} alt={name} className="rounded-circle" />
          </div>
          <div className="col-lg-6">
            <h3> {user.name} </h3>
            <p>
              {" "}
              {status} {company && <span>at {company}</span>}{" "}
            </p>
            <p> {location && location} </p>
            <Link to={`/profile/${handle}`} className="btn btn-primary">
              View Profile
            </Link>
          </div>
        </div>
        <div className="col-2">
          <h3>Skills</h3>
          <ul>
            {skills.slice(0, 4).map((skill, index) => (
              <li className="list-item-group" key={index}>
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};
export default ProfileItem;
