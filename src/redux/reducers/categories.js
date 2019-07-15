import SV from '../../languages/sv';

import { SAVE_CATEGORY, FETCH_SUCCESS } from '../actions/categories';

const INITIAL_STATE = {
  categories: {
    ...SV.categories
  },
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SUCCESS:
      return {
        ...state,
        ...action.data
      };
    case SAVE_CATEGORY:
      return { ...state, category: action.category };
    default:
      return state;
  }
}
