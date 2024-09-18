import React from "react";
import PropTypes from "prop-types";
import PersonIcon from "@mui/icons-material/Person";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import { LocationCity } from "@mui/icons-material";
import StorageKeys from "../../../constants/storage-key";
import { Divider, Paper } from "@mui/material";

AccountInfor.propTypes = {
  userInfor: PropTypes.object.isRequired,
};

function AccountInfor({ userInfor }) {
  console.log(userInfor);
  return (
    <Paper className="flex flex-col items-center py-4 px-8 ">
      <h2 className="font-bold uppercase text-2xl mb-4 text-center">
        THÔNG TIN NGƯỜI DÙNG
      </h2>
      <Divider className="w-full" />
      <img
        className="mt-4 h-60 w-60 border-2 border-solid border-black rounded-full"
        src={
          localStorage.getItem(StorageKeys.AVATAR)
            ? localStorage.getItem(StorageKeys.AVATAR)
            : "https://bloganchoi.com/wp-content/uploads/2022/02/avatar-trang-y-nghia.jpeg"
        }
        alt=""
      />
      <ul className="mt-4 list-none">
        <li className="flex items-center mb-2">
          <PersonIcon />
          <span className="ml-2">Tên đầy đủ: {userInfor.fullName}</span>
        </li>
        <li className="flex items-center mb-2">
          <EmailIcon />
          <span className="ml-2">Email: {userInfor.email}</span>
        </li>
        <li className="flex items-center mb-2">
          <LocalPhoneIcon />
          <span className="ml-2">Số điện thoại: {userInfor.telephoneNumber}</span>
        </li>
        <li className="flex items-center mb-2">
          <LocationOnIcon />
          <span className="ml-2">Địa chỉ: {userInfor.address}</span>
        </li>
      </ul>
    </Paper>
  );
}

export default AccountInfor;
