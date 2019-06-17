import React, { Component } from "react";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import { GET_ERRORS } from "../../actions/types";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
class AddExperience extends Component {
  state = {
    errors: {}
  };
  handleCheck = e => {};
  handleChange = e => this.setState({ [e.target.name]: e.target.value });
  handleSubmit = e => {
    e.preventDefault();
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  render() {
    const {
      errors,
      company,
      title,
      location,
      from,
      to,
      current,
      description
    } = this.state;

    return (
      <div className="text-center">
        <button type="submit" className="btn btn-primary">
          Go Back
        </button>
        <h1 className="mb-4">Add Experience</h1>
        <p className="mb-3">
          Add any job or position that you have had in the past
        </p>
        <small className="mb-4"> * = required fields</small>
        <form onSubmit={this.handleSubmit}>
          <TextFieldGroup
            name="company"
            value={company}
            placeholder="* Company"
            error={errors.company}
            onChange={this.handleChange}
          />
          <TextFieldGroup
            name="title"
            value={title}
            placeholder="* Job Title"
            error={errors.title}
            onChange={this.handleChange}
          />
          <TextFieldGroup
            name="location"
            value={location}
            placeholder="Location"
            error={errors.location}
            onChange={this.handleChange}
          />
          <TextFieldGroup
            name="from"
            type="date"
            value={from}
            error={errors.from}
            onChange={this.handleChange}
          />
          <TextFieldGroup
            name="to"
            type="date"
            value={to}
            error={errors.to}
            onChange={this.handleChange}
          />
          <div className="form-group">
            <input
              type="checkbox"
              id="current"
              onChange={this.handleCheck}
              name="current"
              value={current}
            />
            <label htmlFor="current">Current Job</label>
          </div>

          <TextAreaFieldGroup
            name="description"
            placeholder="Job Description"
            error={errors.description}
            onChange={this.handleChange}
            info="Tell us about the position"
            value={description}
          />
          <div className="form-group">
            <input type="submit" className="btn btn-danger" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
});
export default connect(mapStateToProps)(AddExperience);
