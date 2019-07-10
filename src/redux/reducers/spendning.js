import { SAVE_AMOUNT, FETCH_SUCCESS } from "../actions/spendning";

const INITIAL_STATE = {
  currentMonth: {},
  amount: 0
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SUCCESS:
      return {
        ...state,
        ...action,
        type: null
      };
    case SAVE_AMOUNT:
      return { ...state, amount: action.amount };
    default:
      return state;
  }
}
