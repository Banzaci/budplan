import { saveTarget, getTarget } from '../../utils/storage';
import { getCurrentDate, daysInMonth } from '../../utils/dates';

export const FETCH_TARGET_ERROR = 'target/FETCH_TARGET_ERROR';
export const FETCH_SUCCESS = 'target/FETCH_SUCCESS';
export const FETCH_TARGET = 'target/FETCH_TARGET';
export const SAVING_TARGET = 'target/SAVING_TARGET';

function fetchTargetError(error) {
  return {
    type: FETCH_TARGET_ERROR,
    error
  };
}

function getTargetAverage( target ) {
  if (!target || !target.monthlyBudget) return 0;
  return Math.round((target.monthlyBudget / daysInMonth())).toFixed(2);
}

const fetchTargetSuccess = target => {
  return {
    ...target,
    ...{ targetAverage:  getTargetAverage(target) },
    type: FETCH_SUCCESS
  };
};

export function getTargetData() {
  return function (dispatch) {
    dispatch({ type: FETCH_TARGET });
    const { currentYear, currentMonth } = getCurrentDate();
    return getTarget({ currentYear, currentMonth })
      .then(
        response => dispatch(fetchTargetSuccess(response)),
        err => dispatch(fetchTargetError(err))
      );
  };
}

export function saveTargetData(target) {
  return function (dispatch) {
    dispatch({ type: SAVING_TARGET });
    const { currentYear, currentMonth } = getCurrentDate();
    const request = saveTarget({ ...target, currentYear, currentMonth });
    return request.then(
      response => dispatch(fetchTargetSuccess(response)),
      err => dispatch(fetchTargetError(err))
    );
  };
}
