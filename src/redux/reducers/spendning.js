import { SAVE_AMOUNT, FETCH_SUCCESS } from "../actions/spendning";

const INITIAL_STATE = {
  currentMonth: {},
  amount: 0
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SUCCESS:
      const { yr, month, day, monthWithAmount } = action;
      return {
        ...state,
        monthWithAmount,
        yr,
        day,
        month
      };
    case SAVE_AMOUNT:
      return { ...state, amount: action.amount };
    default:
      return state;
  }
}
