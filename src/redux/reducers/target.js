import { SAVE_TARGET, FETCH_SUCCESS } from '../actions/target';

const INITIAL_STATE = {
  monthlyBudget: 0,
  targetAverage: 0,
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SUCCESS:
      return {
        ...state,
        ...action.data,
      };
    case SAVE_TARGET:
      return { ...state, amount: action.amount };
    default:
      return state;
  }
}
