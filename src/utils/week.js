import { getWeekByDateNumber } from './dates';

export default class Week {
  constructor(days) {
    this.days = days
    this.week = week
  }

  weekTotal(){
    const { days, week } = this;
    this.week = week.reduce((acc, current) => {
      const dayDate = current.format('DD');
      const dayName = current.format('dd');
      const amounts = days[dayDate];// new Day()
      const expenses = getTotalAmountByCostType(amounts, 'variable');
      return [...acc, 
        [dayName, expenses ? expenses : 0]
      ];
    }, []);
    return this;
  }

  weekNumber() {
    this.weekNumber = getWeekByDateNumber();
    return this; 
  }
}