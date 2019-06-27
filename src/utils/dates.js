import moment from 'moment';

const now = moment().format('YYYY-MM-DD');

export const daysInMonth = () => moment().daysInMonth()

export const getCurrentYearAndMonth = () => {
    const [yr, month, day] = now.split('-')
    return {
        yr,
        month,
        day
    }
}

export const averagePricePerDayAMonth = amount => {
    const dim = daysInMonth();
    const tdd = currentDay();
    const leftDays = dim - tdd;
    console.log(leftDays)
}