import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import PropTypes from "prop-types";
import React from "react";
import InputField from "../../../../components/form-control/InputField/InputField";
import SelectField from "../../../../components/form-control/SelectField/SelectField";
import TextAreaField from "../../../../components/form-control/TextAreaField/TextAreaField";
import { LinearProgress } from "@mui/material";

FormCreateProduct.propTypes = {
  onSubmit: PropTypes.func,
};


const BRAND_LIST = [
  "Phone",
  "Monitor",
  "Laptop",
  "Mouse",
  "Keyboard",
];

function FormCreateProduct({ onSubmit }) {
  const schema = yup.object().shape({
    name: yup.string().required("Please enter product name."),
    price: yup
      .number()
      .required("Please enter product price.")
      .moreThan(0, "Price must be greater than 0"),
    pictureURL: yup.string().required("Please enter URL image."),
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
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
    <div className="min-[400px] relative bg-white mx-auto mt-2 w-3/4 px-8 pt-2 pb-14 rounded-md">
      {isSubmitting && (
        <LinearProgress
          sx={{ position: "absolute", top: 0, left: 0, right: 0 }}
        />
      )}
      <h2 className="uppercase font-bold text-xl text-red-500 text-center">
        Tạo mới sản phẩm
      </h2>
      <form
        className="mt-6 flex flex-wrap gap-12 mb-4"
        onSubmit={handleSubmit(formSubmit)}
        encType="multipart/form-data"
      >
        <div className="flex-1 flex flex-col justify-between">
          <div className="flex flex-wrap justify-between">
            <div className="flex-2 mr-12">
              <InputField
                id="product_name"
                type="text"
                label="Tên sản phẩm"
                placeholder="Nhập tên của sản phẩm..."
                required={true}
                register={{ ...register("name") }}
                errorMessage={errors.name?.message}
              />
            </div>
            <div className="flex-1">
              <InputField
                id="price"
                label="Giá"
                type="number"
                placeholder="Giá của sản phẩm ..."
                required={true}
                register={{ ...register("price", { value: 0 }) }}
                errorMessage={errors.price?.message}
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between">
            <SelectField
              name="brand"
              label="Loại"
              register={{ ...register("brand") }}
              options={BRAND_LIST}
            />
          </div>

          <InputField
            id="pictureURL"
            label="URL của ảnh"
            name="pictureURL"
            type="text"
            placeholder="Nhập url của ảnh ..."
            required={true}
            register={{ ...register("pictureURL") }}
            errorMessage={errors.pictureURL?.message}
          />

          <TextAreaField
            name="description"
            label="Mô tả"
            placeholder="Viết mô tả suy nghĩ về sản phẩm ở đây..."
            row={6}
            register={{ ...register("description") }}
          />
        </div>

        <div className="mt-6 absolute bottom-4 right-4 w-36">
          <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-500 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700">
            Tạo sản phẩm
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormCreateProduct;
