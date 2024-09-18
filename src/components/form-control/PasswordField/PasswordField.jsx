import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

PasswordField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  register: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  errorMessage: PropTypes.string,
};

function PasswordField({ id, label, placeholder, register, errorMessage }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-2">
      <label htmlFor={id} className="block text-sm font-semibold text-gray-800">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          {...register}
          placeholder={placeholder}
          type={showPassword ? "text" : "password"}
          className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
        />
        <div
          className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
        </div>
      </div>
      {errorMessage && (
        <span className="text-red-500 text-xs px-1">{errorMessage}</span>
      )}
    </div>
  );
}

export default PasswordField;
