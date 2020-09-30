import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/header";
import { connect } from "react-redux";
import { getProductData } from "./store/products";
import { getCriteriaData } from "./store/criteria";
import Legend from "./components/legend";

function App({ getProductData, getCriteriaData, activeProducts, allProducts }) {
  useEffect(() => {
    getProductData();
    getCriteriaData();
  }, []);

  console.log(activeProducts);

  return (
    <div className="App">
      <Header />
      <Legend activeProducts={activeProducts} allProducts={allProducts} />
    </div>
  );
}

const mapState = (state) => {
  return {
    activeProducts: state.products.activeProducts,
    allProducts: state.products.allProducts,
    activeCriteria: state.criteria.activeCriteria,
    allCriteria: state.criteria.allCriteria,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getProductData: () => dispatch(getProductData()),
    getCriteriaData: () => dispatch(getCriteriaData()),
  };
};

export default connect(mapState, mapDispatch)(App);
