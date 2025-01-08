import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  id: string;
  title: string;
  quantity: number;
  price: number;
};

type CartItems = { cartItems: CartItem[] };

const LOCAL_STORAGE_KEY = "cartItems";
const getCartItemsFromLS = () => {
  const cartItems = localStorage.getItem(LOCAL_STORAGE_KEY) || "[]";
  return JSON.parse(cartItems);
};
const setCartItemsToLS = (cartItems: CartItem[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems));
};

const initialState: CartItems = {
  cartItems: getCartItemsFromLS(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex !== -1) {
        state.cartItems[itemIndex].quantity++;
      } else {
        state.cartItems.push(action.payload);
      }

      setCartItemsToLS(state.cartItems);
    },
    incrementQuantity(state, action: PayloadAction<CartItem>) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex !== -1) {
        state.cartItems[itemIndex].quantity++;
      } else {
        state.cartItems.push(action.payload);
      }

      setCartItemsToLS(state.cartItems);
    },
    decrementQuantity(state, action: PayloadAction<CartItem>) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex !== -1) {
        state.cartItems[itemIndex].quantity === 1
          ? state.cartItems.splice(itemIndex, 1)
          : state.cartItems[itemIndex].quantity--;
      } else {
        state.cartItems.push(action.payload);
      }

      setCartItemsToLS(state.cartItems);
    },
  },
});

export const { addToCart, incrementQuantity, decrementQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
