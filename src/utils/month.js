import { daysInMonth, getCurrentDate, getCurrentWeek, getCurrentWeekNumber } from './dates';

const getTotalAmountByCostType = (daily, type) => {
  if(!daily) return {}
  const expenses = daily[type];
  const total = Object.values(expenses).reduce((acc, current) => acc + parseInt(current, 10), 0)
  return total;
}

export default class Month {
  constructor({ data, day }) {
    this.items = data
    this.day = day;
    this.currentDay = getCurrentDate().currentDay;
  }

  week(){
    const temp = getCurrentWeek();
    const items = this.items;
    this.week = temp.reduce((acc, current) => {
      const dayDate = current.format('DD');
      const dayName = current.format('dd');
      const amounts = items[dayDate];
      const expenses = getTotalAmountByCostType(amounts, 'variable');
      return [...acc, 
        [dayName, expenses ? expenses : 0]
      ];
    }, []);
    return this;
  }

  weekNumber() {
    this.weekNumber = getCurrentWeekNumber();
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