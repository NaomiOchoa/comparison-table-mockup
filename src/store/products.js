import { db } from "../firebase";
import * as d3 from "d3";

//default state
const defaultProducts = {
  activeProducts: [],
  allProducts: [],
  priceLow: 0,
  priceHigh: 0,
};

//action types

const SET_PRODUCTS = "SET_PRODUCTS";
const HIDE_PRODUCT = "HIDE_PRODUCT";
const SHOW_PRODUCT = "SHOW_PRODUCT";
const HERO_PRODUCT = "HERO_PRODUCT";
const UNSET_HERO = "UNSET_HERO";

//action creators

const setProducts = (products, low, high) => ({
  type: SET_PRODUCTS,
  products,
  low,
  high,
});

export const hideProduct = (modelName) => ({
  type: HIDE_PRODUCT,
  modelName,
});

export const showProduct = (modelName) => ({
  type: SHOW_PRODUCT,
  modelName,
});

export const heroProduct = (modelName) => ({
  type: HERO_PRODUCT,
  modelName,
});

export const unsetHero = () => ({
  type: UNSET_HERO,
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
          products.push({ ...doc.data() });
        });
      });

    var convertColors = d3
      .scaleLinear()
      .domain([0, products.length - 1])
      .range([0, 1]);

    const productsWithColor = products.map((prod, i) => {
      // let active = prod.WirecutterPick;
      return {
        ...prod,
        color: d3.interpolateTurbo(convertColors(i)),
        fullColor: d3.interpolateTurbo(convertColors(i)),
        greyscale: d3.interpolateGreys(convertColors(i)),
        active: true,
      };
    });

    let low = productsWithColor[0]["Sale Price"];
    let high = productsWithColor[0]["Price"];

    productsWithColor.forEach((prod) => {
      if (prod["Sale Price"] < low) {
        low = prod["Sale Price"];
      }
      if (prod["Price"] > high) {
        high = prod["Price"];
      }
    });

    dispatch(setProducts(productsWithColor, low, high));
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
        priceLow: action.low,
        priceHigh: action.high,
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
    case HERO_PRODUCT:
      const newActiveHero = state.activeProducts.map((prod) => {
        if (prod.Model !== action.modelName) {
          return { ...prod, color: prod.greyscale };
        } else {
          return prod;
        }
      });
      return {
        ...state,
        activeProducts: newActiveHero,
      };
    case UNSET_HERO:
      const newUnsetHero = state.activeProducts.map((prod) => {
        return { ...prod, color: prod.fullColor };
      });
      return {
        ...state,
        activeProducts: newUnsetHero,
      };
    default:
      return state;
  }
}
