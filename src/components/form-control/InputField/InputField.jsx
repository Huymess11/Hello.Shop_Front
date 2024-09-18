import PropTypes from "prop-types";
import React from "react";

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  register: PropTypes.object.isRequired,

  type: PropTypes.string,
  placeholder: PropTypes.string,
  errorMessage: PropTypes.string,
  value: PropTypes.string,
};

function InputField({
  id,
  label,
  placeholder,
  type,
  register,
  errorMessage,
  required = false,
}) {
  return (
    <div className="mb-2">
      <label htmlFor={id} className="block text-sm font-semibold text-gray-800">
        {label}
        {required && <span className="font-light text-sm"> (bắt buộc)</span>}
      </label>
      <input
        id={id}
        {...register}
        placeholder={placeholder}
        type={type}
        className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
      />
      {errorMessage && (
        <span className="text-red-500 text-xs px-1">{errorMessage}</span>
      )}
    </div>
  );
}

export default InputField;
