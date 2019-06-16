import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authAction";
import classnames from "classnames";
import PropTypes from "prop-types";
class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const userToLogin = {
      email,
      password
    };
    this.props.loginUser(userToLogin);
    console.log(userToLogin);
  };

  render() {
    const { email, password, errors } = this.state;
    console.log("Yo", this.props);
    return (
      <div className="con text-center">
        <h1 className="mb-4">Login</h1>
        <p className="mb-4">Login to your DevConnector account</p>
        <form noValidate onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              className={classnames({ "is-invalid": errors.email })}
              placeholder="Email"
              value={email}
              onChange={this.handleChange}
            />
            {errors.email && (
              <span className="invalid-feedback">{errors.email}</span>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              className={classnames({ "is-invalid": errors.password })}
              name="password"
              placeholder="Password"
              value={password}
              onChange={this.handleChange}
            />
            {errors.password && (
              <span className="invalid-feedback">{errors.password}</span>
            )}
          </div>
          <input
            type="submit"
            className="btn btn-blue btn-lg"
            name="signup"
            value="Login"
          />
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
