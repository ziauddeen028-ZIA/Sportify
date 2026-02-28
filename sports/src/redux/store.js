import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import Wishlist from "../Wishlist";
import wishlistReducer from "./wishlistSlice"

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist:wishlistReducer,
  },
});
