import { combineReducers } from 'redux';
import target from './target';
import spendning from './spendning';
import categories from './categories';
import fixed from './fixed';

export default combineReducers({
    spendning,
    target,
    categories,
    fixed,
  });