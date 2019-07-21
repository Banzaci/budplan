import { combineReducers } from 'redux';
import target from './target';
import spendning from './spendning';
import categories from './categories';

export default combineReducers({
    spendning,
    target,
    categories,
  });