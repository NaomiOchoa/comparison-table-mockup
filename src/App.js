import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/header";
import { connect } from "react-redux";
import { getProductData } from "./store/products";

function App({ getProductData }) {
  useEffect(() => {
    getProductData();
  }, []);

  return (
    <div className="App">
      <Header />
    </div>
  );
}

// const mapState = state => {

// }

const mapDispatch = (dispatch) => {
  return {
    getProductData: () => dispatch(getProductData()),
  };
};

export default connect(null, mapDispatch)(App);
