import React from "react";
import "./legend.css";
import { connect } from "react-redux";
import {
  hideProduct,
  showProduct,
  heroProduct,
  unsetHero,
} from "../store/products";
import { Button } from "semantic-ui-react";
import { useChartSize } from "../utils/ChartSizeProvider";

function Legend({
  allProducts,
  hideProduct,
  showProduct,
  heroProduct,
  unsetHero,
}) {
  const { height } = useChartSize();

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
    <div className="product-legend" style={{ height: height }}>
      <ul className="legend-list">
        {allProducts.map((product) => {
          return (
            <li
              key={product.Model}
              onMouseEnter={() => enterEffect(product)}
              onMouseLeave={leaveEffect}
              className="legend"
            >
              {product.Model}
              {product.active ? (
                <Button
                  circular
                  className="legend-icon-button"
                  icon="eye slash outline"
                  style={{
                    backgroundColor: product.color,
                  }}
                  onClick={() => hideProduct(product.Model)}
                />
              ) : (
                <Button
                  className="legend-icon-button"
                  icon="eye"
                  circular
                  onClick={() => showProduct(product.Model)}
                />
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
