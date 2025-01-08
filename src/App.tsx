import { Provider } from "react-redux";
import Header from "./components/Header.tsx";
import Product from "./components/Product.tsx";
import Shop from "./components/Shop.tsx";
import { DUMMY_PRODUCTS } from "./dummy-products.ts";
import CartContextProvider from "./store/cart-context.tsx";
import { store } from "./store/store.ts";

function App() {
  return (
    <Provider store={store}>
      <CartContextProvider>
        <Header />
        <Shop>
          {DUMMY_PRODUCTS.map((product) => (
            <li key={product.id}>
              <Product {...product} />
            </li>
          ))}
        </Shop>
      </CartContextProvider>
    </Provider>
  );
}

export default App;
