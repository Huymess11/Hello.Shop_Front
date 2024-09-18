import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import PropTypes from "prop-types";
import React from "react";
import { IoClose } from "react-icons/io5";
import InputField from "../../../components/form-control/InputField/InputField";
import PasswordField from "../../../components/form-control/PasswordField/PasswordField";
import { LinearProgress } from "@mui/material";

LoginForm.propTypes = {
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
};

function LoginForm({ onClose, onSubmit, onChange }) {
  const schema = yup.object().shape({
    identifier: yup
      .string()
      .required("Please enter your email.")
      .email("Please enter a valid email."),
    password: yup.string().required("Please enter your password."),
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const formSubmit = async (data) => {
    if (onSubmit) {
      await onSubmit(data);
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleChangeForm = () => {
    if (onChange) {
      onChange();
    }
  };

  return (
    <div className="absolute z-50 top-0 left-0 right-0 flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="relative w-full p-6 m-auto bg-white rounded-md shadow-md max-w-xl">
        {isSubmitting && (
          <LinearProgress
            sx={{ position: "absolute", top: 0, left: 0, right: 0 }}
          />
        )}
        <IoClose
          onClick={handleClose}
          className="absolute top-2 right-2 text-3xl rounded-full hover:bg-gray-200 cursor-pointer"
        />
        <h1 className="text-3xl font-semibold text-center text-red-500">
          Sign in
        </h1>
        <form className="mt-6" onSubmit={handleSubmit(formSubmit)}>
          <InputField
            id="identifier"
            label="Email"
            placeholder="Enter your email..."
            register={{ ...register("identifier") }}
            errorMessage={errors.identifier?.message}
          />
          <PasswordField
            id="password"
            label="Password"
            placeholder="Enter your password..."
            register={{ ...register("password") }}
            errorMessage={errors.password?.message}
          />

          <a href="/" className="text-xs text-red-500 hover:underline">
            Forget Password?
          </a>
          <div className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-500 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700">
              Login
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Don't have an account?{" "}
          <span
            onClick={handleChangeForm}
            className="font-medium text-red-500 hover:underline cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
