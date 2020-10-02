import { db } from "../firebase";
import products from "./products";

//default state
const defaultCriteria = {
  activeCriteria: [],
  allCriteria: [],
};

//action types

const SET_CRITERIA = "SET CRITERIA";
const HIDE_CRITERIA = "HIDE CRITERIA";
const SHOW_CRITERIA = "SHOW CRITERIA";

//action creators

const setCriteria = (criteria) => ({
  type: SET_CRITERIA,
  criteria,
});

export const hideCriteria = (criteriaName) => ({
  type: HIDE_CRITERIA,
  criteriaName,
});

export const showCriteria = (criteriaName) => ({
  type: SHOW_CRITERIA,
  criteriaName,
});

export const getCriteriaData = () => async (dispatch) => {
  try {
    let criteria = [];
    await db
      .collection("snow-boots")
      .doc("info")
      .collection("criteria")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          criteria.push({ ...doc.data(), active: true });
        });
      });
    dispatch(setCriteria(criteria));
  } catch (error) {
    console.error(error);
  }
};

//reducer

export default function (state = defaultCriteria, action) {
  switch (action.type) {
    case SET_CRITERIA:
      return {
        ...state,
        activeCriteria: action.criteria,
        allCriteria: action.criteria,
      };
    case HIDE_CRITERIA:
      const newActiveHide = state.activeCriteria.filter((criteria) => {
        return criteria["criteria-name"] !== action.criteriaName;
      });
      const newAllHide = state.allCriteria.map((criteria) => {
        if (criteria["criteria-name"] === action.criteriaName) {
          return { ...criteria, active: false };
        } else {
          return criteria;
        }
      });
      return {
        ...state,
        activeCriteria: newActiveHide,
        allCriteria: newAllHide,
      };
    case SHOW_CRITERIA:
      const newAllShow = state.allCriteria.map((criteria) => {
        if (criteria["criteria-name"] === action.criteriaName) {
          return { ...criteria, active: true };
        } else {
          return criteria;
        }
      });
      const newActiveShow = newAllShow.filter(
        (criteria) => criteria.active === true
      );
      return {
        ...state,
        activeCriteria: newActiveShow,
        allCriteria: newAllShow,
      };
    default:
      return state;
  }
}
