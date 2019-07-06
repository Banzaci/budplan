import { days, daysInMonth } from './dates';

export default class Month {
  constructor({ data }) {
    this.items = { data }
  }

  total() {
    const { data } = this.items;
    const total = Object.keys(data).reduce((acc, key) => acc + parseInt(data[key]), 0)
    this.items = { ...this.items, total }
    return this;
  }

  average() {
    const { total } = this.items;
    this.items = { ...this.items, average: (total / days()).toFixed(2) }
    return this;
  }

  totalByAverage() {
    const { average } = this.items;
    this.items = { ...this.items, totalByAverage: (average * daysInMonth()).toFixed(2) }
    return this;
  }
}

// https://medium.com/backticks-tildes/understanding-method-chaining-in-javascript-647a9004bd4f