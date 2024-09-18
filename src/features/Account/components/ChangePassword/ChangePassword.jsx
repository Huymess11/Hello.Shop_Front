import React from "react";
import PropTypes from "prop-types";
import ChangePasswordForm from "./ChangePasswordForm";
import { toast } from "react-toastify";
import userApi from "../../../../apis/userApi";
ChangePassword.propTypes = {};

function ChangePassword(props) {
  const handleSubmit = async (data) => {
    try {
      const fetchApiChangePassword =await userApi.updatePassword(data)
      toast.success("Update password successfully !!!");
      console.log(data);
    } catch (error) {
      toast.error("Update password fail !!!");
    }
  };
  return <ChangePasswordForm onSubmit={handleSubmit} />;
}

export default ChangePassword;
