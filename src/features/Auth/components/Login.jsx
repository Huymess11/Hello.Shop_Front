import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../userSlice";
import LoginForm from "./LoginForm";
import axios from "axios";

function Login({ onCloseForm, onChangeForm }) {
  const dispatch = useDispatch();

  const handleLoginFormSubmit = async (values) => {
    try {
      const action = login(values);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
      console.log("Infor user:", user);

      if (onCloseForm) {
        onCloseForm();
      }
    } catch (error) {
      toast.error("Error!!!");
    }
  };
  return (
    <LoginForm
      onClose={onCloseForm}
      onChange={onChangeForm}
      onSubmit={handleLoginFormSubmit}
    />
  );
}

export default Login;
