const Validator = require("validator");

module.exports = data => {
  let errors = {};

  data.status = !data.status ? "" : data.status;
  data.githubUsername = !data.githubUsername ? "" : data.githubUsername;
  data.handle = !data.handle ? "" : data.handle;
  data.skills = !data.skills ? "" : data.skills;
  data.website = !data.website ? "" : data.website;
  if (!data.socials) data.socials = {}
  data.socials.youtube = !data.socials.youtube ? "" : data.socials.youtube;
  data.socials.facebook = !data.socials.facebook ? "" : data.socials.facebook;
  data.socials.twitter = !data.socials.twitter ? "" : data.socials.twitter;
  data.socials.instagram = !data.socials.instagram ? "" : data.socials.instagram;
  data.socials.linkedin = !data.socials.linkedin ? "" : data.socials.linkedin;

  if (!Validator.isLength(data.handle, {
      min: 2,
      max: 40
    })) {
    errors.handle = "Handle field must be between 2 and 40 characters";
  }
  if (!data.handle.trim()) errors.handle = "Handle field is required";

  if (!data.githubUsername.trim()) errors.githubUsername = "Github Username field is required";

  if (!data.status.trim()) errors.status = "Status field is required";
  if (!data.skills.trim()) errors.skills = "Skills field is required";

  if (data.website.trim()) {
    if (!Validator.isURL(data.website.trim())) {
      errors.website = "Not a valid Url";
    }
  };

  if (data.socials.youtube.trim()) {
    if (Validator.isURL(data.socials.youtube.trim())) {
      errors.youtube = "Not a valid Url";
    }
  };

  if (data.socials.instagram.trim()) {
    if (Validator.isURL(data.socials.instagram.trim())) {
      errors.instagram = "Not a valid Url";
    }
  };

  if (data.socials.twitter.trim()) {
    if (Validator.isURL(data.socials.twitter.trim())) {
      errors.twitter = "Not a valid Url";
    }
  };

  if (data.socials.linkedin.trim()) {
    if (Validator.isURL(data.socials.linkedin.trim())) {
      errors.linkedin = "Not a valid Url";
    }
  };

  return {
    errors,
    isValid: Object.keys(errors).length === 0 || Object.values(errors).length === 0
  };
};