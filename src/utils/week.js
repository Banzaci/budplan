import { weekNumber, getWeekByDate } from './dates';
import Day from './day';

export default class Week {
  
  constructor(days) {
    this.days = days;
  }

  weekDays(){
    return getWeekByDate().reduce((acc, current) => {
      const dayDate = current.format('DD');
      const dayName = current.format('dd');
      const { amountSpent } = this.days[dayDate];
      return [...acc, 
        [dayName, amountSpent]
      ];
    }, []);
  }

  weekNumber() {
    return weekNumber();
  }
}