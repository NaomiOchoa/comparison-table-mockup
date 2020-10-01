import React from "react";
import "./legend.css";
import { connect } from "react-redux";
import {
  hideProduct,
  showProduct,
  heroProduct,
  unsetHero,
} from "../store/products";

function Legend({
  allProducts,
  hideProduct,
  showProduct,
  heroProduct,
  unsetHero,
}) {
  function enterEffect(prod) {
    if (prod.active) {
      heroProduct(prod.Model);
    } else {
      return;
    }
  }

  function leaveEffect(prod) {
    unsetHero();
  }

  return (
    <div className="product-legend">
      <ul>
        {allProducts.map((product) => {
          return (
            <li
              key={product.Model}
              onMouseEnter={() => enterEffect(product)}
              onMouseLeave={leaveEffect}
            >
              {product.Model}
              {product.active ? (
                <button
                  className="uk-icon-button"
                  uk-icon="minus-circle"
                  style={{
                    backgroundColor: product.color,
                    opacity: 1,
                  }}
                  onClick={() => hideProduct(product.Model)}
                ></button>
              ) : (
                <button
                  className="uk-icon-button"
                  uk-icon="plus-circle"
                  onClick={() => showProduct(product.Model)}
                ></button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const mapDispatch = (dispatch) => {
  return {
    hideProduct: (modelName) => dispatch(hideProduct(modelName)),
    showProduct: (modelName) => dispatch(showProduct(modelName)),
    heroProduct: (modelName) => dispatch(heroProduct(modelName)),
    unsetHero: () => dispatch(unsetHero()),
  };
};

export default connect(null, mapDispatch)(Legend);
