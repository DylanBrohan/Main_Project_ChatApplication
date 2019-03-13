import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

// --SelectList Component--
// Used in Forms

const SelectListGroup = ({ name, value, error, info, onChange, options }) => {
  // Mapping through the values of a select group
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div className="form-group">
      <select
        className={classnames(
          // Is-invalid class, only if errors.email exists in the state
          "form-control form-control-lg",
          {
            "is-invalid": error
          }
        )}
        name={name}
        value={value}
        onChange={onChange}
      >
        {/* Is stored in the variable above Options */}
        {selectOptions}
      </select>
      {info && <small className="form-text text-muted">{info}</small>}
      {/* Error that is displayed */}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

// Prob checking needed
SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default SelectListGroup;
