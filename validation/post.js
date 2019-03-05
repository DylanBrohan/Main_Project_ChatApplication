const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};
  // If it exists it will be the result
  //   if post field doesnt exist, make it an empty string
  data.text = !isEmpty(data.text) ? data.text : "";

  if (
    !Validator.isLength(data.text, {
      min: 10,
      max: 300
    })
  ) {
    errors.text = "Post must be between 10 and 300 charecters";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "text Field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
