const Validator = require("validator");

module.exports = data => {
  let errors = {};

  data.text = !data.text ? "" : data.text;
  data.name = !data.name ? "" : data.name;

  if (!Validator.isLength(data.text.trim(), {
      min: 10,
      max: 300
    })) {
    errors.text = 'Text field must be between 10 and 300 characters';
  }

  if (!data.text.trim()) errors.text = "Text field is required";
  if (!data.name.trim()) errors.name = "Name field is required";


  return {
    errors,
    isValid: Object.keys(errors).length === 0 || Object.values(errors).length === 0
  };
};