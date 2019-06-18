import React, { Component } from "react";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addEducation } from "../../actions/profileAction";
import { withRouter } from "react-router-dom";
class AddEducation extends Component {
  state = {
    school: "",
    degree: "",
    fieldOfStudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
    disabled: false,
    errors: {}
  };
  handleCheck = e =>
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  handleChange = e => this.setState({ [e.target.name]: e.target.value });
  handleSubmit = e => {
    e.preventDefault();
    const { school, degree, fieldOfStudy, from, to, description } = this.state;
    const newEdu = {
      school,
      degree,
      fieldOfStudy,
      from,
      to,
      description
    };
    this.props.addEducation(newEdu, this.props.history);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  render() {
    const {
      errors,
      school,
      degree,
      fieldOfStudy,
      from,
      to,
      current,
      description,
      disabled
    } = this.state;

    return (
      <div className="text-center">
        <button type="submit" className="btn btn-primary">
          Go Back
        </button>
        <h1 className="mb-4">Add Education</h1>
        <p className="mb-3">
          Add any school, bootcamp, etc that you have attended
        </p>
        <small className="mb-4"> * = required fields</small>
        <form onSubmit={this.handleSubmit}>
          <TextFieldGroup
            name="school"
            value={school}
            placeholder="* School"
            error={errors.school}
            onChange={this.handleChange}
          />
          <TextFieldGroup
            name="degree"
            value={degree}
            placeholder="* Degree Title"
            error={errors.degree}
            onChange={this.handleChange}
          />
          <TextFieldGroup
            name="fieldOfStudy"
            value={fieldOfStudy}
            placeholder="Field Of Study"
            error={errors.fieldOfStudy}
            onChange={this.handleChange}
          />
          <h6>From Date:</h6>
          <TextFieldGroup
            name="from"
            type="date"
            value={from}
            error={errors.from}
            onChange={this.handleChange}
          />
          <h6>To Date:</h6>
          <TextFieldGroup
            name="to"
            type="date"
            value={to}
            disabled={disabled ? "disabled" : ""}
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
              checked={current}
            />
            <label htmlFor="current">Current Degree</label>
          </div>

          <TextAreaFieldGroup
            name="description"
            placeholder="Program Description"
            error={errors.description}
            onChange={this.handleChange}
            info="Tell us about the program"
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
export default connect(
  mapStateToProps,
  { addEducation }
)(withRouter(AddEducation));
