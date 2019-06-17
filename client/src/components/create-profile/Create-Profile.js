import React, { Component } from "react";

class CreateProfile extends Component {
  state = {
    displaySocialInputs: false,
    handle: "",
    company: "",
    website: "",
    status: "",
    skills: "",
    githubUsername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
    errors: {}
  };
  render() {
    return (
      <div>
        <h1>Create Profile</h1>
      </div>
    );
  }
}

export default CreateProfile;
