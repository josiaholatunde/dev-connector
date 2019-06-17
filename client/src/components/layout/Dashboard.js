import React, { Component } from "react";
import { connect } from "react-redux";
import { getProfile } from "../../actions/profileAction";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";
import ProfileActions from "./ProfileActions";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getProfile();
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dashboard;
    if (profile === null || loading) {
      dashboard = <Spinner />;
    } else {
      if (Object.keys(profile).length > 0) {
        dashboard = (
          <div>
            <p>
              Welcome{" "}
              <Link style={{ color: "#333" }} to={`/profile/${profile.handle}`}>
                {user.name}
              </Link>
              <ProfileActions />
            </p>
          </div>
        );
      } else {
        dashboard = (
          <div>
            <p>Welcome {user.name}</p>
            <p>You have not yet set up a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-blue">
              {" "}
              Create Profile{" "}
            </Link>
          </div>
        );
      }
    }
    return (
      <div>
        <h1>Dashboard</h1>
        {dashboard}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});
export default connect(
  mapStateToProps,
  { getProfile }
)(Dashboard);
