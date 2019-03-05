// Setting up validation function --isEmpty--
// isEmpty is = to a value of - Undefined, null, an empty string || object
const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

module.exports = isEmpty;
