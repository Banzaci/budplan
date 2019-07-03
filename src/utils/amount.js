import { daysInMonth, days } from './dates';

export const totalAmount = month => {
  const dim = daysInMonth();
  const { data, currentDay, currentMonth } = month;
  const totalAmountSpent = Object.keys(data).reduce((acc, key) => acc + parseInt(data[key]), 0);
  const averageAmountSpent = totalAmountSpent / days();
  return { ...month, totalAmountSpent, averageAmountSpent };
}