const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Validation settings/ testing
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is Not Valid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email Field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password Field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
