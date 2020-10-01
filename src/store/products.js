import { db } from "../firebase";
import * as d3 from "d3";

//default state
const defaultProducts = {
  activeProducts: [],
  allProducts: [],
};

//action types

const SET_PRODUCTS = "SET_PRODUCTS";
const HIDE_PRODUCT = "HIDE_PRODUCT";
const SHOW_PRODUCT = "SHOW_PRODUCT";

//action creators

const setProducts = (products) => ({
  type: SET_PRODUCTS,
  products,
});

export const hideProduct = (modelName) => ({
  type: HIDE_PRODUCT,
  modelName,
});

export const showProduct = (modelName) => ({
  type: SHOW_PRODUCT,
  modelName,
});

export const getProductData = () => async (dispatch) => {
  try {
    let products = [];
    await db
      .collection("snow-boots")
      .doc("info")
      .collection("product-performance")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          products.push({ ...doc.data(), active: true });
        });
      });

    var convertColors = d3
      .scaleLinear()
      .domain([0, products.length - 1])
      .range([0, 1]);

    const productsWithColor = products.map((prod, i) => {
      return { ...prod, color: d3.interpolateTurbo(convertColors(i)) };
    });

    dispatch(setProducts(productsWithColor));
  } catch (error) {
    console.error(error);
  }
};

//reducer

export default function (state = defaultProducts, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        activeProducts: action.products,
        allProducts: action.products,
      };
    case HIDE_PRODUCT:
      const newActive = state.activeProducts.filter(
        (prod) => prod.Model !== action.modelName
      );
      const newAll = state.allProducts.map((prod) => {
        if (prod.Model === action.modelName) {
          return { ...prod, active: false };
        } else {
          return prod;
        }
      });
      return {
        ...state,
        activeProducts: newActive,
        allProducts: newAll,
      };
    case SHOW_PRODUCT:
      const newAllShow = state.allProducts.map((prod) => {
        if (prod.Model === action.modelName) {
          return { ...prod, active: true };
        } else {
          return prod;
        }
      });
      const newActiveShow = newAllShow.filter((prod) => prod.active === true);
      return {
        ...state,
        activeProducts: newActiveShow,
        allProducts: newAllShow,
      };
    default:
      return state;
  }
}
