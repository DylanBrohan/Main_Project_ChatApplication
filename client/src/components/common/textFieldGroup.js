import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
// Initial state
const TextFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled
}) => {
  return (
    <div className="form-group">
      <input
        type={type}
        className={classnames(
          // Is-invalid class, only if errors.email exists in the state
          "form-control form-control-lg",
          {
            "is-invalid": error
          }
        )}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {/* Error that is displayed */}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};
// Prop Checking on state props
TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};
// Default Props if there is none
TextFieldGroup.defaultProps = {
  type: "text"
};
export default TextFieldGroup;
