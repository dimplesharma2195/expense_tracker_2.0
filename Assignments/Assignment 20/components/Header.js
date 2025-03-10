import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../features/cartSlice";

const Header = () => {
  const dispatch = useDispatch();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const toggleCartHandler = () => {
    dispatch(cartActions.toggleCart());
  };

  const headerStyle = {
    backgroundColor: "#333",
    color: "#fff",
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const cartButtonStyle = {
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    cursor: "pointer",
    fontSize: "1rem",
    borderRadius: "4px",
  };

  return (
    <header style={headerStyle}>
      <h1>My Shop</h1>
      <button style={cartButtonStyle} onClick={toggleCartHandler}>
        Cart ({totalQuantity})
      </button>
    </header>
  );
};

export default Header;