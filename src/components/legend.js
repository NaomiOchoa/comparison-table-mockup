import React from "react";

export default function Legend({ allProducts }) {
  return (
    <ul>
      {allProducts.map((product) => {
        return <li>{product.Model}</li>;
      })}
    </ul>
  );
}
