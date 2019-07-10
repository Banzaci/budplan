import { SAVE_TARGET, FETCH_TARGET_SUCCESS } from "../actions/target";

const INITIAL_STATE = {
  monthlyBudget: '-',
  average: '-',
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_TARGET_SUCCESS:
      return {
        ...state,
        ...action.data
      };
    case SAVE_TARGET:
      return { ...state, amount: action.amount };
    default:
      return state;
  }
}
