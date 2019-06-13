const Validator = require("validator");

module.exports = data => {
  let errors = {};

  data.title = !data.title ? "" : data.title;
  data.from = !data.from ? "" : data.from;
  data.company = !data.company ? "" : data.company;


  if (!data.title.trim()) errors.title = "Job title is required";

  if (!data.from) errors.from = "From Date is required";
  if (!data.company) errors.company = "Company field is required";
  if (!data.current && !data.to.trim()) errors.to = "To Date field is required when this is not your current School";


  return {
    errors,
    isValid: Object.keys(errors).length === 0 || Object.values(errors).length === 0
  };
};