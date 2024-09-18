import React from "react";
import PropTypes from "prop-types";
import InputField from "../../../../components/form-control/InputField/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Divider, Paper } from "@mui/material";

ChangeInformationForm.propTypes = {
  onSubmit: PropTypes.func,
  userInfor: PropTypes.object,
};

function ChangeInformationForm({ onSubmit, userInfor }) {
  const schema = yup.object().shape({
    fullName: yup.string().required("Nhập tên của người dùng"),
    telephoneNumber: yup.string(),
    address: yup.string(),
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
            THAY ĐỔI THÔNG TIN NGƯỜI DÙNG
          </h2>
          <Divider className="w-full" />
          <div className="mt-4">
            <InputField
              id="fullName"
              label="Tên đầy đủ"
              placeholder="Nhập tên của người dùng..."
              register={{
                ...register("fullName", {
                  value: userInfor.fullName || ''
                }),
              }}
              errorMessage={errors.fullName?.message}
              type='text'
              required
            />
          </div>
          <InputField
            id="telephoneNumber"
            label="Số điện thoại"
            placeholder="Nhập số điện thoại của người dùng..."
            register={{
              ...register("telephoneNumber", {
                value: userInfor.telephoneNumber || ''
              }),
            }}
            errorMessage={errors.telephoneNumber?.message}
            type='text'
            required
          />
          <InputField
            id="address"
            label="Địa chỉ"
            placeholder="Nhập địa chỉ của người dùng..."
            register={{
              ...register("address",  {
                  value: userInfor.address || ''
                }),
            }}
            errorMessage={errors.address?.message}
            type='text'
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

export default ChangeInformationForm;
