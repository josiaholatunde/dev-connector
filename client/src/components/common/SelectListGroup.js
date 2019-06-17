import React from "react";
import PropTypes from "prop-types";
import "./TextFieldGroup.scss";
import classnames from "classnames";

const SelectListGroup = ({
  name,
  error,
  placeholder,
  info,
  onChange,
  options,
  value
}) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div className="form-group">
      <select
        name={name}
        className={classnames({ "is-invalid": error })}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      >
        {selectOptions}
      </select>
      {info && <span className="text-mute">{info}</span>}
      {error && <span className="invalid-feedback">{error}</span>}
    </div>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  info: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default SelectListGroup;
