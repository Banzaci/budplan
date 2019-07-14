import { daysInMonth, getCurrentDate } from '../../utils/dates';
import { saveSpending, getSpending } from '../../utils/storage';
import Month from '../../utils/month';
import Day from '../../utils/day';

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
  const currentYear = month.currentYear;
  const currentMonth = month.currentMonth;
  const days = month.days()
  const currentWeek = month.currentWeek(days);
  const average = month.average();
  const week = currentWeek.weekDays();
  const currentDay = month.currentDay();
  const weekNumber = currentWeek.weekNumber();
  const total = month.total();
  const totalByAverage = month.totalByAverage();
  const currentDayAmount = month.currentDayAmount(days);
  const currentDayDate = month.currentDayDate();
  const spendingByCategories = month.getMonthSpendingByCategory();

  return {
    currentWeek,
    currentMonth,
    currentYear,
    average,
    currentDay,
    days,
    weekNumber,
    week,
    total,
    totalByAverage,
    currentDayAmount,
    currentDayDate,
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
    const { currentYear, currentMonth, currentDay } = getCurrentDate();
    const request = saveSpending({ ...data, currentYear, currentMonth });
    return request.then(
      response => dispatch(fetchMonthSuccess(
        new Month({ ...response, currentYear, currentMonth, currentDay })
      )),
      err => dispatch(fetchMonthError(err))
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
