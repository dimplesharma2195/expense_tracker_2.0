import React from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);

  const cartStyle = {
    maxWidth: "600px",
    margin: "2rem auto",
    border: "1px solid #ccc",
    padding: "1rem",
    borderRadius: "4px",
    backgroundColor: "#f9f9f9",
  };

  return (
    <div style={cartStyle}>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 && <p>Your cart is empty.</p>}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={{
            id: item.id,
            title: item.title,
            quantity: item.quantity,
            totalPrice: item.totalPrice,
            price: item.price,
          }}
        />
      ))}
    </div>
  );
};

export default Cart;
