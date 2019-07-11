const dayAmount = (day, key) => {
  if(!day) return 0;
  return Object.values(day[key]).reduce((acc, current) => acc + parseInt(current, 10), 0)
}

export default class Day {
  constructor(day, dayAmount=null) {
    this.day = day
    this.dayAmount = dayAmount;
  }

  dayAmountVar() {
    return dayAmount(this.dayAmount, 'variable');
  }

  dayAmountFixed() {
    return dayAmount(this.dayAmount, 'fixed');
  }
}