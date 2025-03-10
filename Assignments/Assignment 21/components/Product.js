import React from "react";
import ProductItem from "./ProductItem";

const DUMMY_PRODUCTS = [
  { id: "p1", title: "Fancy Chair", price: 49, description: "Ergonomic, stylish" },
  { id: "p2", title: "Gaming Laptop", price: 999, description: "Powerful machine for gaming" },
  { id: "p3", title: "Coffee Mug", price: 5, description: "Ceramic mug for hot drinks" },
];

const Products = () => {
  const containerStyle = {
    maxWidth: "600px",
    margin: "2rem auto",
    padding: "1rem",
  };

  return (
    <section style={containerStyle}>
      <h2 style={{ textAlign: "center" }}>Buy Your Favorite Products</h2>
      {DUMMY_PRODUCTS.map((product) => (
        <ProductItem
          key={product.id}
          id={product.id}
          title={product.title}
          price={product.price}
          description={product.description}
        />
      ))}
    </section>
  );
};

export default Products;