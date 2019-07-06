import { daysInMonth } from './dates';

export default class Target {
  
  constructor({ data }) {
    this.data = { ...data }
  }

  average() {
    const { monthlyBudget } = this.data;
    this.data = {
      ...this.data,
      average: Math.round((monthlyBudget / daysInMonth())).toFixed(2)
    };
    return this;
  }
}