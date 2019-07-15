import { SAVE_FIXED, FETCH_SUCCESS } from '../actions/target';

const INITIAL_STATE = {
  fixed: [],
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SUCCESS:
      return {
        ...state,
        ...action,
      };
    case SAVE_FIXED:
      return { ...state, amount: action.amount };
    default:
      return state;
  }
}
