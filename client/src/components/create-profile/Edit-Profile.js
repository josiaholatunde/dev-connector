import React, { Component } from "react";
import TextFieldGroup from "../common/TextFieldGroup";
import { connect } from "react-redux";
import SelectListGroup from "../common/SelectListGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { withRouter } from "react-router-dom";
import { createProfile, getProfile } from "../../actions/profileAction";

class EditProfile extends Component {
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
  componentDidMount() {
    this.props.getProfile();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      const skills = profile.skills.join(",");
      profile.company = !profile.company ? "" : profile.company;
      profile.website = !profile.website ? "" : profile.website;
      profile.location = !profile.location ? "" : profile.location;
      profile.githubUsername = !profile.githubUsername
        ? ""
        : profile.githubUsername;
      profile.bio = !profile.bio ? "" : profile.bio;
      profile.social =
        Object.keys(profile.social).length === 0 || !profile.social
          ? {}
          : profile.social;
      profile.social.twitter = !profile.social.twitter
        ? ""
        : profile.social.twitter;
      profile.social.facebook = !profile.social.facebook
        ? ""
        : profile.social.facebook;
      profile.social.instagram = !profile.social.instagram
        ? ""
        : profile.social.instagram;
      profile.social.linkedin = !profile.social.linkedin
        ? ""
        : profile.social.linkedin;
      profile.social.youtube = !profile.social.youtube
        ? ""
        : profile.social.youtube;

      const {
        handle,
        status,
        instagram,
        company,
        facebook,
        bio,
        youtube,
        twitter,
        githubUsername
      } = profile;

      this.setState({
        skills,
        handle,
        status,
        instagram,
        company,
        facebook,
        bio,
        youtube,
        twitter,
        githubUsername
      });
    }
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = e => {
    e.preventDefault();
    const {
      handle,
      status,
      instagram,
      company,
      facebook,
      bio,
      youtube,
      twitter,
      skills,
      githubUsername
    } = this.state;
    const newProfile = {
      handle,
      status,
      instagram,
      company,
      facebook,
      twitter,
      skills,
      bio,
      githubUsername,
      youtube
    };
    this.props.createProfile(newProfile, this.props.history);
    console.log("SUbmit");
  };
  render() {
    const {
      errors,
      handle,
      status,
      instagram,
      company,
      website,
      githubUsername,
      facebook,
      bio,
      youtube,
      skills,
      twitter,
      displaySocialInputs
    } = this.state;
    const options = [
      { label: "* Select Professional Status", value: 0 },
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Student or Learning", value: "Student or Learning" },
      { label: "Instructor Or Teacher", value: "Instructor or Teacher" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" }
    ];
    let socialInputs;
    if (displaySocialInputs) {
      socialInputs = (
        <div className="social-container" style={{ width: "100%" }}>
          <TextFieldGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            value={twitter}
            error={errors.twitter}
            onChange={this.handleChange}
          />
          <TextFieldGroup
            placeholder="Facebook Profile URL"
            name="facebook"
            value={facebook}
            error={errors.facebook}
            onChange={this.handleChange}
          />
          <TextFieldGroup
            placeholder="Instagram Profile URL"
            name="instagram"
            value={instagram}
            error={errors.instagram}
            onChange={this.handleChange}
          />
          <TextFieldGroup
            placeholder="Youtube Profile URL"
            name="youtube"
            value={youtube}
            error={errors.youtube}
            onChange={this.handleChange}
          />
        </div>
      );
    }

    return (
      <div className="text-center">
        <h1 className="mb-4">Edit Your Profile</h1>
        <small className="mb-4"> * = required fields</small>
        <form onSubmit={this.handleSubmit}>
          <TextFieldGroup
            name="handle"
            placeholder="Profile Handle"
            options={options}
            error={errors.handle}
            onChange={this.handleChange}
            info="A Unique name for your profile url. Your full name, Company name, nickname"
            value={handle}
          />
          <SelectListGroup
            name="status"
            error={errors.status}
            placeholder="Status"
            options={options}
            onChange={this.handleChange}
            value={status}
            info="Give us an idea of where you are at in your career"
          />

          <TextFieldGroup
            name="company"
            placeholder="Company"
            error={errors.company}
            onChange={this.handleChange}
            info="Could be your company or one you work for"
            value={company}
          />

          <TextFieldGroup
            name="website"
            placeholder="Website"
            error={errors.website}
            onChange={this.handleChange}
            info="Could be your website or one your company"
            value={website}
          />
          <TextFieldGroup
            name="skills"
            placeholder="Skills"
            error={errors.skills}
            onChange={this.handleChange}
            info="Your Skills: Please use comma separated list e.g. HTML,CSS,JS,PHP"
            value={skills}
          />

          <TextFieldGroup
            name="githubUsername"
            placeholder="Github Username"
            error={errors.githubUsername}
            onChange={this.handleChange}
            info="If you want your latest repos and a Github link, include your username"
            value={githubUsername}
          />

          <TextAreaFieldGroup
            name="bio"
            placeholder="A Short Bio"
            error={errors.bio}
            onChange={this.handleChange}
            info="Tell us a little about yourself"
            value={bio}
          />
          <div className="form-group">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                this.setState(prevState => ({
                  displaySocialInputs: !prevState.displaySocialInputs
                }));
              }}
            >
              Add Social Network Links
            </button>
          </div>
          <div className="form-group">{socialInputs}</div>
          <div className="form-group">
            <input type="submit" className="btn btn-danger" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile
});
export default connect(
  mapStateToProps,
  { createProfile, getProfile }
)(withRouter(EditProfile));
