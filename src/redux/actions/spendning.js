import { daysInMonth, getCurrentDate } from '../../utils/dates';
import { save, get } from '../../utils/storage';
import { totalAmount } from '../../utils/amount';

export const SAVE_AMOUNT = 'spending/SAVE_AMOUNT';
export const GET_MONTH = 'spending/GET_MONTH';
export const FETCH_AMOUNT = 'spending/FETCH_AMOUNT';
export const FETCH_SUCCESS = 'spending/FETCH_SUCCESS';
export const FETCH_ERROR = 'spending/FETCH_ERROR';
export const SAVED_MONTH_ERROR = 'spending/SAVED_MONTH_ERROR';
export const SAVING_AMOUNT = 'spending/SAVING_AMOUNT';
export const SAVED_AMOUNT_SUCCESS = 'spending/SAVED_AMOUNT_SUCCESS';

function fetchMonthError(error) {
  return {
    type: FETCH_ERROR,
    error
  };
}

function savedAmountError(error) {
  return {
    type: SAVED_MONTH_ERROR,
    error
  };
}

function savedAmountSuccess(data) {
  return {
    type: SAVED_AMOUNT_SUCCESS,
    ...data
  };
}

const addZeroIfNeeded = day => {
  if (day > 0 && day < 10) return `0${day}`;
  return day.toString();
};

const range = length =>
  Array.from({ length }, (_, day) => addZeroIfNeeded(day + 1));

const fetchMonthSuccess = month => {
  const { data } = month;
  const monthWithAmount = range(daysInMonth()).reduce((acc, current) => {
    const dayData = data[current] || 0;
    return {
      ...acc,
      ...{
        [current]: {
          amountSpent: dayData
        }
      }
    };
  }, []);
  return {
    ...month,
    monthWithAmount,
    type: FETCH_SUCCESS
  };
};

export function saveAmount({ currentYear, currentMonth, day, amount }) {
  return function(dispatch) {
    dispatch({ type: SAVING_AMOUNT });
    const request = save({ currentYear, currentMonth, day, amount });

    return request.then(
      response => dispatch(savedAmountSuccess(totalAmount(response))),
      err => dispatch(savedAmountError(err))
    );
  };
}

export function getThisMonthAmount() {
  return function(dispatch) {
    dispatch({ type: FETCH_AMOUNT });
    const { currentYear, currentMonth, currentDay } = getCurrentDate();
    const request = get({ currentYear, currentMonth, currentDay });
    return request.then(
      response => {
        return dispatch(fetchMonthSuccess(totalAmount(response)));
      },
      err => dispatch(fetchMonthError(err))
    );
  };
}
