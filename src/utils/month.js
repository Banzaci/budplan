import { daysInMonth, getCurrentDate } from './dates';
import Week from './week';

export default class Month {
  constructor({ month, currentMonthDate, currentYearDate, currentDayDate }) {
    this.month = month;
    this.currentMonthDate = currentMonthDate;
    this.currentYearDate = currentYearDate;
    this.currentDayDate = currentDayDate;
  }

  days(days) {
    if (!this.daysInMonth) {
      this.daysInMonth = days;
    }
    return this.daysInMonth;
  }

  currentDay(){
    if (!this.currentDayInMonth) {
      this.currentDayInMonth = this.daysInMonth[this.currentDayDate];
    }
    return this.currentDayInMonth;
  }

  currentDayAmount() {
    if (!this.amountSpent) {
      this.amountSpent = this.currentDay().amountSpent;
    }
    return this.amountSpent;
  }

  daysInMonthWithAmount() {
    if (!this.inMonthWithAmount) {
      const days = this.daysInMonth;
      this.inMonthWithAmount = Object.values(days).filter(({ amountSpent }) => amountSpent )
    }
    return this.inMonthWithAmount;
  }

  total() {
    if (!this.monthSpending) {
      this.monthSpending = this.daysInMonthWithAmount().reduce(( acc, { amountSpent } ) => acc += amountSpent, 0 )
    }
    return this.monthSpending;
  }

  average() {
    if (!this.averageSpending) {
      this.averageSpending = (this.total() / this.currentDayDate).toFixed(2);
    }
    return this.averageSpending;
  }

  totalByAverage() {
    if (!this.totalByAverageSpending) {
      this.totalByAverageSpending = (this.average() * daysInMonth()).toFixed(2);
    }
    return this.totalByAverageSpending;
  }

  getMonthSpendingByCategory = () => {
    if (!this.monthSpendingByCategory) {
      this.monthSpendingByCategory = this.daysInMonthWithAmount().reduce((acc, { variables }) => {
          const vars = Object.entries(variables);
          vars.forEach(([key, value]) => {
            acc[key] = acc[key] || 0;
            acc[key] += parseInt(value, 10);
          })
        return {
          ...acc,
        };
      }, {});
    }
    return this.monthSpendingByCategory;
  }
}