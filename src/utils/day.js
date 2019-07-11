const getTotalAmountByCostType = (today, key) => {
  if(!today) return {}
  return Object.values(today[key]).reduce((acc, current) => acc + parseInt(current, 10), 0)
}

export default class Day {
  constructor(day) {
    this.day = day
  }

  totalAmountByKey(key) {
    this.totalAmount = getTotalAmountByCostType(this.day, key);
    return this;
  }
}