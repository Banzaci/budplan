import { daysInMonth, getCurrentDate } from '../../utils/dates';
import { saveSpending, getSpending } from '../../utils/storage';
import Month from '../../utils/month';
import Day from '../../utils/day';
import Week from '../../utils/week';

export const SAVE_AMOUNT = 'spending/SAVE_AMOUNT';
export const GET_MONTH = 'spending/GET_MONTH';
export const FETCH_AMOUNT = 'spending/FETCH_AMOUNT';
export const FETCH_SUCCESS = 'spending/FETCH_SUCCESS';
export const FETCH_ERROR = 'spending/FETCH_ERROR';
export const SAVING_AMOUNT = 'spending/SAVING_AMOUNT';

function fetchMonthError(error) {
  return {
    type: FETCH_ERROR,
    error
  };
}

const addZeroIfNeeded = day => {
  if (day > 0 && day < 10) return `0${day}`;
  return day.toString();
};

const range = length =>
  Array.from({ length }, (_, day) => addZeroIfNeeded(day + 1));

const generateProps = (month) => {
  //Month
  const currentYearDate = month.currentYearDate;
  const currentMonthDate = month.currentMonthDate;
  const currentDayDate = month.currentDayDate;
  const days = month.days()
  const currentDay = month.currentDay();
  const average = month.average();
  const total = month.total();
  const totalByAverage = month.totalByAverage();
  const currentDayAmount = month.currentDayAmount();
  const spendingByCategories = month.getMonthSpendingByCategory();
  // Week
  const currentWeek = new Week();
  const weekNumber = currentWeek.weekNumber();
  const weekDays = currentWeek.weekDays(days);

  return {
    currentDayDate,
    currentMonthDate,
    currentYearDate,
    currentDay,
    weekNumber,
    weekDays,
    average,
    days,
    total,
    totalByAverage,
    currentDayAmount,
    spendingByCategories
  }
}

const fetchMonthSuccess = (monthData) => {
  const { month } = monthData;
  
  monthData.days(range(daysInMonth()).reduce((acc, current) => {
    const dayData = new Day(current, month[current]);
    
    return {
      ...acc,
      ...{
        [current]: {
          variables: dayData.dayVariables(),
          amountSpent: dayData.dayAmountVar()
        }
      }
    };
  }, []));
  
  return {
    month: generateProps(monthData),
    type: FETCH_SUCCESS
  };
};

export function saveAmount(data) {
  return function(dispatch) {
    dispatch({ type: SAVING_AMOUNT });
    const { currentYearDate, currentMonthDate, currentDayDate } = getCurrentDate();
    const request = saveSpending({ ...data, currentYearDate, currentMonthDate, currentDayDate });
    return request.then(
      response => dispatch(fetchMonthSuccess(
        new Month({ ...response, currentYearDate, currentMonthDate, currentDayDate })
      )),
      err => dispatch(fetchMonthError(err))
    );
  };
}

export function getThisMonthAmount() {
  return function(dispatch) {
    dispatch({ type: FETCH_AMOUNT });
    const { currentYearDate, currentMonthDate, currentDayDate } = getCurrentDate();
    const request = getSpending({ currentYearDate, currentMonthDate, currentDayDate });
    return request.then(
      response => {
        return dispatch(fetchMonthSuccess(
          new Month({ ...response, currentYearDate, currentMonthDate, currentDayDate })
        ));
      },
      err => dispatch(fetchMonthError(err))
    );
  };
}
