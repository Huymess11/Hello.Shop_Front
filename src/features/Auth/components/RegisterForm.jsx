import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import PropTypes from "prop-types";
import React from "react";
import { IoClose } from "react-icons/io5";
import InputField from "../../../components/form-control/InputField/InputField";
import PasswordField from "../../../components/form-control/PasswordField/PasswordField";
import { LinearProgress } from "@mui/material";

RegisterForm.propTypes = {
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

function RegisterForm({ onClose, onSubmit, onChange }) {
  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required("Please enter your full name.")
      .test(
        "Should has at least two words",
        "Please enter at least two words.",
        (value) => {
          return value.trim().split(" ").length >= 2;
        }
      ),
    email: yup
      .string()
      .required("Please enter your email.")
      .email("Please enter a valid email."),
    password: yup
      .string()
      .required("Please enter your password.")
      .min(6, "Please enter at least 6 characters."),
    retypePassword: yup
      .string()
      .required("Please retype your password.")
      .oneOf([yup.ref("password")], "Password does not match"),
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

  const handleChangForm = () => {
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
          Register
        </h1>
        <form className="mt-6" onSubmit={handleSubmit(formSubmit)}>
          <InputField
            id="fullName"
            label="Full name"
            placeholder="Enter your full name..."
            register={{ ...register("fullName") }}
            errorMessage={errors.fullName?.message}
          />
          <InputField
            id="email"
            label="Email"
            placeholder="Enter your email..."
            register={{ ...register("email") }}
            errorMessage={errors.email?.message}
          />
          <PasswordField
            id="password"
            label="Password"
            placeholder="Enter your password..."
            register={{ ...register("password") }}
            errorMessage={errors.password?.message}
          />
          <PasswordField
            id="retypePassword"
            label="Retype password"
            placeholder="Retype password again..."
            register={{ ...register("retypePassword") }}
            errorMessage={errors.retypePassword?.message}
          />

          <div className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-500 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700">
              Register
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          You already have an account?{" "}
          <span
            onClick={handleChangForm}
            className="font-medium text-red-500 hover:underline cursor-pointer"
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;
