import React, { Component } from "react";
import { connect } from "react-redux";
import { getProfiles } from "../../actions/profileAction";
import Spinner from "../common/Spinner";
import ProfileItem from "./ProfileItem";
class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }
  render() {
    const { profiles, loading } = this.props.profiles;
    let profileItems;
    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      } else {
        profileItems = <h3>No Profiles to display</h3>;
      }
    }
    return (
      <div className="text-center">
        <h1 className="mb-4">Developer Profiles</h1>
        <p className="mb-3">Browse and connect with developers</p>
        {profileItems}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  profiles: state.profile
});
export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
