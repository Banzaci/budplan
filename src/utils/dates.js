import moment from 'moment';

export const daysInMonth = () => moment().daysInMonth()
export const currentDay = () => moment().format('DD')
export const getCurrentYearAndMonth = () => moment().format('YYYY-MM')

export const averagePricePerDayAMonth = amount => {
    const dim = daysInMonth();
    const tdd = currentDay();
    const leftDays = dim - tdd;
    console.log(leftDays)
}