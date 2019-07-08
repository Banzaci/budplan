import SV from '../../languages/sv';

import { SAVE_CATEGORY, FETCH_CATEGORY_SUCCESS } from '../actions/category';

const INITIAL_STATE = {
  categories: [...SV.categories],
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_CATEGORY_SUCCESS:
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
