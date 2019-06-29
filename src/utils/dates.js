import moment from 'moment';

const now = moment().format('YYYY-MM-DD');

export const daysInMonth = () => moment().daysInMonth()

export const getCurrentDate = () => {
    const [
        currentYr,
        currentMonth,
        currentDay
    ] = now.split('-')
    
    return {
        currentYr,
        currentMonth,
        currentDay
    }
}

export const averagePricePerDayAMonth = amount => {
    const dim = daysInMonth();
    const tdd = currentDay();
    const leftDays = dim - tdd;
    console.log(leftDays)
}