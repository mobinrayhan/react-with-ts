import { addToCart } from "../store/cartSlice";
import { useCartDispatch } from "../store/hook";

type ProductProps = {
  id: string;
  image: string;
  title: string;
  price: number;
  description: string;
};

export default function Product({
  image,
  title,
  price,
  id,
  description,
}: ProductProps) {
  const dispatch = useCartDispatch();

  function handleAddToCart() {
    dispatch(addToCart({ id, price, title, quantity: 1 }));
  }

  return (
    <article className="product">
      <img src={image} alt={title} />
      <div className="product-content">
        <div>
          <h3>{title}</h3>
          <p className="product-price">${price}</p>
          <p>{description}</p>
        </div>
        <p className="product-actions">
          <button onClick={handleAddToCart}>Add to Cart</button>
        </p>
      </div>
    </article>
  );
}
