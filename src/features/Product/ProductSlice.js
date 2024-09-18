import { createSlice } from "@reduxjs/toolkit";
import uuid from "react-uuid";

const BRAND_LIST = [
  "Phone",
  "Monitor",
  "Laptop",
  "Mouse",
  "Keyboard",
];
const COUNTRY_LIST = ["USA", "Japan", "China", "Korea", "UK", "Switzerland"];
const COLOR_LIST = ["White", "Black", "Red", "Silver"];

const productSlice = createSlice({
  name: "products",
  initialState: {
    brand_list: BRAND_LIST,
    country_list: COUNTRY_LIST,
    color_list: COLOR_LIST,
  },
  reducers: {},
});

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions
const { actions, reducer } = productSlice;
export default reducer;
export const {} = actions;
