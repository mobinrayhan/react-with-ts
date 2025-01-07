import { useCartContext } from "../store/cart-context";

export default function CartItems() {
  const { cartItems, handleDecrementQuantity, handleIncrementQuantity } =
    useCartContext();

  // const handleRemoveFromCart = (id: string) => {};
  // const handleAddToCart = (item: CartItem) => {};

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
                    <button onClick={() => handleDecrementQuantity(item)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncrementQuantity(item)}>
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
