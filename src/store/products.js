import { db } from "../firebase";

//default state
const defaultProducts = {
  activeProducts: [],
  allProducts: [],
};

//action types

const SET_PRODUCTS = "SET_PRODUCTS";
// const HIDE_PRODUCT = "HIDE_PRODUCT";
// const SHOW_PRODUCT = "SHOW_PRODUCT";

//action creators

const setProducts = (products) => ({
  type: SET_PRODUCTS,
  products,
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
    dispatch(setProducts(products));
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
    default:
      return state;
  }
}
