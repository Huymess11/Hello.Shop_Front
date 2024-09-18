import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../../apis/userApi";
import StorageKeys from "../../constants/storage-key";
import axios from "axios";

// First, create the thunk
export const register = createAsyncThunk("user/register", async (payload) => {
  const data = await userApi.register(payload);

  // save data to local storage
  localStorage.setItem(StorageKeys.TOKEN, data.jwt);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

  return data.user;
});

export const login = createAsyncThunk("user/login", async (payload) => {
  const resApiLogin = await userApi.login(payload);

  const responseApiLandscape = await axios.get(
    "https://picsum.photos/2000/1000", 
    { responseType: 'blob' } 
  );

  const avatarLandscape = URL.createObjectURL(responseApiLandscape.data);

  // save data to local storage
  localStorage.setItem(StorageKeys.TOKEN, resApiLogin.jwt);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(resApiLogin.user));
  localStorage.setItem(StorageKeys.AVATAR, avatarLandscape);
  localStorage.setItem(StorageKeys.INFORMATION, JSON.stringify(resApiLogin.user))

  return resApiLogin.user;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
    setting: {},
    cart: JSON.parse(localStorage.getItem(StorageKeys.CART)) || {
      totalItem: 0,
      totalCost: 0,
      items: [],
    },
    payment: JSON.parse(localStorage.getItem(StorageKeys.PAYMENT)) || {
      cardName: "",
      cardNumber: "",
      expDate: "",
      cvv: "",
    },
    information: JSON.parse(localStorage.getItem(StorageKeys.INFORMATION)) || {},
    delivery: JSON.parse(localStorage.getItem(StorageKeys.INFORMATION)) || {},
  },
  reducers: {
    logout(state) {
      // clear local storage
      localStorage.clear(StorageKeys.TOKEN);
      localStorage.clear(StorageKeys.USER);
      localStorage.clear(StorageKeys.CART);
      localStorage.clear(StorageKeys.AVATAR);
      localStorage.clear(StorageKeys.INFORMATION);

      state.current = {};
      state.cart = {
        totalItem: 0,
        totalCost: 0,
        items: [],
      };
    },

    addProductToCart(state, action) {
      const { product, count } = action.payload;
      let quanityAdded = 1;
      if (count) quanityAdded = count;
      if (product) {
        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng hay chưa
        const existingItem = state.cart.items.find(
          (item) => item.name === product.name
        );

        if (existingItem) {
          // Nếu sản phẩm đã tồn tại, chỉ cần tăng số lượng và giá tiền
          existingItem.count += quanityAdded;
          existingItem.totalPrice += product.price * quanityAdded;
        } else {
          // Nếu sản phẩm chưa tồn tại, thêm vào giỏ hàng
          const newItem = {
            count: quanityAdded,
            id: product.id,
            name: product.name,
            imgURL: product.pictureURL,
            unitPrice: product.price,
            totalPrice: product.price,
          };

          state.cart.items.push(newItem);
        }
        state.cart.totalItem += quanityAdded;
        state.cart.totalCost += product.price * quanityAdded;

        // Lưu vào localStorage
        localStorage.setItem(StorageKeys.CART, JSON.stringify(state.cart));
      }
    },

    increaseQuanity(state, action) {
      const { productId } = action.payload;
      const existingItem = state.cart.items.find(
        (item) => item.id === productId
      );
      if (existingItem) {
        // Increase the quantity and update the total cost
        existingItem.count += 1;
        existingItem.totalPrice += existingItem.unitPrice;

        state.cart.totalItem += 1;
        state.cart.totalCost += existingItem.unitPrice;

        // Update localStorage
        localStorage.setItem(StorageKeys.CART, JSON.stringify(state.cart));
      }
    },

    decreaseQuanity(state, action) {
      const { productId } = action.payload;

      const existingItem = state.cart.items.find(
        (item) => item.id === productId
      );

      if (existingItem && existingItem.count > 1) {
        // Decrease the quantity and update the total cost
        existingItem.count -= 1;
        existingItem.totalPrice -= existingItem.unitPrice;

        state.cart.totalItem -= 1;
        state.cart.totalCost -= existingItem.unitPrice;

        // Update localStorage
        localStorage.setItem(StorageKeys.CART, JSON.stringify(state.cart));
      }
    },

    removeItemInCart(state, action) {
      const { productId } = action.payload;
      const existingItem = state.cart.items.find(
        (item) => item.id === productId
      );
      if (existingItem) {
        state.cart.items = state.cart.items.filter(
          (item) => item.id !== productId
        );
        state.cart.totalItem -= existingItem.count;
        state.cart.totalCost -= existingItem.count * existingItem.unitPrice;
        // Update localStorage
        localStorage.setItem(StorageKeys.CART, JSON.stringify(state.cart));
      }
    },

    changeQuanity(state, action) {
      const { productId, newQuanity } = action.payload;
      const existingItem = state.cart.items.find(
        (item) => item.id === productId
      );
      if (existingItem && newQuanity >= 1) {
        // Cập nhật số lượng và chi phí ứng với sản phẩm
        const oldQuanity = existingItem.count;
        existingItem.count = newQuanity;
        existingItem.totalPrice = existingItem.unitPrice * newQuanity;

        //Cập nhật số lượng và tổng chi phí trong giỏ hàng
        state.cart.totalItem = state.cart.totalItem - oldQuanity + newQuanity;
        state.cart.totalCost =
          state.cart.totalCost -
          oldQuanity * existingItem.unitPrice +
          newQuanity * existingItem.unitPrice;

        // Update localStorage
        localStorage.setItem(StorageKeys.CART, JSON.stringify(state.cart));
      }
    },

    checkoutCompleted(state, action) {
      state.cart = {
        totalItem: 0,
        totalCost: 0,
        items: [],
      };
      // Clear cart in localStorage
      localStorage.removeItem(StorageKeys.CART);
    },

    changeInforPayment(state, action) {
      const { newInforPayment } = action.payload;
      state.payment = newInforPayment;
      // Update localStorage
      localStorage.setItem(StorageKeys.PAYMENT, JSON.stringify(state.payment));
    },

    updateInformation(state, action) {
      const {newInformation} = action.payload
      const oldInformation = state.information
      if(newInformation) {
        state.information = {
          ...oldInformation,
          ...newInformation,
        }
        // Update localStorage
        localStorage.setItem(StorageKeys.INFORMATION, JSON.stringify(state.information));
      }
    },
    updateInformationDelivery(state, action) {
      const {newInformation} = action.payload
      const oldInformation = state.delivery
      if(newInformation) {
        state.delivery = {
          ...oldInformation,
          ...newInformation,
        }
      }
    }
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
    [register.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions
const { actions, reducer } = userSlice;
export default reducer;
export const {
  logout,
  addProductToCart,
  increaseQuanity,
  decreaseQuanity,
  removeItemInCart,
  changeQuanity,
  checkoutCompleted,
  changeInforPayment,
  updateInformation,
  updateInformationDelivery
} = actions;
