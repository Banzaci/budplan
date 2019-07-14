const dayAmount = (dayAmount, key) => {
  if(!dayAmount) return 0;
  return Object.values(dayAmount[key]).reduce((acc, current) => acc + parseInt(current, 10), 0)
}

export default class Day {

  varName = 'variable'

  constructor(day, dayAmount=null) {
    this.day = day
    this.dayAmount = dayAmount;
  }

  dayAmountVar() {
    return dayAmount(this.dayAmount, this.varName);
  }

  dayVariables() {
    if (!this.dayAmount) return {}
    return this.dayAmount[this.varName];
  }

  dayCostByVariableName(name) {
    if (!this.dayVariables()) return {}
    return this.dayVariables()[name];
  }
}