import SV from '../../languages/sv';

import { SAVE_CATEGORY, FETCH_SUCCESS } from '../actions/categories';

const INITIAL_STATE = {
  ...SV
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SUCCESS:
      const fixed = {
        ...action.data.fixed,
        ...state.fixed
      }
      const variable = {
        ...action.data.variable,
        ...state.variable
      }
      return {
        fixed,
        variable,
      };
    case SAVE_CATEGORY:
      return { ...state, category: action.category };
    default:
      return state;
  }
}
