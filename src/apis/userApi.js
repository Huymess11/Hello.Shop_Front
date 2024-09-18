import axiosClient from "./axiosClient";
import StorageKeys from "../constants/storage-key";

const userApi = {
  login(data) {
    const url = "/api/v1/auth/login";
    return axiosClient.post(url, data);
  },

  register(data) {
    const url = "/api/v1/auth/register";
    return axiosClient.post(url, data);
  },

  getInfo() {
    const url = "/user/information/get";
    // return axiosClient.get(url);
    return {
      fullName: "Nguyen Xuan Phong",
      email: "ngxphong03@gmail.com",
      telephoneNumber: "",
      address: "",
      city: "",
    };
  },

  updateInfo(newInfor) {
    const url = "/api/v1/user/change-profile";
    return axiosClient.patch(url, newInfor,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem(StorageKeys.TOKEN)}`,
      },
    });
  },

  updatePassword(newPassword) {
    const url = "/api/v1/user/change-password";
    return axiosClient.patch(url, newPassword,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem(StorageKeys.TOKEN)}`,
      },
    });
  },
};

export default userApi;
