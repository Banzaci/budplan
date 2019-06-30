import { daysInMonth } from './dates';

export const totalAmount = month => {
  const dim = daysInMonth();
  const { data, currentDay } = month;
  const totalAmountSpent = Object.keys(data).reduce((acc, key) => acc + parseInt(data[key]), 0)
  const averageAmountSpent = totalAmountSpent / dim;
  return { ...month, totalAmountSpent, averageAmountSpent };
}