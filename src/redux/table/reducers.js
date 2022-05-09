import actionTypes from './actions';

const initialState = {
  tableId: null,
  seatId: null,
  tableNumber: "",
};

export default function tableReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.TABLE_SET_STATE:
      return { ...state, ...action.payload };
    case actionTypes.TABLE_RESET_STATE:
      return {
        ...state,
        tableId: null,
        seatId: null,
        tableNumber: "",
      };
    default:
      return state;
  }
}

