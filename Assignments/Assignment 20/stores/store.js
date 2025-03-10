import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";
import uiReducer from "../features/uislice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    ui: uiReducer,
  },
});

export default store;