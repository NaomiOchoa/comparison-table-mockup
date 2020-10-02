import { db } from "../firebase";

//default state
const defaultCriteria = {
  activeCriteria: [],
  allCriteria: [],
};

//action types

const SET_CRITERIA = "SET CRITERIA";
// const HIDE_CRITERIA = 'HIDE CRITERIA'
// const SHOW_CRITERIA = 'SHOW CRITERIA'

//action creators

const setCriteria = (criteria) => ({
  type: SET_CRITERIA,
  criteria,
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
    default:
      return state;
  }
}
