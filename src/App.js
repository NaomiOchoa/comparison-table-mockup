import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/header";
import { connect } from "react-redux";
import { getProductData } from "./store/products";
import { getCriteriaData } from "./store/criteria";
import Legend from "./components/legend";
import Chart from "./components/chart";
import Criteria from "./components/criteria";
import { ChartSizeProvider } from "./utils/ChartSizeProvider";
import Footer from "./components/footer";

function App({
  getProductData,
  getCriteriaData,
  activeProducts,
  allProducts,
  activeCriteria,
  allCriteria,
  priceHigh,
  priceLow,
}) {
  useEffect(() => {
    getProductData();
    getCriteriaData();
  }, []);

  return (
    <div className="App">
      <Header />
      <Legend allProducts={allProducts} />
      <ChartSizeProvider>
        <Chart
          activeCriteria={activeCriteria}
          activeProducts={activeProducts}
          priceHigh={priceHigh}
          priceLow={priceLow}
        />
      </ChartSizeProvider>
      <Criteria allCriteria={allCriteria} />
      <Footer />
    </div>
  );
}

const mapState = (state) => {
  return {
    activeProducts: state.products.activeProducts,
    allProducts: state.products.allProducts,
    activeCriteria: state.criteria.activeCriteria,
    allCriteria: state.criteria.allCriteria,
    priceHigh: state.products.priceHigh,
    priceLow: state.products.priceLow,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getProductData: () => dispatch(getProductData()),
    getCriteriaData: () => dispatch(getCriteriaData()),
  };
};

export default connect(mapState, mapDispatch)(App);
