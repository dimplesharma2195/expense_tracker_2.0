import React from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../features/cartSlice";

const ProductItem = (props) => {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        id: props.id,
        title: props.title,
        price: props.price,
      })
    );
  };

  const productStyle = {
    border: "1px solid #ccc",
    padding: "1rem",
    margin: "1rem 0",
    borderRadius: "4px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const infoStyle = {
    marginRight: "auto",
  };

  const addButtonStyle = {
    backgroundColor: "#1976d2",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    cursor: "pointer",
    borderRadius: "4px",
  };

  return (
    <div style={productStyle}>
      <div style={infoStyle}>
        <h3>{props.title}</h3>
        <p>{props.description}</p>
        <p>Rs. {props.price.toFixed(2)}</p>
      </div>
      <button style={addButtonStyle} onClick={addToCartHandler}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductItem;