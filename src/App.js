import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/header";
import { connect } from "react-redux";
import { getProductData } from "./store/products";
import { getCriteriaData } from "./store/criteria";
import Legend from "./components/legend";
import Chart from "./components/chart";

function App({
  getProductData,
  getCriteriaData,
  activeProducts,
  allProducts,
  activeCriteria,
  allCriteria,
}) {
  useEffect(() => {
    getProductData();
    getCriteriaData();
  }, []);

  return (
    <div className="App">
      <Header />
      <Legend allProducts={allProducts} />
      <Chart activeCriteria={activeCriteria} activeProducts={activeProducts} />
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
