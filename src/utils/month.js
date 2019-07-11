import { daysInMonth } from './dates';
import Week from './week';
import Day from './day';

export default class Month {
  constructor(items) {
    this.items = items;
  }

  currentWeek(){
    if (this.currentWeek) this.currentWeek = new Week().current();
    return this;
  }

  today(){
    if (this.today) this.today = new Day();
    return this;
  }

  total() {
    return this;
  }

  average() {
    this.average = (this.total / this.today.today()).toFixed(2)
    return this;
  }

  totalByAverage() {
    this.totalByAverage = (this.average * daysInMonth()).toFixed(2)
    return this;
  }
}