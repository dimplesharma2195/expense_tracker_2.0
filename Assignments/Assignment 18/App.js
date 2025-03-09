import React from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./store";
import { toggleCart } from "./features/cartSlice";

const Cart = () => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        marginTop: "10px",
        borderRadius: "4px",
      }}
    >
      <h3>My Shopping Cart</h3>
      <p>Your cart items will appear here.</p>
    </div>
  );
};

const ShoppingPage = () => {
  const dispatch = useDispatch();
  const isVisible = useSelector((state) => state.cart.isVisible);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Shopping Page</h1>
      <button
        onClick={() => dispatch(toggleCart())}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        My Cart
      </button>
      {isVisible && <Cart />}
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <ShoppingPage />
    </Provider>
  );
};

export default App;