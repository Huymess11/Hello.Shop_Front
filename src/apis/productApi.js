import StorageKeys from "../constants/storage-key";
import axiosClient from "./axiosClient";

const productApi = {
  getAll(params) {
    try {
      const url = `/api/v1/global/list-ob`;
      return axiosClient.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(StorageKeys.TOKEN)}`,
        },
        params: params,
      });
    } catch (error) {
      // Xử lý các lỗi
      throw error;
    }
  },

  checkoutProduct(data) {
    try {
      const url = `/api/v1/global/generate`;
      return axiosClient.post(url,data , {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(StorageKeys.TOKEN)}`,
        },
      });
    } catch (error) {
      // Xử lý các lỗi
      throw error;
    }
  },

  addProduct(data) {
    try {
      const url = "/api/v1/admin/add-ob";
      return axiosClient.post(url, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(StorageKeys.TOKEN)}`,
        },
      });
    } catch (error) {
      // Xử lý các lỗi
      throw error;
    }
  },

  
  get(id) {
    try {
      const url = `/api/v1/global/detail-ob?id=${id}`;
      return axiosClient.get(url);
    } catch (error) {
      
    }
  },

  getRelatedProduct(id) {
    try {
      const url = `/api/v1/global/related-ob?id=${id}`;
      return axiosClient.get(url)
    } catch (error) {
      throw error;
    }
  },

  removeProduct(id) {
    try {
      const url = `/api/v1/admin/delete-ob/${id}`;
      return axiosClient.delete(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(StorageKeys.TOKEN)}`,
        },
      });
    } catch (error) {
      // Xử lý các lỗi
      throw error;
    }
  },

  updateProduct(data) {
    try {
      const url = `/api/v1/admin/update-ob/${data.id}`;
      return axiosClient.put(url, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(StorageKeys.TOKEN)}`,
        },
      });
    } catch (error) {
      // Xử lý các lỗi
      throw error;
    }
  },

  
};

export default productApi;
