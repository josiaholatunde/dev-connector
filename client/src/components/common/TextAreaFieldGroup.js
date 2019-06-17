import React from "react";
import PropTypes from "prop-types";
import "./TextFieldGroup.scss";
import classnames from "classnames";

function TextAreaFieldGroup({
  name,
  error,
  placeholder,
  info,
  onChange,
  value
}) {
  return (
    <div className="form-group">
      <textarea
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

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  disabled: PropTypes.string,
  info: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default TextAreaFieldGroup;
