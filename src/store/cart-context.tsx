import {
  createContext,
  PropsWithChildren,
  useContext,
  useReducer,
} from "react";

export type CartItem = {
  id: string;
  title: string;
  quantity: number;
  price: number;
};
type CartContextValue = {
  cartItems: CartItem[];
  addToCart: (cartItem: CartItem) => void;
  handleIncrementQuantity: (cartItem: CartItem) => void;
  handleDecrementQuantity: (cartItem: CartItem) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const LOCAL_STORAGE_KEY = "cartItems";

const getCartItemsFromLS = () => {
  const cartItems = localStorage.getItem(LOCAL_STORAGE_KEY) || "[]";
  return JSON.parse(cartItems);
};
const setCartItemsToLS = (cartItems: CartItem[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems));
};

const initialValue = {
  cartItems: getCartItemsFromLS(),
};

type CartItemAction = {
  type: "ADD_TO_CART" | "INCREMENT_QUANTITY" | "DECREMENT_QUANTITY";
  payload: CartItem;
};

const cartReducer = (
  { cartItems }: { cartItems: CartItem[] },
  { type, payload }: CartItemAction
) => {
  switch (type) {
    case "ADD_TO_CART":
      const addedItems = cartItems.some((item) => item.id === payload.id)
        ? cartItems.map((item) =>
            item.id === payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...cartItems, payload];

      setCartItemsToLS(addedItems);
      return { cartItems: addedItems };

    case "INCREMENT_QUANTITY":
      const updatedItems = cartItems.map((item) =>
        item.id === payload.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );
      setCartItemsToLS(updatedItems);
      return { cartItems: updatedItems };
    case "DECREMENT_QUANTITY":
      const decrementedItems = cartItems
        .map((item) =>
          item.id === payload.id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity !== 0);
      setCartItemsToLS(decrementedItems);
      return { cartItems: decrementedItems };

    default:
      return { cartItems };
  }
};

const CartContextProvider = ({ children }: PropsWithChildren) => {
  const [{ cartItems }, dispatch] = useReducer(cartReducer, initialValue);

  const ctxValue: CartContextValue = {
    cartItems,
    addToCart(cartItem: CartItem) {
      dispatch({ type: "ADD_TO_CART", payload: cartItem });
    },
    handleIncrementQuantity(cartItem: CartItem) {
      dispatch({ type: "INCREMENT_QUANTITY", payload: cartItem });
    },
    handleDecrementQuantity(cartItem: CartItem) {
      dispatch({ type: "DECREMENT_QUANTITY", payload: cartItem });
    },
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
};
export default CartContextProvider;

export const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCartContext Must Be called inside the CartContextProvider"
    );
  }

  return context;
};
