import { decrementQuantity, incrementQuantity } from "../store/cartSlice";
import { useCartDispatch, useCartSelector } from "../store/hook";

export default function CartItems() {
  const cartItems = useCartSelector((state) => state.cart.cartItems);
  const dispatch = useCartDispatch();

  const formattedTotalPrice = cartItems
    .reduce((prevPrice, cart) => prevPrice + +cart.price * cart.quantity, 0)
    .toFixed(2);

  return (
    <div id="cart">
      {!cartItems.length ? (
        <p>No items in cart!</p>
      ) : (
        <>
          <ul id="cart-items">
            {cartItems.map((item) => {
              const formattedPrice = `$${item.price.toFixed(2)}`;

              return (
                <li key={item.id}>
                  <div>
                    <span>{item.title}</span>
                    <span> ({formattedPrice})</span>
                  </div>
                  <div className="cart-item-actions">
                    <button onClick={() => dispatch(decrementQuantity(item))}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => dispatch(incrementQuantity(item))}>
                      +
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          <p id="cart-total-price">
            Cart Total: <strong>{formattedTotalPrice}</strong>
          </p>
        </>
      )}
    </div>
  );
}
