const Validator = require("validator");

module.exports = data => {
  let errors = {};

  data.email = !data.email ? "" : data.email;
  data.password = !data.password ? "" : data.password;


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

  return {
    errors,
    isValid: Object.keys(errors).length === 0 || Object.values(errors).length === 0
  };
};