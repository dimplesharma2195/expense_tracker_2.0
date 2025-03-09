// src/App.js
import React from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./store";
import { toggleCart, addToCart, increaseQuantity, decreaseQuantity } from "./features/cartSlice";

const products = [
  { id: 1, name: "Product A", price: 10 },
  { id: 2, name: "Product B", price: 20 },
  { id: 3, name: "Product C", price: 30 },
];

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        marginTop: "10px",
        borderRadius: "4px",
      }}
    >
      <h3>My Cart</h3>
      {items.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        items.map((item) => (
          <div
            key={item.id}
            style={{
              marginBottom: "10px",
              paddingBottom: "5px",
              borderBottom: "1px solid #eee",
            }}
          >
            <span>
              {item.name} - Rs {item.price} x {item.quantity}
            </span>
            <button
              onClick={() => dispatch(increaseQuantity(item.id))}
              style={{ marginLeft: "10px", padding: "2px 6px", cursor: "pointer" }}
            >
              +
            </button>
            <button
              onClick={() => dispatch(decreaseQuantity(item.id))}
              style={{ marginLeft: "5px", padding: "2px 6px", cursor: "pointer" }}
            >
              -
            </button>
          </div>
        ))
      )}
    </div>
  );
};

const ShoppingPage = () => {
  const dispatch = useDispatch();
  const isVisible = useSelector((state) => state.cart.isVisible);
  const items = useSelector((state) => state.cart.items);

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Shopping Page</h1>
      <button
        onClick={() => dispatch(toggleCart())}
        style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
      >
        My Cart ({totalQuantity})
      </button>

      <div style={{ marginTop: "20px" }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              marginBottom: "10px",
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "4px",
            }}
          >
            <h3>{product.name}</h3>
            <p>Price: Rs {product.price}</p>
            <button
              onClick={() => dispatch(addToCart(product))}
              style={{ padding: "5px 10px", cursor: "pointer" }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {isVisible && <Cart />}
    </div>
  );
};

const App = () => (
  <Provider store={store}>
    <ShoppingPage />
  </Provider>
);

export default App;