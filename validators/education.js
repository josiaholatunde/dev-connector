const Validator = require("validator");

module.exports = data => {
  let errors = {};

  data.school = !data.school ? "" : data.school;
  data.degree = !data.degree ? "" : data.degree;
  data.fieldOfStudy = !data.fieldOfStudy ? "" : data.fieldOfStudy;
  data.from = !data.from ? "" : data.from;
  data.to = !data.to ? "" : data.to;


  if (!data.school.trim()) errors.school = "School field is required";
  if (!data.degree.trim()) errors.degree = "Degree field is required";
  if (!data.From.trim()) errors.From = "From field is required";
  if (!data.fieldOfStudy.trim()) errors.fieldOfStudy = "Field Of Study field is required";
  if (!data.current && !data.to.trim()) errors.to = "To Date field is required when this is not your current School";

  if (!data.from) errors.from = "From Date is required";
  if (!data.company) errors.company = "Company field is required";

  return {
    errors,
    isValid: Object.keys(errors).length === 0 || Object.values(errors).length === 0
  };
};