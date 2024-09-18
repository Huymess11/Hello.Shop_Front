import React from "react";
import PropTypes from "prop-types";
import PasswordField from "../../../../components/form-control/PasswordField/PasswordField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Divider, Paper } from "@mui/material";

ChangePasswordForm.propTypes = {
  onSubmit: PropTypes.func,
};

function ChangePasswordForm({ onSubmit }) {
  const schema = yup.object().shape({
    oldPassword: yup.string().required("Nhập mật khẩu cũ của bạn"),
    newPassword: yup
      .string()
      .required("Nhập mật khẩu mới của bạn.")
      .min(6, "Mật khẩu phải chứa ít nhất 6 kí tự."),
    retypeNewPassword: yup
      .string()
      .required("Nhập lại mật khẩu của bạn.")
      .oneOf([yup.ref("newPassword")], "Mật khẩu không khớp"),
  });
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const formSubmit = async (data) => {
    if (onSubmit) {
      await onSubmit(data);
      reset();
    }
  };
  return (
    <Paper className="flex-1 mr-4 relative">
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="flex justify-between"
      >
        <div className="mt-4 px-4 flex-2">
          <h2 className="font-bold uppercase text-2xl mb-4 text-center">
            THAY ĐỔI MẬT KHẨU
          </h2>
          <Divider className="w-full" />
          <div className="mt-4">
            <PasswordField
              id="oldPassword"
              label="Mật khẩu cũ"
              placeholder="Nhập mật khẩu cũ..."
              register={{
                ...register("oldPassword"),
              }}
              errorMessage={errors.oldPassword?.message}
              required
            />
          </div>
          <PasswordField
            id="newPassword"
            label="Mật khẩu mới"
            placeholder="Nhập mật khẩu mới..."
            register={{
              ...register("newPassword"),
            }}
            errorMessage={errors.newPassword?.message}
            required
          />
          <PasswordField
            id="retypeNewPassword"
            label="Xác nhận mật khẩu"
            placeholder="Nhập lại mật khẩu..."
            register={{
              ...register("retypeNewPassword"),
            }}
            errorMessage={errors.retypeNewPassword?.message}
            required
          />
        </div>
        <button className="absolute font-bold  hover:bg-red-700 bottom-2 right-2 w-24 mt-12 py-2 px-4 self-end bg-red-500 rounded-md text-white text-lg cursor-pointer">
          SAVE
        </button>
      </form>
    </Paper>
  );
}

export default ChangePasswordForm;
