import React from "react";
import PropTypes from "prop-types";
import "./TextFieldGroup.scss";
import classnames from "classnames";

function TextFieldGroup({
  type,
  name,
  error,
  placeholder,
  disabled,
  info,
  onChange,
  value
}) {
  return (
    <div className="form-group">
      <input
        type={type}
        name={name}
        className={classnames({ "is-invalid": error })}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {info && <span className="text-mute">{info}</span>}
      {error && <span className="invalid-feedback">{error}</span>}
    </div>
  );
}

TextFieldGroup.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  disabled: PropTypes.string,
  info: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

TextFieldGroup.defaultProps = {
  type: "text"
};

export default TextFieldGroup;
