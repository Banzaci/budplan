import { combineReducers } from 'redux';
import target from './target';
import spendning from './spendning';

export default combineReducers({
    spendning,
    target,
  });