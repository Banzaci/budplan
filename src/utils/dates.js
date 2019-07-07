import moment from 'moment';
import 'moment/locale/sv';

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

const range = length =>
    Array.from({ length }, (_, day) => day);

export const getCurrentWeek = () => {
    const startOfWeek = moment().startOf('isoWeek');
    return range(7).map( i => moment(startOfWeek).add(i, 'days'));
}

export const getDayNameByNumber = date => {
    return moment()
}