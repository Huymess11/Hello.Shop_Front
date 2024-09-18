import PropTypes from "prop-types";
import React from "react";

SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
};

function SelectField({ name, label, options, register }) {
  return (
    <div className="flex items-center my-2">
      <label
        htmlFor={name}
        className="text-sm font-semibold text-gray-800 mr-2"
      >
        {label}
      </label>
      <select
        className="cursor-pointer p-2 border border-solid border-gray-200 rounded-md  focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
        id={name}
        name={name}
        {...register}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectField;
