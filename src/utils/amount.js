import { days } from './dates';

export const totalAmount = month => {
  const { data } = month;
  const totalAmountSpent = Object.keys(data).reduce((acc, key) => acc + parseInt(data[key]), 0);
  const averageAmountSpent = totalAmountSpent / days();
  return { ...month, totalAmountSpent, averageAmountSpent };
}
// https://medium.com/backticks-tildes/understanding-method-chaining-in-javascript-647a9004bd4f
// class Amount {
//   constructor() {
//     this.item = [...dates]
//   }
  
//   total() {
//     const entries = Object.entries(this.item);
//     const t = entries.map(([key, value]) => {
//       console.log(value)
//     })
//     console.log(entries)
//     return this;
//   }
  
//   average() {
//     this.item = []
//     return this;
//   }
// }

// const dates = [
//   {
//     01: {
//       amount: 100
//     }
//   },
//   {
//     02: {
//       amount: 130
//     }
//   }
// ]

// const amount = new Amount(dates)

// console.clear()
// amount.total()