import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authAction";
import classnames from "classnames";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import "./auth.scss";
class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = e => {
    e.preventDefault();
    const { name, email, password, password2 } = this.state;
    const newUser = {
      name,
      email,
      password,
      password2
    };
    this.props.registerUser(newUser, this.props.history);
    console.log(newUser);
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    return null;
  }
  render() {
    const { name, email, password, password2, errors } = this.state;
    return (
      <div className="con text-center">
        <h1 className="mb-4">Sign Up</h1>
        <p className="mb-4">Create your DevConnector account</p>
        <form noValidate onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              className={classnames({ "is-invalid": errors.name })}
              placeholder="Name"
              value={name}
              onChange={this.handleChange}
            />
            {errors.name && (
              <span className="invalid-feedback">{errors.name}</span>
            )}
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={this.handleChange}
            />
            {errors.email && (
              <span className="invalid-feedback">{errors.email}</span>
            )}
            <span>
              This site uses Gravatar so if you want a profile image, use a
              Gravatar email
            </span>
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={this.handleChange}
            />
            {errors.password && (
              <span className="invalid-feedback">{errors.password}</span>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password2"
              placeholder="Confirm Password"
              value={password2}
              onChange={this.handleChange}
            />
            {errors.password2 && (
              <span className="invalid-feedback">{errors.password2}</span>
            )}
          </div>
          <input
            type="submit"
            className="btn btn-blue btn-lg"
            name="signup"
            value="Submit"
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
