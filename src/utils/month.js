import { daysInMonth, getCurrentDate } from './dates';
import Week from './week';

export default class Month {
  constructor({ month }) {
    this.month = month;
  }

  days(days) {
    if (!this.daysInMonth) {
      this.daysInMonth = days;
    }
    return this.daysInMonth;
  }

  currentWeek(){
    return new Week(this.days());
  }

  currentDay(){
    if (!this.currentDayInMonth) {
      this.currentDayInMonth = this.daysInMonth[this.currentDayDate()];
    }
    return this.currentDayInMonth;
  }

  currentDayDate(){
    if (!this.currentDayInMonthDate) {
      this.currentDayInMonthDate = getCurrentDate().currentDay;
    }
    return this.currentDayInMonthDate;
  }

  currentDayAmount() {
    if (!this.amountSpent) {
      this.amountSpent = this.currentDay().amountSpent;
    }
    return this.amountSpent;
  }

  total() {
    const days = this.daysInMonth;
    if (!this.monthSpending) {
      this.monthSpending = Object.keys(days).reduce((acc, current) => {
        const { amountSpent } = days[current];
        acc += amountSpent;
        return acc;
      }, 0);
    }
    return this.monthSpending;
  }

  average() {
    if (!this.averageSpending) {
      this.averageSpending = (this.total() / this.currentDayDate()).toFixed(2);
    }
    return this.averageSpending;
  }

  totalByAverage() {
    if (!this.totalByAverageSpending) {
      this.totalByAverageSpending = (this.average() * daysInMonth()).toFixed(2);
    }
    return this.totalByAverageSpending;
  }
}