import React, { Component } from "react";
import { connect } from "react-redux";
import "./auth.scss";
class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {}
  };

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
    console.log(newUser);
  };
  render() {
    const { name, email, password, password2 } = this.state;
    return (
      <div className="con text-center">
        <h1 className="mb-4">Sign Up</h1>
        <p className="mb-4">Create your DevConnector account</p>
        <form>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={this.handleChange}
            />
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
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password2"
              placeholder="Confirm Password"
              value={password2}
              onChange={this.handleChange}
            />
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

export default connect()(Register);
