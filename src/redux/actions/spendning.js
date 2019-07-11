import { daysInMonth, getCurrentDate } from '../../utils/dates';
import { saveSpending, getSpending } from '../../utils/storage';
import Month from '../../utils/month';
import Day from '../../utils/day';

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

function savedAmountSuccess(dates, month) {
  return {
    ...dates,
    ...month,
    type: SAVED_AMOUNT_SUCCESS,
  };
}

const addZeroIfNeeded = day => {
  if (day > 0 && day < 10) return `0${day}`;
  return day.toString();
};

const range = length =>
  Array.from({ length }, (_, day) => addZeroIfNeeded(day + 1));

const fetchMonthSuccess = (monthData) => {
  const { month } = monthData;
  const days = range(daysInMonth()).reduce((acc, current) => {
    const dayData = new Day(current, month[current]);
    return {
      ...acc,
      ...{
        [current]: {
          amountSpent: dayData.dayAmountVar()
        }
      }
    };
  }, []);
  return {
    month: monthData,
    days,
    type: FETCH_SUCCESS
  };
};

export function saveAmount(data) {
  return function(dispatch) {
    dispatch({ type: SAVING_AMOUNT });
    const { currentYear, currentMonth, currentDay } = getCurrentDate();
    const request = saveSpending({ ...data, currentYear, currentMonth });
    return request.then(
      response => dispatch(savedAmountSuccess(
        new Month({ ...response, currentYear, currentMonth, currentDay })
      )),
      err => dispatch(savedAmountError(err))
    );
  };
}

export function getThisMonthAmount() {
  return function(dispatch) {
    dispatch({ type: FETCH_AMOUNT });
    const { currentYear, currentMonth, currentDay } = getCurrentDate();
    const request = getSpending({ currentYear, currentMonth, currentDay });
    return request.then(
      response => {
        return dispatch(fetchMonthSuccess(
          new Month({ ...response, currentYear, currentMonth, currentDay })
        ));
      },
      err => dispatch(fetchMonthError(err))
    );
  };
}
