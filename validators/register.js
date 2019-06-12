const Validator = require('validator');

module.exports = (data) => {
  let errors = {};

  if (!data.name || !Validator.isLength(data.name.trim(), {
      min: 2,
      max: 30
    })) {
    errors.name = 'Name is required';
  }
  if (!data.email || !Validator.isEmail(data.email.trim())) {
    errors.email = 'Email is required';
  }
  if (!data.password || !Validator.isLength(data.password.trim(), {
      min: 6,
      max: 10
    })) {
    errors.password = 'Invalid Password: Password Length should be between 6 and 10 characters';
  }
  return {
    errors,
    isValid: Object.keys(errors).length === 0 || Object.values(errors).length === 0
  }
}