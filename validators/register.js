const Validator = require("validator");

module.exports = data => {
  let errors = {};

  data.name = !data.name ? "" : data.name;
  data.email = !data.email ? "" : data.email;
  data.password = !data.password ? "" : data.password;
  data.password2 = !data.password2 ? "" : data.password2;

  if (
    !Validator.isLength(data.name.trim(), {
      min: 2,
      max: 30
    })
  ) {
    errors.name = "Name must be between 2 and 30 characters";
  }
  if (!data.name.trim()) errors.name = "Name is required";

  if (!Validator.isEmail(data.email.trim())) {
    errors.email = "Invalid Email";
  }
  if (!data.email.trim()) errors.email = "Email is required";

  if (
    !Validator.isLength(data.password.trim(), {
      min: 6,
      max: 10
    })
  ) {
    errors.password =
      "Invalid Password: Password Length should be between 6 and 10 characters";
  }

  if (!data.password) errors.password = "Password is required";

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords do not match";
  }
  if (!data.password2) errors.password2 = "Confirm Password is required";

  return {
    errors,
    isValid: Object.keys(errors).length === 0 || Object.values(errors).length === 0
  };
};