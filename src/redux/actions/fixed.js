import { saveFixed, getFixed } from '../../utils/storage';
import { getCurrentDate, daysInMonth } from '../../utils/dates';

export const FETCH_FIXED_ERROR = 'fixed/FETCH_FIXED_ERROR';
export const FETCH_SUCCESS = 'fixed/FETCH_SUCCESS';
export const FETCH_FIXED = 'fixed/FETCH_FIXED';
export const SAVING_FIXED = 'fixed/SAVING_FIXED';

function fetchFixedError(error) {
  return {
    type: FETCH_FIXED_ERROR,
    error
  };
}

const fetchFixedSuccess = fixed => {
  return {
    ...fixed,
    type: FETCH_SUCCESS
  };
};

export function getFixedData() {
  return function (dispatch) {
    dispatch({ type: FETCH_FIXED });
    const { currentYear, currentMonth } = getCurrentDate();
    return getFixed({ currentYear, currentMonth })
      .then(
        response => dispatch(fetchFixedSuccess(response)),
        err => dispatch(fetchFixedError(err))
      );
  };
}

export function saveFixedData(fixed) {
  return function (dispatch) {
    dispatch({ type: SAVING_FIXED });
    const { currentYear, currentMonth } = getCurrentDate();
    const request = saveFixed({ ...fixed, currentYear, currentMonth });
    return request.then(
      response => dispatch(fetchFixedSuccess(response)),
      err => dispatch(fetchFixedError(err))
    );
  };
}
