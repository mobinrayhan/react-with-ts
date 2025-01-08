import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart() {},
    incrementQuantity() {},
    decrementQuantity() {},
  },
});

export const { addToCart, incrementQuantity, decrementQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
