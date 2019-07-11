import { daysInMonth, getCurrentDate } from './dates';
import Week from './week';
import Day from './day';

export default class Month {
  constructor({ month }) {
    this.month = month;
    console.log('this.month', this.month)
  }

  currentWeek(){
    return new Week();
  }

  total() {
    return this;
  }

  average() {
    const { currentDay } = getCurrentDate();
    return (150 / currentDay).toFixed(2)
  }

  totalByAverage() {
    return (this.average * daysInMonth()).toFixed(2)
  }
}