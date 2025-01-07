import { useState } from "react";

import { useCartContext } from "../store/cart-context.tsx";
import Cart from "./Cart.tsx";

export default function Header() {
  const [cartIsVisible, setCartIsVisible] = useState(false);
  const { cartItems } = useCartContext();

  function handleOpenCartClick() {
    setCartIsVisible(true);
  }

  function handleCloseCartClick() {
    setCartIsVisible(false);
  }

  return (
    <>
      {cartIsVisible && <Cart onClose={handleCloseCartClick} />}
      <header id="main-header">
        <div id="main-title">
          <img src="logo.png" alt="Elegant model" />
          <h1>Elegant Redux</h1>
        </div>
        <p>
          <button onClick={handleOpenCartClick}>
            Cart ({cartItems.length})
          </button>
        </p>
      </header>
    </>
  );
}
