import React from "react";
import PropTypes from "prop-types";

TextAreaField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  register: PropTypes.object.isRequired,

  row: PropTypes.number,
  placeholder: PropTypes.string,
};

function TextAreaField({ name, label, placeholder, row = 4, register }) {
  return (
    <div className="mb-2">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <textarea
        id={name}
        rows={row}
        className="block p-2.5 w-full  bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
        placeholder={placeholder}
        {...register}
      />
    </div>
  );
}

export default TextAreaField;
