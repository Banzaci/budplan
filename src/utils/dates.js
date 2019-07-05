import moment from 'moment';

const now = moment().format('YYYY-MM-DD');

export const daysInMonth = () => moment().daysInMonth()

export const days = () => moment().days()

export const getCurrentDate = () => {
    const [
        currentYear,
        currentMonth,
        currentDay
    ] = now.split('-')
    
    return {
        currentYear,
        currentMonth,
        currentDay
    }
}