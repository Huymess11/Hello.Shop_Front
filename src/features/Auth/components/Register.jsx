import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { register } from "../userSlice";
import RegisterForm from "./RegisterForm";

function Register({ onCloseForm, onChangeForm }) {
  const dispatch = useDispatch();

  const handleLoginFormSubmit = async (values) => {
    try {
      // auto set username = email
      values.username = values.email;

      const action = register(values);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
      console.log("New user: ", user);

      // Close form
      if (onCloseForm) {
        onCloseForm();
      }
    } catch (error) {
      toast.error("Error!!!");
    }
  };
  return (
    <RegisterForm
      onClose={onCloseForm}
      onChange={onChangeForm}
      onSubmit={handleLoginFormSubmit}
    />
  );
}

export default Register;
