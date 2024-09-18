import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/Auth/userSlice";
import ProductSlice from "../features/Product/ProductSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    products: ProductSlice,
  },
});
