import { combineReducers } from 'redux';
import target from './target';
import spendning from './spendning';
import category from './category';

export default combineReducers({
    spendning,
    target,
    category,
  });