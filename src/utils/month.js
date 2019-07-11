import { daysInMonth, getCurrentDate, getWeekByDate, getWeekByDateNumber } from './dates';
import Week from './week';

const getTotalAmountByCostType = (daily, type) => {
  if(!daily) return {}
  const expenses = daily[type];
  const total = Object.values(expenses).reduce((acc, current) => acc + parseInt(current, 10), 0)
  return total;
}

export default class Month {
  constructor(items) {
    this.items = items;
  }

  currentWeek(){
    if (this.currentWeek) this.currentWeek = new Week().current();
    return this;
  }

  today(){// change name
    const { currentDay, items } = this;
    const amounts = items[currentDay];
    this.todayAmount = getTotalAmountByCostType(amounts, 'variable');
    return this;
  }

  total() {
    this.total = 0;//Object.keys(this.items).reduce((acc, key) => acc + parseInt(this.items[key]), 0)
    return this;
  }

  average() {
    this.average = (this.total / this.currentDay).toFixed(2)
    return this;
  }

  totalByAverage() {
    this.totalByAverage = (this.average * daysInMonth()).toFixed(2)
    return this;
  }
}