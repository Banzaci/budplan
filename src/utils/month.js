import { daysInMonth, getCurrentDate, getCurrentWeek, getCurrentWeekNumber } from './dates';

export default class Month {
  constructor({ data }) {
    console.log(data)
    this.items = data
    this.currentDay = getCurrentDate().currentDay
  }

  week(){
    const temp = getCurrentWeek();
    const items = this.items;
    this.week = temp.reduce((acc, current) => {
      const dayDate = current.format('DD');
      const dayName = current.format('dd');
      const amount = items[dayDate];
      return [...acc, 
        [dayName, amount ? amount : 0]
      ];
    }, []);
    return this;
  }

  weekNumber() {
    this.weekNumber = getCurrentWeekNumber();
    return this; 
  }

  today(){
    this.todayAmount = (this.items[this.currentDay] || 0).toString()
    return this;
  }

  total() {
    this.total = Object.keys(this.items).reduce((acc, key) => acc + parseInt(this.items[key]), 0)
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