import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  id: string;
  title: string;
  quantity: number;
  price: number;
};

type CartItems = { cartItems: CartItem[] };

const initialState: CartItems = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      console.log(itemIndex);

      if (itemIndex !== -1) {
        state.cartItems[itemIndex].quantity++;
      } else {
        state.cartItems.push(action.payload);
      }
    },
    incrementQuantity(state, action: PayloadAction<CartItem>) {},
    decrementQuantity(state, action: PayloadAction<CartItem>) {},
  },
});

export const { addToCart, incrementQuantity, decrementQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
