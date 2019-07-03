import { daysInMonth, getCurrentDate } from "../../utils/dates";
import { save, get } from "../../utils/storage";
import { totalAmount } from "../../utils/amount";

export const SAVE_AMOUNT = "yesterday/SAVE_AMOUNT";
export const GET_MONTH = "yesterday/GET_MONTH";
export const FETCH_AMOUNT = "yesterday/FETCH_AMOUNT";
export const FETCH_SUCCESS = "yesterday/FETCH_SUCCESS";
export const FETCH_ERROR = "yesterday/FETCH_ERROR";
export const SAVED_MONTH_ERROR = "yesterday/SAVED_MONTH_ERROR";
export const SAVING_AMOUNT = "yesterday/SAVING_AMOUNT";
export const SAVED_AMOUNT_SUCCESS = "yesterday/SAVED_AMOUNT_SUCCESS";

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
function append(...args) {
  return args.reduce((acc, current) => {
    return { ...acc, ...current };
  }, {});
}

export function saveAmount({ currentYr, currentMonth, day, amount }) {
  return function(dispatch) {
    dispatch({ type: SAVING_AMOUNT });
    const request = save({ currentYr, currentMonth, day, amount });

    return request.then(
      response => dispatch(savedAmountSuccess(append(totalAmount(response)))),
      err => dispatch(savedAmountError(err))
    );
  };
}

export function getThisMonthAmount() {
  return function(dispatch) {
    dispatch({ type: FETCH_AMOUNT });
    const { currentYr, currentMonth, currentDay } = getCurrentDate();
    const request = get({ currentYr, currentMonth, currentDay });
    return request.then(
      response => {
        return dispatch(fetchMonthSuccess(append(totalAmount(response))));
      },
      err => dispatch(fetchMonthError(err))
    );
  };
}
