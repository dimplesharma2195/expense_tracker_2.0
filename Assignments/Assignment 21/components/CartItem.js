import React from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../features/cartSlice";

const CartItem = (props) => {
  const { title, quantity, totalPrice, price, id } = props.item;
  const dispatch = useDispatch();

  const removeItemHandler = () => {
    dispatch(cartActions.removeItemFromCart(id));
  };

  const addItemHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        id,
        title,
        price,
      })
    );
  };

  const cartItemStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
  };

  const detailsStyle = {
    textAlign: "left",
  };

  const actionsStyle = {
    display: "flex",
    gap: "0.5rem",
  };

  const buttonStyle = {
    backgroundColor: "#1976d2",
    color: "#fff",
    border: "none",
    padding: "0.3rem 0.6rem",
    cursor: "pointer",
    borderRadius: "4px",
  };

  return (
    <div style={cartItemStyle}>
      <div style={detailsStyle}>
        <h3>{title}</h3>
        <div>
          Rs. {totalPrice.toFixed(2)} (Rs. {price.toFixed(2)}/item)
        </div>
        <div>Qty: {quantity}</div>
      </div>
      <div style={actionsStyle}>
        <button style={buttonStyle} onClick={removeItemHandler}>
          −
        </button>
        <button style={buttonStyle} onClick={addItemHandler}>
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;