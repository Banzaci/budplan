import { daysInMonth, getCurrentDate } from './dates';
import Week from './week';
import Day from './day';

export default class Month {
  constructor({ month }) {
    this.month = month;
  }

  currentWeek(){
    return new Week();
  }

  currentDay(){
    return getCurrentDate().currentDay;
  }

  total() {
    return this;
  }

  average() {
    return (150 / this.currentDay).toFixed(2)
  }

  totalByAverage() {
    return (this.average * daysInMonth()).toFixed(2)
  }
}