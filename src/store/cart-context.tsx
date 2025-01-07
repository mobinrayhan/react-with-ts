import { createContext, PropsWithChildren, useContext, useState } from "react";

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

const CartContextProvider = ({ children }: PropsWithChildren) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const cartItems = getCartItemsFromLS();
    return cartItems;
  });

  const ctxValue: CartContextValue = {
    cartItems,
    addToCart(cartItem: CartItem) {
      setCartItems((prevItems) => {
        const cartItems = prevItems.some((item) => item.id === cartItem.id)
          ? prevItems.map((item) =>
              item.id === cartItem.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...prevItems, cartItem];

        setCartItemsToLS(cartItems);
        return cartItems;
      });
    },
    handleIncrementQuantity(cartItem) {
      setCartItems((prevItems) => {
        const cartItems = prevItems.map((item) =>
          item.id === cartItem.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );

        setCartItemsToLS(cartItems);
        return cartItems;
      });
    },
    handleDecrementQuantity(cartItem) {
      setCartItems((prevItems) => {
        const cartItems = prevItems
          .map((item) =>
            item.id === cartItem.id
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                }
              : item
          )
          .filter((item) => item.quantity !== 0);

        setCartItemsToLS(cartItems);
        return cartItems;
      });
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
