import { weekNumber, getWeekByDate } from './dates';
import Day from './day';

export default class Week {
  
  constructor() {}

  weekDays(days){
    return getWeekByDate().reduce((acc, current) => {
      const dayDate = current.format('DD');
      const dayName = current.format('dd');
      const { amountSpent } = days[dayDate];
      return [...acc, 
        [dayName, amountSpent]
      ];
    }, []);
  }

  weekNumber() {
    return weekNumber();
  }
}